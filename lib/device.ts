/** Where the docs' device switch keeps the reader's choice. */
export const deviceKey = 'lamp.docs.device'

/**
 * Applies the saved choice to <html> before anything paints. It runs on every page, not only the
 * docs, so arriving at the docs by a link inside the site finds it already applied. Storage can be
 * missing or refused; then it is Both.
 */
export const deviceScript = `try{var d=localStorage.getItem('${deviceKey}');if(d==='ios'||d==='mac')document.documentElement.dataset.device=d}catch(e){}`
