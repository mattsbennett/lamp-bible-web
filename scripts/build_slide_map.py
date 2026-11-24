#!/usr/bin/env python3
"""
Draws the map on the Slide Studio illustration from the data Lamp itself
ships: OpenBible.info's places (CC BY 4.0) and Natural Earth's land, lakes,
rivers and shaded relief (public domain), as lamp-bible-core bundles them.

    python3 scripts/build_slide_map.py [path to lamp-bible-core]

The core checkout defaults to ../lamp-bible-core beside this repo. The frame,
the marks and where each name goes follow LampMapFrame and LampSlideMap in
core, for a map filling a widescreen Title & Body slide at its reading size.

Outputs, both committed:

    components/home/slide-map.ts     the shapes, places and names
    public/art/slide-map-relief.jpg  the shaded relief under the land
"""
import json
import math
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORE = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / 'lamp-bible-core'
PLACES = CORE / 'Sources/LampCore/Resources/Maps/places.json'
SHAPES = CORE / 'Sources/LampPresentationUI/Resources/Maps'

# Paul's first journey, Acts 13–14, one line per place as an author writes it.
LINES = [
    'Antioch 1',
    'Seleucia',
    'Salamis',
    'Paphos',
    'Perga',
    'Antioch 2 — Pisidian Antioch',
    'Iconium',
    'Lystra',
    'Derbe',
]

# A widescreen slide's page less its margins (1,600 less 96 a side), by the
# room a Title & Body slide gives a map (LampPresentationSlideCanvas.map).
WIDTH, HEIGHT = 1408, 540
# The body's reading size on that slide, 48, held to 30 × 1.4 for the map.
SIZE = 42.0
# Lamp's land and relief reach (LampMapFrame.whole) and the relief's density.
WHOLE = (-25.0, 180.0, 10.0, 75.0)
RELIEF_PER_DEGREE = 30
CLOSEST = 1.0
DETAILED_UP_TO = 35.0


def squeeze(south, north):
    return math.cos(math.radians((south + north) / 2))


def fitting(places, ratio):
    """LampMapFrame.fitting(_:ratio:): the places, room for their names, at `ratio`."""
    west = min(p['lon'] for p in places)
    east = max(p['lon'] for p in places)
    south = min(p['lat'] for p in places)
    north = max(p['lat'] for p in places)
    sq = squeeze(south, north)
    height = max(north - south, CLOSEST * 0.6)
    width = max((east - west) * sq, CLOSEST * 0.6)
    across = (width * 0.22 + 0.15) / sq
    up_down = height * 0.18 + 0.1
    west, east, south, north = west - across, east + across, south - up_down, north + up_down
    if north - south < CLOSEST:
        middle = (north + south) / 2
        south, north = middle - CLOSEST / 2, middle + CLOSEST / 2
    # fitted(to:), widening or heightening about the middle.
    sq = squeeze(south, north)
    if (east - west) * sq / max(north - south, 0.0001) < ratio:
        width = (north - south) * ratio / sq
        middle = (west + east) / 2
        west, east = middle - width / 2, middle + width / 2
    else:
        height = (east - west) * sq / ratio
        middle = (south + north) / 2
        south, north = middle - height / 2, middle + height / 2
    assert WHOLE[0] <= west and east <= WHOLE[1] and WHOLE[2] <= south and north <= WHOLE[3]
    return west, east, south, north


def read_layer(name):
    """Core's encoding: a count of parts, then each part's count of points and
    each point as the change from the last, in thousandths of a degree, as
    zigzag varints."""
    data = (SHAPES / f'{name}.bin').read_bytes()
    index = 0

    def varint():
        nonlocal index
        value = shift = 0
        while True:
            byte = data[index]
            index += 1
            value |= (byte & 0x7F) << shift
            if not byte & 0x80:
                return value
            shift += 7

    def signed():
        v = varint()
        return (v >> 1) ^ -(v & 1)

    parts = []
    for _ in range(varint()):
        lon = lat = 0
        points = []
        for _ in range(varint()):
            lon += signed()
            lat += signed()
            points.append((lon / 1000, lat / 1000))
        parts.append(points)
    return parts


