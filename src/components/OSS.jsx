// oss.northbound.sh, ported 1:1 from the design canvas (OSS.dc.html). The logic
// is the canvas's DCLogic class almost verbatim; the template is the same markup
// as JSX. Copy in EN and RU (i18n.js); `/` follows the system language (Base.astro).
// The canvas's hand-off screen is a mockup: here the NativeNCA tile opens the
// project's site directly, through the same black hand-over as northbound.sh;
// the project site plays the oss intro (public/intro.js) when opened from here.
import React from 'react';
import { sx, LOGO_L, LOGO_R, Dots, NB_URL, PROJECTS_URL } from './shared.jsx';
import { dict } from '../i18n.js';

export default class OSS extends React.Component {
  constructor(props) {
    super(props);
    // rendered as the server did (English on `/`); switched to Russian once mounted, see componentDidMount
    this.state = { lang: props.lang === 'ru' ? 'ru' : 'en', leaving: false, busy: false, veil: false, press: null, dlg: false, dlgClosing: false };
    this.press = (e) => {
      const el = e.currentTarget;
      if (!el || !el.getBoundingClientRect) return;
      const r = el.getBoundingClientRect();
      this.setState({ press: { id: el.getAttribute('data-id'), x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 } });
    };
    this.release = () => { if (this.state.press) this.setState({ press: null }); };
    this.askHow = () => { clearTimeout(this.dt); this.setState({ dlg: true, dlgClosing: false }); };
    this.dlgClose = () => {
      if (!this.state.dlg || this.state.dlgClosing) return;
      this.setState({ dlgClosing: true });
      clearTimeout(this.dt);
      this.dt = setTimeout(() => this.setState({ dlg: false, dlgClosing: false }), 220);
    };
    this.dlgKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); this.dlgClose(); } };
    this.dlgRef = (el) => {
      if (!el) return;
      requestAnimationFrame(() => {
        const b = el.querySelector('.dbtn');
        try { (b || el).focus({ preventScroll: true }); } catch (err) {}
      });
    };
    // leaving for northbound.sh or a project's site: the tiles turn out and the page fades to black,
    // then the link is followed
    this.goLink = (e) => {
      if (this.go) { this.go = false; return; }
      const a = e.currentTarget;
      let reduce = false;
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (err) {}
      if (reduce || !a || this.state.leaving) return;
      if (e.preventDefault) e.preventDefault();
      this.setState({ leaving: true, busy: true, veil: true, press: null, dlg: false, dlgClosing: false });
      clearTimeout(this.t1); clearTimeout(this.t2);
      this.t1 = setTimeout(() => {
        this.go = true;
        try { a.click(); } catch (err) {}
        this.t2 = setTimeout(this.back, 700);
      }, 560);
    };
    // still here (navigation blocked) or back from the history cache: the page comes back
    this.back = () => this.setState({ leaving: false, busy: false, veil: false });
    this.onShow = (e) => { if (e.persisted) { clearTimeout(this.t2); this.back(); } };
  }

  componentDidMount() {
    try { window.addEventListener('pageshow', this.onShow); } catch (e) {}
    // `/` with a Russian system language: the page waits hidden (nb-wait) until it is in Russian
    const show = () => { try { document.documentElement.classList.remove('nb-wait'); } catch (e) {} };
    if (this.props.lang === 'auto' && typeof window !== 'undefined' && window.__nbLang === 'ru') this.setState({ lang: 'ru' }, show);
    else show();
  }

  componentWillUnmount() {
    [this.t1, this.t2, this.dt].forEach((t) => clearTimeout(t));
    try { window.removeEventListener('pageshow', this.onShow); } catch (e) {}
  }

  renderVals() {
    const s = this.state;
    const tf = {};
    ['nca', 'how'].forEach((id) => {
      const p = s.press;
      tf[id] = p && p.id === id
        ? 'perspective(800px) rotateY(' + (p.x * 14).toFixed(2) + 'deg) rotateX(' + (-p.y * 14).toFixed(2) + 'deg) scale(.96)'
        : 'none';
    });
    return {
      nb: NB_URL + (s.lang === 'ru' ? 'ru/' : ''),
      // NativeNCA's site: Russian at its root, English under en/
      nca: PROJECTS_URL + 'NativeNCA/' + (s.lang === 'ru' ? '' : 'en/'),
      accent: this.props.accent ?? '#E11D48',
      busy: s.busy,
      veil: s.veil,
      tileCls: s.leaving ? 'tt-out' : 'tt',
      lineCls: s.leaving ? 'so' : 'si',
      tf: tf,
      dlgOn: !!s.dlg,
      dlgCls: 'dlg' + (s.dlgClosing ? ' closing' : '')
    };
  }

  render() {
    const v = this.renderVals();
    const t = dict[this.state.lang];
    const tilePress = { onPointerDown: this.press, onPointerUp: this.release, onPointerLeave: this.release, onPointerCancel: this.release };
    return (
      <div className="root" style={{ '--accent': v.accent, position: 'relative', width: '100%', overflow: 'hidden', background: '#000000', color: '#f5f5f5', fontFamily: t.font }}>

        {v.busy && <Dots cls="dl busy" />}

        {/* ============ HOME ============ */}
        <main className="home">
          <div className="pano-wrap" aria-hidden="true"><div className="pano-in"><div className="pano">{t.pano}</div></div></div>

          <section aria-label={t.introLabel} style={sx('position: relative; min-width: 0; container-type: inline-size')}>
            <p className={'eyebrow ' + v.lineCls} style={sx('--i:0')}>{t.eyebrow}</p>
            <h1 className="h1">
              <span className={'ln ' + v.lineCls} style={sx('--i:1; color: #6f6f6f')}>{t.h1[0]}</span>
              <span className={'ln ' + v.lineCls} style={sx('--i:2; color: #6f6f6f')}>{t.h1[1]}</span>
              <span className={'ln ' + v.lineCls} style={sx('--i:3')}>{t.h1[2]}</span>
            </h1>
            <p className={'lead ' + v.lineCls} style={sx('--i:4')}>{t.lead}</p>
            <p className={'note ' + v.lineCls} style={sx('--i:5')}>{t.note}</p>
          </section>

          <nav className="tiles" aria-label={t.navLabel} style={sx('position: relative')}>

            {/* NativeNCA → its own site */}
            <a className={'tile ' + v.tileCls} data-id="nca" href={v.nca} onClick={this.goLink} style={sx('--i:0; grid-column: 1 / span 2; grid-row: 1 / span 2')} {...tilePress} aria-label={t.ncaAria}>
              <span className="ti" style={{ transform: v.tf.nca }}>
                <span style={sx('display: block')}>
                  <span className="tl">01 · windows</span>
                  <span className="pdesc">{t.ncaDesc}</span>
                </span>
                <span className="tc" aria-hidden="true">↗</span>
                <span style={sx('display: block')}>
                  <span className="pname">NativeNCA</span>
                  <span className="tl" style={sx('margin-top: 8px')}>{t.ncaBy}</span>
                </span>
              </span>
            </a>

            {/* How it works */}
            <button type="button" className={'tile ' + v.tileCls} data-id="how" style={sx('--i:2; grid-column: 3 / span 2; grid-row: 1')} onClick={this.askHow} {...tilePress} aria-haspopup="dialog" aria-label={t.howAria}>
              <span className="ti" style={{ transform: v.tf.how }}>
                <span className="tl">{t.howTl}</span>
                <span className="lbl" style={sx('font-weight: 300; font-size: calc(var(--c) * 0.17); letter-spacing: -0.02em')}>{t.howLbl}</span>
              </span>
            </button>

            {/* Count */}
            <div className={'tile static ' + v.tileCls} style={sx('--i:3; grid-column: 3; grid-row: 2')} role="img" aria-label={t.countAria}>
              <span className="ti">
                <span className="tl">{t.countTl}</span>
                <span style={sx('display: block; font-weight: 200; font-size: calc(var(--c) * 0.36); line-height: 1; letter-spacing: -0.05em')}>01</span>
              </span>
            </div>

            {/* Next */}
            <div className={'tile static dash ' + v.tileCls} style={sx('--i:4; grid-column: 4; grid-row: 2')} role="img" aria-label={t.nextAria}>
              <span className="ti">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6f6f6f" strokeWidth="1.2" aria-hidden="true"><path className="spin" d="M12 3v18M3 12h18"></path></svg>
                <span className="tl">{t.nextTl}</span>
              </span>
            </div>
          </nav>
        </main>

        {/* ============ CHROME ============ */}
        <header className="top">
          <a className="brand" href={t.lang === 'ru' ? '/ru/' : '/'} aria-label={t.brandAria} style={sx('color: #f5f5f5; text-decoration: none')}>
            <svg viewBox="0 0 256 256" width="30" height="30" aria-hidden="true">
              <path className="l1" d={LOGO_L} fill={v.accent}></path>
              <path className="l2" d={LOGO_R} fill="#F8FAFC"></path>
            </svg>
            <span className="wm">northbound<span className="wmo">oss</span></span>
          </a>
          <a className="toco" href={v.nb} onClick={this.goLink}><span aria-hidden="true">←</span> northbound<b>.sh</b></a>
        </header>

        <footer className="barrow">
          <span className="tiny">{t.footL}</span>
          <span className="tiny opt">{t.footR}</span>
        </footer>

        {/* how-it-works band */}
        {v.dlgOn && (
          <div className={v.dlgCls}>
            <div className="dlg-scrim" onClick={this.dlgClose}></div>
            <div className="dlg-band" role="dialog" aria-modal="true" aria-labelledby="dlg-title" tabIndex={-1} onKeyDown={this.dlgKey} ref={this.dlgRef}>
              <div className="dlg-in">
                <h2 id="dlg-title" className="dlg-t si" style={sx('--i:0')}>{t.dlgT}</h2>
                <p className="dlg-p si" style={sx('--i:1')}>{t.dlgP}</p>
                <dl className="hf si" style={sx('--i:2')}>
                  {t.dlgFacts.map((f) => <React.Fragment key={f[0]}><dt>{f[0]}</dt><dd>{f[1]}</dd></React.Fragment>)}
                </dl>
                <div className="dlg-btns si" style={sx('--i:3')}>
                  <button type="button" className="dbtn pri" onClick={this.dlgClose}>{t.dlgOk}</button>
                  <a className="dbtn" href={v.nb} onClick={this.goLink}>northbound.sh</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {v.veil && <div className="veil" aria-hidden="true"></div>}
      </div>
    );
  }
}
