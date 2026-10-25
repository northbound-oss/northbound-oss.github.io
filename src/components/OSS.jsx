// oss.northbound.sh, ported 1:1 from the design canvas (OSS.dc.html). The logic
// is the canvas's DCLogic class almost verbatim; the template is the same markup
// as JSX. English only, like the canvas.
// The canvas's hand-off screen is a mockup: here the NativeNCA tile opens the
// project directly (its GitHub page until oss.northbound.sh/nca exists).
import React from 'react';
import { sx, LOGO_L, LOGO_R, Dots, NB_URL } from './shared.jsx';

const NCA_URL = 'https://github.com/DonnerTechDev/NativeNCA';

export default class OSS extends React.Component {
  constructor(props) {
    super(props);
    this.state = { leaving: false, busy: false, veil: false, press: null, dlg: false, dlgClosing: false };
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
    // leaving for northbound.sh: the tiles turn out and the page fades to black, then the link is followed
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
    const tilePress = { onPointerDown: this.press, onPointerUp: this.release, onPointerLeave: this.release, onPointerCancel: this.release };
    return (
      <div className="root" style={{ '--accent': v.accent, position: 'relative', width: '100%', overflow: 'hidden', background: '#000000', color: '#f5f5f5', fontFamily: "'Sora', system-ui, sans-serif" }}>

        {v.busy && <Dots cls="dl busy" />}

        {/* ============ HOME ============ */}
        <main className="home">
          <div className="pano-wrap" aria-hidden="true"><div className="pano-in"><div className="pano">open source</div></div></div>

          <section aria-label="Introduction" style={sx('position: relative; min-width: 0; container-type: inline-size')}>
            <p className={'eyebrow ' + v.lineCls} style={sx('--i:0')}>open source · by our developers</p>
            <h1 className="h1">
              <span className={'ln ' + v.lineCls} style={sx('--i:1; color: #6f6f6f')}>Our people's</span>
              <span className={'ln ' + v.lineCls} style={sx('--i:2; color: #6f6f6f')}>own code,</span>
              <span className={'ln ' + v.lineCls} style={sx('--i:3')}>open to all.</span>
            </h1>
            <p className={'lead ' + v.lineCls} style={sx('--i:4')}>Software that northbound developers build on their own time and give away. Free, public, and theirs.</p>
            <p className={'note ' + v.lineCls} style={sx('--i:5')}>Not published by northbound. Each project belongs to its authors, under its own license.</p>
          </section>

          <nav className="tiles" aria-label="Projects" style={sx('position: relative')}>

            {/* NativeNCA → its own site */}
            <a className={'tile ' + v.tileCls} data-id="nca" href={NCA_URL} target="_blank" rel="noopener" style={sx('--i:0; grid-column: 1 / span 2; grid-row: 1 / span 2')} {...tilePress} aria-label="NativeNCA — native Windows replacement for NCALayer, by DonnerTechDev">
              <span className="ti" style={{ transform: v.tf.nca }}>
                <span style={sx('display: block')}>
                  <span className="tl">01 · windows</span>
                  <span className="pdesc">Native replacement for NCALayer</span>
                </span>
                <span className="tc" aria-hidden="true">↗</span>
                <span style={sx('display: block')}>
                  <span className="pname">NativeNCA</span>
                  <span className="tl" style={sx('margin-top: 8px')}>by DonnerTechDev</span>
                </span>
              </span>
            </a>

            {/* How it works */}
            <button type="button" className={'tile ' + v.tileCls} data-id="how" style={sx('--i:2; grid-column: 3 / span 2; grid-row: 1')} onClick={this.askHow} {...tilePress} aria-haspopup="dialog" aria-label="How open source works at northbound">
              <span className="ti" style={{ transform: v.tf.how }}>
                <span className="tl">not company releases</span>
                <span className="lbl" style={sx('font-weight: 300; font-size: calc(var(--c) * 0.17); letter-spacing: -0.02em')}>how it works</span>
              </span>
            </button>

            {/* Count */}
            <div className={'tile static ' + v.tileCls} style={sx('--i:3; grid-column: 3; grid-row: 2')} role="img" aria-label="1 project">
              <span className="ti">
                <span className="tl">projects</span>
                <span style={sx('display: block; font-weight: 200; font-size: calc(var(--c) * 0.36); line-height: 1; letter-spacing: -0.05em')}>01</span>
              </span>
            </div>

            {/* Next */}
            <div className={'tile static dash ' + v.tileCls} style={sx('--i:4; grid-column: 4; grid-row: 2')} role="img" aria-label="More projects coming">
              <span className="ti">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6f6f6f" strokeWidth="1.2" aria-hidden="true"><path className="spin" d="M12 3v18M3 12h18"></path></svg>
                <span className="tl">next · soon</span>
              </span>
            </div>
          </nav>
        </main>

        {/* ============ CHROME ============ */}
        <header className="top">
          <a className="brand" href="/" aria-label="northbound oss — start" style={sx('color: #f5f5f5; text-decoration: none')}>
            <svg viewBox="0 0 256 256" width="30" height="30" aria-hidden="true">
              <path className="l1" d={LOGO_L} fill={v.accent}></path>
              <path className="l2" d={LOGO_R} fill="#F8FAFC"></path>
            </svg>
            <span className="wm">northbound<span className="wmo">oss</span></span>
          </a>
          <a className="toco" href={NB_URL} onClick={this.goLink}><span aria-hidden="true">←</span> northbound<b>.sh</b></a>
        </header>

        <footer className="barrow">
          <span className="tiny">© 2026 the authors</span>
          <span className="tiny opt">projects are not northbound products</span>
        </footer>

        {/* how-it-works band */}
        {v.dlgOn && (
          <div className={v.dlgCls}>
            <div className="dlg-scrim" onClick={this.dlgClose}></div>
            <div className="dlg-band" role="dialog" aria-modal="true" aria-labelledby="dlg-title" tabIndex={-1} onKeyDown={this.dlgKey} ref={this.dlgRef}>
              <div className="dlg-in">
                <h2 id="dlg-title" className="dlg-t si" style={sx('--i:0')}>how oss works here</h2>
                <p className="dlg-p si" style={sx('--i:1')}>Everything on oss.northbound.sh is made by northbound developers on their own time. The company does not publish, sell or support these projects.</p>
                <dl className="hf si" style={sx('--i:2')}>
                  <dt>authors</dt><dd>the developers who wrote them</dd>
                  <dt>license</dt><dd>set by each project, see its repository</dd>
                  <dt>issues</dt><dd>in each project's own repository</dd>
                  <dt>company products</dt><dd>on northbound.sh</dd>
                </dl>
                <div className="dlg-btns si" style={sx('--i:3')}>
                  <button type="button" className="dbtn pri" onClick={this.dlgClose}>got it</button>
                  <a className="dbtn" href={NB_URL} onClick={this.goLink}>northbound.sh</a>
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