def clip_polygon(points, x0, y0, x1, y1):
    """Sutherland–Hodgman against a rectangle, for a filled outline."""
    def clip(pts, inside, cross):
        out = []
        for i, current in enumerate(pts):
            previous = pts[i - 1]
            if inside(current):
                if not inside(previous):
                    out.append(cross(previous, current))
                out.append(current)
            elif inside(previous):
                out.append(cross(previous, current))
        return out

    def at_x(x):
        return lambda a, b: (x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]))

    def at_y(y):
        return lambda a, b: (a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y)

    for inside, cross in (
        (lambda p: p[0] >= x0, at_x(x0)),
        (lambda p: p[0] <= x1, at_x(x1)),
        (lambda p: p[1] >= y0, at_y(y0)),
        (lambda p: p[1] <= y1, at_y(y1)),
    ):
        points = clip(points, inside, cross)
        if not points:
            break
    return points


def clip_line(points, x0, y0, x1, y1):
    """A line's runs inside the rectangle, each with a point either side of it."""
    runs, run = [], []
    for i, p in enumerate(points):
        near = any(
            x0 <= q[0] <= x1 and y0 <= q[1] <= y1
            for q in points[max(i - 1, 0):i + 2]
        )
        if near:
            run.append(p)
        elif run:
            runs.append(run)
            run = []
    if run:
        runs.append(run)
    return [r for r in runs if len(r) > 1]


def simplify(points, tolerance):
    """Douglas–Peucker, iteratively."""
    if len(points) < 3:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        first, last = stack.pop()
        ax, ay = points[first]
        bx, by = points[last]
        dx, dy = bx - ax, by - ay
        length = math.hypot(dx, dy)
        worst, at = 0.0, None
        for i in range(first + 1, last):
            px, py = points[i]
            d = abs(dy * px - dx * py + bx * ay - by * ax) / length if length else math.hypot(px - ax, py - ay)
            if d > worst:
                worst, at = d, i
        if at is not None and worst > tolerance:
            keep[at] = True
            stack += [(first, at), (at, last)]
    return [p for p, k in zip(points, keep) if k]


def area(points):
    return abs(sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(points, points[1:] + points[:1]))) / 2


def path(parts, closed):
    def n(v):
        return f'{v:.1f}'.rstrip('0').rstrip('.')
    out = []
    for points in parts:
        out.append('M' + 'L'.join(f'{n(x)} {n(y)}' for x, y in points) + ('Z' if closed else ''))
    return ''.join(out)


def text_width(label, size):
    """About what LampPresentationTextMeasure gives for SF Rounded semibold:
    narrow letters narrower, capitals wider."""
    width = 0.0
    for ch in label:
        if ch in 'iljtf.,\'’ ':
            width += 0.3
        elif ch in 'mwMW':
            width += 0.85
        elif ch.isupper():
            width += 0.68
        else:
            width += 0.56
    return width * size


