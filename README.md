# contexter → synoikon

Contexter was renamed to **Synoikon**: https://lessthan301.github.io/synoikon/ (source: https://github.com/LessThan301/synoikon).

This repository only keeps old links working. GitHub Pages serves `index.html` and `404.html` for every path under
`/contexter/`, and both redirect to the same path under `/synoikon/`, keeping the query string and `#hash`
(e.g. `/contexter/#q=river&lang=en` → `/synoikon/#q=river&lang=en`, `/contexter/w/en/forest/` → `/synoikon/w/en/forest/`).
`sw.js` replaces the old app's service worker on devices that installed it: it deletes the old caches, unregisters
itself and moves open windows to `/synoikon/`.
