// northbound oss: the intro a project site plays when it is opened from oss.northbound.sh.
// The page itself decides (a few lines at the top of its <head>, below): only a visit that comes
// from the oss start page gets it; a direct visit gets the page as it is. The page starts black
// (html.oss-in hides its body), this script shows the project's name, what it is, its author and
// the oss mark long enough to read, then hands over to the page, whatever its design.
//
// <script>
// // northbound oss hand-over: opened from oss.northbound.sh, the page starts black and plays the oss intro
// (function () {
//   var o = location.hostname === 'localhost' ? 'http://localhost:4330' : 'https://oss.northbound.sh';
//   var r = document.referrer, d = document.documentElement;
//   try { if ((r !== o + '/' && r !== o + '/ru/') || matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) { return; }
//   window.ossIntro = { product: 'NativeNCA', by: 'DonnerTechDev', line: 'Замена NCALayer для Windows' };
//   d.classList.add('oss-in');
//   var s = document.createElement('script');
//   s.src = o + '/intro.js'; s.async = true;
//   s.onerror = function () { d.classList.remove('oss-in'); };
//   document.head.appendChild(s);
//   setTimeout(function () { if (!window.ossIntroStarted) d.classList.remove('oss-in'); }, 2500);
// })();
// </script>
// <style>html.oss-in{background:#000;overflow:hidden}html.oss-in body{visibility:hidden}</style>
(function () {
  var c = window.ossIntro, d = document.documentElement;
  if (!c || !d.classList.contains('oss-in') || window.ossIntroStarted) return;
  window.ossIntroStarted = true;

  var base = 'https://oss.northbound.sh/';
  try { base = new URL('./', document.currentScript.src).href; } catch (e) {}
  var lang = (d.getAttribute('lang') || 'en').slice(0, 2).toLowerCase();
  var by = { ru: 'автор', kk: 'авторы', uk: 'автор', be: 'аўтар' }[lang] || 'by';

  // the same fonts, at the same URLs, as on oss.northbound.sh: arriving from there they are cached
  var LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
  var LATIN_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';
  var CYR = 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116';
  var CYR_EXT = 'U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F';
  var face = function (family, weight, file, range) {
    return '@font-face{font-family:"' + family + '";font-style:normal;font-display:swap;font-weight:' + weight +
      ';src:url(' + base + 'fonts/' + file + ') format("woff2");unicode-range:' + range + '}';
  };
  var E = 'cubic-bezier(.1,.9,.2,1)';
  var css = [
    face('ossi Sora', '100 800', 'sora-latin-wght-normal.woff2', LATIN),
    face('ossi Sora', '100 800', 'sora-latin-ext-wght-normal.woff2', LATIN_EXT),
    face('ossi Sora', '100 800', 'onest-cyrillic-wght-normal.woff2', CYR),
    face('ossi Sora', '100 800', 'onest-cyrillic-ext-wght-normal.woff2', CYR_EXT),
    face('ossi Mono', '400', 'ibm-plex-mono-latin-400-normal.woff2', LATIN),
    face('ossi Mono', '400', 'ibm-plex-mono-latin-ext-400-normal.woff2', LATIN_EXT),
    face('ossi Mono', '400', 'ibm-plex-mono-cyrillic-400-normal.woff2', CYR),
    face('ossi Mono', '400', 'ibm-plex-mono-cyrillic-ext-400-normal.woff2', CYR_EXT),
    '@keyframes ossiIn{from{opacity:0;transform:translateX(64px)}to{opacity:1;transform:none}}',
    '@keyframes ossiDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}',
    '@keyframes ossiL1{from{opacity:0;transform:translate(-30px,30px)}to{opacity:1;transform:none}}',
    '@keyframes ossiL2{from{opacity:0;transform:translate(30px,-30px)}to{opacity:1;transform:none}}',
    '@keyframes ossiOut{to{opacity:0;transform:translateX(-48px)}}',
    '@keyframes ossiFade{to{opacity:0;visibility:hidden}}',
    // the oss site's metro dots (src/styles/oss.css)
    '@keyframes metroDot{0%{opacity:1}0%{left:calc(-2% - 96px)}0.075%{left:calc(-1.446% - 95.79px)}0.299%{left:calc(0.187% - 95.18px)}0.673%{left:calc(2.807% - 94.16px)}1.193%{left:calc(6.276% - 92.73px)}1.857%{left:calc(10.409% - 90.91px)}2.664%{left:calc(14.999% - 88.69px)}3.609%{left:calc(19.824% - 86.1px)}4.689%{left:calc(24.669% - 83.14px)}5.899%{left:calc(29.335% - 79.82px)}7.233%{left:calc(33.657% - 76.16px)}8.686%{left:calc(37.508% - 72.18px)}10.251%{left:calc(40.808% - 67.88px)}11.923%{left:calc(43.52% - 63.3px)}13.693%{left:calc(45.653% - 58.44px)}15.555%{left:calc(47.248% - 53.33px)}17.5%{left:calc(48.375% - 48px)}19.52%{left:calc(49.12% - 42.46px)}21.606%{left:calc(49.573% - 36.74px)}23.75%{left:calc(49.822% - 30.86px)}25.941%{left:calc(49.94% - 24.85px)}28.172%{left:calc(49.985% - 18.73px)}30.432%{left:calc(49.998% - 12.53px)}32.711%{left:calc(50% - 6.28px)}35%{left:calc(50% + 0px)}37.289%{left:calc(50% + 6.28px)}39.568%{left:calc(50.002% + 12.53px)}41.828%{left:calc(50.015% + 18.73px)}44.059%{left:calc(50.06% + 24.85px)}46.25%{left:calc(50.178% + 30.86px)}48.394%{left:calc(50.427% + 36.74px)}50.48%{left:calc(50.88% + 42.46px)}52.5%{left:calc(51.625% + 48px)}54.445%{left:calc(52.752% + 53.33px)}56.307%{left:calc(54.347% + 58.44px)}58.077%{left:calc(56.48% + 63.3px)}59.749%{left:calc(59.192% + 67.88px)}61.314%{left:calc(62.492% + 72.18px)}62.767%{left:calc(66.343% + 76.16px)}64.101%{left:calc(70.665% + 79.82px)}65.311%{left:calc(75.331% + 83.14px)}66.391%{left:calc(80.176% + 86.1px)}67.336%{left:calc(85.001% + 88.69px)}68.143%{left:calc(89.591% + 90.91px)}68.807%{left:calc(93.724% + 92.73px)}69.327%{left:calc(97.193% + 94.16px)}69.701%{left:calc(99.813% + 95.18px)}69.925%{left:calc(101.446% + 95.79px)}70%{left:calc(102% + 96px)}70%{opacity:1}70.01%,100%{opacity:0;left:calc(102% + 96px)}}',
    '.ossi{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;background:#000;color:#f5f5f5;font-family:"ossi Sora",system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-align:left;pointer-events:none}',
    '.ossi *{box-sizing:border-box;margin:0;padding:0}',
    '.ossi-in{display:flex;flex-direction:column;align-items:flex-start;width:min(640px,100%)}',
    '.ossi-brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:15px;letter-spacing:-.02em;white-space:nowrap;animation:ossiDown .7s ' + E + ' both}',
    '.ossi-brand b{font-weight:200;color:#8c8c8c;margin-left:.3em}',
    '.ossi-brand path{transform-box:fill-box}',
    '.ossi-brand .l1{animation:ossiL1 .8s ' + E + ' both}',
    '.ossi-brand .l2{animation:ossiL2 .8s ' + E + ' both .08s}',
    '.ossi-name{margin-top:28px;font-weight:600;font-size:clamp(44px,9vw,104px);line-height:.95;letter-spacing:-.05em;overflow-wrap:anywhere;animation:ossiIn .9s ' + E + ' both .15s}',
    '.ossi-line{margin-top:18px;max-width:36ch;font-weight:300;font-size:clamp(15px,1.6vw,19px);line-height:1.45;color:#9a9a9a;animation:ossiIn .9s ' + E + ' both .27s}',
    '.ossi-by{margin-top:14px;font:400 11px/1.4 "ossi Mono",ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#8c8c8c;animation:ossiIn .9s ' + E + ' both .39s}',
    '.ossi-dots{position:relative;align-self:stretch;height:6px;margin-top:36px;overflow:hidden}',
    '.ossi-dots i{position:absolute;top:1px;left:-2%;width:4px;height:4px;border-radius:50%;background:#f5f5f5;opacity:0;animation:metroDot 3s linear infinite}',
    '.ossi.out .ossi-in>*{animation:ossiOut .3s cubic-bezier(.7,0,.9,.4) both}',
    '.ossi.out .ossi-in>:nth-child(2){animation-delay:.03s}.ossi.out .ossi-in>:nth-child(3){animation-delay:.06s}.ossi.out .ossi-in>:nth-child(4){animation-delay:.09s}',
    '.ossi.out{animation:ossiFade .5s ease both .2s}'
  ].join('\n');

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  var o = el('div', 'ossi');
  o.setAttribute('aria-hidden', 'true');
  var box = el('div', 'ossi-in');
  var brand = el('div', 'ossi-brand');
  brand.innerHTML = '<svg viewBox="0 0 256 256" width="22" height="22"><path class="l1" d="M108 60L14 226L106 169L124 82.88Z" fill="#E11D48"></path><path class="l2" d="M168 24L244 155.6L174 115.19L156 125.58L214 226L115 169L134 82.88Z" fill="#F8FAFC"></path></svg>';
  var wm = el('span', '', 'northbound');
  wm.appendChild(el('b', '', 'oss'));
  brand.appendChild(wm);
  box.appendChild(brand);
  box.appendChild(el('div', 'ossi-name', c.product));
  if (c.line) box.appendChild(el('div', 'ossi-line', c.line));
  if (c.by) box.appendChild(el('div', 'ossi-by', by + ' · ' + c.by));
  var dots = el('div', 'ossi-dots');
  for (var i = 0; i < 5; i++) {
    var dot = el('i');
    dot.style.animationDelay = (i * 130) + 'ms';
    dots.appendChild(dot);
  }
  box.appendChild(dots);
  o.appendChild(box);
  d.appendChild(o);

  // long enough to read; then the page shows under the fading intro
  setTimeout(function () {
    o.className = 'ossi out';
    d.classList.remove('oss-in');
    setTimeout(function () {
      if (o.parentNode) o.parentNode.removeChild(o);
      if (st.parentNode) st.parentNode.removeChild(st);
    }, 800);
  }, 2300);
})();