def place_names(marks):
    """LampSlideMap.placed(_:in:): beside each mark to the right, else the left,
    above, below or a corner, whichever first keeps clear of the names and marks
    already placed and of the map's edge; failing that, further off with a
    line back; failing that, whichever overlaps least."""
    gap = SIZE * 0.3
    inset = (SIZE * 0.2, SIZE * 0.2, WIDTH - SIZE * 0.2, HEIGHT - SIZE * 0.2)
    side_of_mark = SIZE * 0.4
    mark_rects = [(m['x'] - side_of_mark / 2, m['y'] - side_of_mark / 2, m['x'] + side_of_mark / 2, m['y'] + side_of_mark / 2) for m in marks]
    taken = []

    def intersection(a, b):
        w = min(a[2], b[2]) - max(a[0], b[0])
        h = min(a[3], b[3]) - max(a[1], b[1])
        return w * h if w > 0 and h > 0 else 0.0

    for index, mark in enumerate(marks):
        width = text_width(mark['label'], SIZE * 0.74) + SIZE * 0.1
        height = SIZE * 0.74 * 1.3
        px, py = mark['x'], mark['y']
        side, up = gap + width / 2, gap + height / 2
        near = [
            (px + side, py), (px - side, py), (px, py - up), (px, py + up),
            (px + side * 0.8, py - up * 0.8), (px + side * 0.8, py + up * 0.8),
            (px - side * 0.8, py - up * 0.8), (px - side * 0.8, py + up * 0.8),
        ]
        far = [
            (px + side * 2.2, py - up * 1.6), (px - side * 2.2, py - up * 1.6),
            (px + side * 2.2, py + up * 1.6), (px - side * 2.2, py + up * 1.6),
            (px, py - up * 2.6), (px, py + up * 2.6),
            (px + side * 3.2, py), (px - side * 3.2, py),
        ]

        def rect(c):
            return (c[0] - width / 2, c[1] - height / 2, c[0] + width / 2, c[1] + height / 2)

        others = [r for i, r in enumerate(mark_rects) if i != index]

        def overlap(c):
            box = rect(c)
            blocked = sum(intersection(box, other) for other in taken + others)
            outside = (box[2] - box[0]) * (box[3] - box[1]) - intersection(box, inset)
            return blocked + outside * 4

        leader = False
        chosen = next((c for c in near if overlap(c) < 0.5), None)
        if chosen is None:
            chosen = next((c for c in far if overlap(c) < 0.5), None)
            leader = chosen is not None
        if chosen is None:
            chosen = min(near + far, key=overlap)
            leader = chosen in far and chosen not in near
        taken.append(rect(chosen))
        mark['labelX'], mark['labelY'] = chosen
        mark['leader'] = leader
        if leader:
            box = rect(chosen)
            mark['leaderX'] = min(max(px, box[0]), box[2])
            mark['leaderY'] = min(max(py, box[1]), box[3])
    return marks


