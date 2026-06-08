/* ============================================================
   shared JS helpers — Unit 10 guide (tool pages)
   Loaded in <head> before each page's inline script.
   ============================================================ */

/* Render LaTeX to an HTML string via KaTeX, with a plain-text
   fallback if KaTeX hasn't loaded yet (or errors).
   latex   - the LaTeX source string
   fallback - plain text to show if rendering isn't available (optional)
   display - true for display (block) mode, false/omitted for inline */
function tex(latex, fallback, display){
  if(window.katex){
    try{ return katex.renderToString(latex, {throwOnError:false, displayMode:!!display}); }
    catch(e){}
  }
  return `<span class="tex-fallback">${fallback!=null?fallback:latex}</span>`;
}

/* Wrap a LaTeX fragment in a color, for color-coded formulas.
   Returns a \textcolor{...}{...} string to embed inside other LaTeX. */
const cc = (hex, body) => `\\textcolor{${hex}}{${body}}`;

/* ============================================================
   progress recorder — quietly notes which lesson/exam/sheet
   pages you've opened, so the hub can offer "continue where you
   left off" and per-unit progress. Stored locally (this origin
   only) under vcalc:v1; never leaves the browser.
   ============================================================ */
(function(){
  try{
    var K='vcalc:v1';
    var s=JSON.parse(localStorage.getItem(K)||'{}');
    s.visited=s.visited||{};
    var f=(location.pathname.split('/').pop()||'').toLowerCase();
    if(f && f!=='index.html' && f.indexOf('-standalone')<0 && f.indexOf('.html')>=0){
      s.visited[f]=Date.now();
      s.last=f;
      localStorage.setItem(K, JSON.stringify(s));
    }
  }catch(e){}
})();