def relief(west, east, south, north, out):
    """The relief's pixels over the frame, cropped from core's whole-map image."""
    x0 = math.floor((west - WHOLE[0]) * RELIEF_PER_DEGREE)
    x1 = math.ceil((east - WHOLE[0]) * RELIEF_PER_DEGREE)
    y0 = math.floor((WHOLE[3] - north) * RELIEF_PER_DEGREE)
    y1 = math.ceil((WHOLE[3] - south) * RELIEF_PER_DEGREE)
    with tempfile.TemporaryDirectory() as scratch:
        cropped = Path(scratch) / 'relief.jpg'
        subprocess.run(
            ['sips', '--cropToHeightWidth', str(y1 - y0), str(x1 - x0), '--cropOffset', str(y0), str(x0),
             str(SHAPES / 'relief.jpg'), '--out', str(cropped)],
            check=True, capture_output=True,
        )
        out.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(
            ['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '72', str(cropped), '--out', str(out)],
            check=True, capture_output=True,
        )
    scale_x = WIDTH / (east - west)
    scale_y = HEIGHT / (north - south)
    return {
        'x': round((x0 / RELIEF_PER_DEGREE + WHOLE[0] - west) * scale_x, 2),
        'y': round((north - (WHOLE[3] - y0 / RELIEF_PER_DEGREE)) * scale_y, 2),
        'width': round((x1 - x0) / RELIEF_PER_DEGREE * scale_x, 2),
        'height': round((y1 - y0) / RELIEF_PER_DEGREE * scale_y, 2),
    }


def main():
    data = json.loads(PLACES.read_text())
    fields = data['fields']
    places = {row[1]: dict(zip(fields, row)) for row in data['places']}
    stops = []
    for line in LINES:
        name, _, written = line.partition(' — ')
        place = places[name.strip()]
        # LampMapStop.label: the words after a dash, else LampMapPlace.label,
        # the name without OpenBible's number.
        head, _, number = place['name'].rpartition(' ')
        label = written.strip() or (head if head and number.isdigit() else place['name'])
        stops.append({
            'label': label,
            'lon': place['longitude'],
            'lat': place['latitude'],
            'uncertain': place['confidence'] < 500,
        })

    west, east, south, north = fitting(stops, WIDTH / HEIGHT)
    detail = '10m' if east - west <= DETAILED_UP_TO else '50m'
    scale_x = WIDTH / (east - west)
    scale_y = HEIGHT / (north - south)

    def project(lon, lat):
        return ((lon - west) * scale_x, (north - lat) * scale_y)

    margin = 4
    box = (-margin, -margin, WIDTH + margin, HEIGHT + margin)

    def outlines(name):
        shapes = []
        for part in read_layer(f'{name}-{detail}'):
            lons = [p[0] for p in part]
            lats = [p[1] for p in part]
            if max(lons) < west or min(lons) > east or max(lats) < south or min(lats) > north:
                continue
            clipped = clip_polygon([project(*p) for p in part], *box)
            if len(clipped) < 3:
                continue
            simple = simplify(clipped + [clipped[0]], 1.2)[:-1]
            if len(simple) >= 3 and area(simple) > 6:
                shapes.append(simple)
        return shapes

    rivers = []
    for part in read_layer(f'rivers-{detail}'):
        for run in clip_line([project(*p) for p in part], *box):
            simple = simplify(run, 1.2)
            if sum(math.dist(a, b) for a, b in zip(simple, simple[1:])) > 12:
                rivers.append(simple)

    marks = []
    for stop in stops:
        x, y = project(stop['lon'], stop['lat'])
        marks.append({'label': stop['label'], 'x': round(x, 1), 'y': round(y, 1), 'uncertain': stop['uncertain']})
    marks = place_names(marks)
    for mark in marks:
        for key in ('labelX', 'labelY', 'leaderX', 'leaderY'):
            if key in mark:
                mark[key] = round(mark[key], 1)

    relief_rect = relief(west, east, south, north, ROOT / 'public/art/slide-map-relief.jpg')

    def literal(fields):
        return ', '.join(f"{k}: {json.dumps(v, ensure_ascii=False).replace('"', "'")}" for k, v in fields.items())

    places = '\n'.join(f'    {{ {literal(mark)} }},' for mark in marks)
    land = outlines('land')
    lakes = outlines('lakes')
    ts = f'''/**
 * Paul's first journey (Acts 13–14) as a Title & Body slide's map draws it, from
 * the places and land Lamp ships: OpenBible.info's Bible Geocoding Data (CC BY
 * 4.0, adapted) and Natural Earth (public domain). Generated by
 * scripts/build_slide_map.py from lamp-bible-core; run it again rather than
 * editing this file.
 *
 * Units are a widescreen slide's (1,600 across): the map is the page's width
 * under the heading, at the body's reading size.
 */
export const slideMap = {{
  width: {WIDTH},
  height: {HEIGHT},
  /** The size its names are set from (LampSlideMap.size). */
  size: {SIZE},
  frame: {{ west: {west:.3f}, east: {east:.3f}, south: {south:.3f}, north: {north:.3f} }},
  land: '{path(land, True)}',
  lakes: '{path(lakes, True)}',
  rivers: '{path(rivers, False)}',
  relief: {{ href: '/art/slide-map-relief.jpg', {literal(relief_rect)} }},
  places: [
{places}
  ],
}} as const
'''
    out = ROOT / 'components/home/slide-map.ts'
    out.write_text(ts)
    print(f'{out.relative_to(ROOT)}: {len(ts):,} bytes; land {sum(map(len, land))} points, '
          f'lakes {sum(map(len, lakes))}, rivers {sum(map(len, rivers))}; frame {west:.2f}…{east:.2f}, {south:.2f}…{north:.2f}')


if __name__ == '__main__':
    main()
