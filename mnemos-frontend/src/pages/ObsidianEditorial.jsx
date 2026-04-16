import { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #b9ccb7;
    --primary-dim: #abbea9;
    --primary-container: #3a4b3b;
    --on-primary-container: #c3d5c0;
    --surface: #0e0e0e;
    --surface-container-low: #131313;
    --surface-container: #191a1a;
    --surface-container-high: #1f2020;
    --surface-container-highest: #252626;
    --surface-bright: #2b2c2c;
    --background: #0e0e0e;
    --on-background: #e7e5e5;
    --on-surface: #e7e5e5;
    --on-surface-variant: #acabaa;
    --outline: #767575;
    --outline-variant: #484848;
    --secondary: #9d9e9a;
    --secondary-container: #393c38;
  }

  html { scroll-behavior: smooth; }

  .obsidian-root {
    font-family: 'Manrope', sans-serif;
    background-color: var(--background);
    color: var(--on-surface);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .obsidian-root .serif { font-family: 'Newsreader', serif; }

  .obsidian-root ::selection {
    background: var(--primary-container);
    color: var(--primary);
  }

  .obsidian-root a { text-decoration: none; color: inherit; cursor: pointer; }

  /* GRAIN */
  .grain-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.035;
    z-index: 100;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
  }

  /* NAV */
  .obs-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
    background-color: rgba(14,14,14,0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
    max-width: 1600px;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
  }

  .obs-nav .nav-logo {
    font-family: 'Newsreader', serif;
    font-style: italic;
    font-size: 1.25rem;
    color: var(--primary);
    font-weight: 300;
  }

  .obs-nav .nav-links {
    display: flex;
    gap: 3rem;
    font-family: 'Newsreader', serif;
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: -0.01em;
  }

  .obs-nav .nav-links a { color: #555; transition: color 0.3s ease; }
  .obs-nav .nav-links a:hover { color: var(--primary); }

  .obs-nav .nav-cta {
    font-family: 'Newsreader', serif;
    font-weight: 300;
    font-size: 1rem;
    color: var(--primary);
    transition: color 0.3s ease;
  }
  .obs-nav .nav-cta:hover { color: var(--on-surface); }

  /* HERO */
  .obs-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8rem 3rem 3rem 6rem;
    position: relative;
    overflow: hidden;
  }

  .obs-hero .hero-inner { max-width: 900px; }

  .obs-hero h1 {
    font-family: 'Newsreader', serif;
    font-size: clamp(4rem, 9vw, 9rem);
    font-weight: 200;
    line-height: 0.9;
    letter-spacing: -0.03em;
    margin-bottom: 3rem;
    opacity: 0;
    animation: obsfadeInUp 1.2s ease forwards 0.2s;
  }

  .obs-hero .hero-sub {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.35rem);
    color: var(--on-surface-variant);
    max-width: 580px;
    font-weight: 300;
    line-height: 1.7;
    margin-bottom: 4rem;
    opacity: 0;
    animation: obsfadeInUp 1.2s ease forwards 0.5s;
  }

  .obs-hero .hero-cta {
    font-family: 'Newsreader', serif;
    font-style: italic;
    font-size: 1.4rem;
    color: var(--primary);
    text-decoration: underline;
    text-underline-offset: 10px;
    text-decoration-thickness: 1px;
    transition: color 0.5s ease;
    opacity: 0;
    animation: obsfadeInUp 1.2s ease forwards 0.8s;
    display: inline-block;
  }
  .obs-hero .hero-cta:hover { color: var(--on-surface); }

  .hero-accent {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 256px;
    background: rgba(185,204,183,0.15);
  }

  @keyframes obsfadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* PHILOSOPHY */
  .obs-philosophy {
    padding: 12rem 3rem;
    background-color: var(--surface-container-low);
  }

  .obs-philosophy .philosophy-inner {
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
  }

  .eyebrow {
    font-family: 'Manrope', sans-serif;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.45em;
    color: var(--primary);
    margin-bottom: 2.5rem;
    display: block;
  }

  .obs-philosophy h2 {
    font-family: 'Newsreader', serif;
    font-size: clamp(2.5rem, 5vw, 3.75rem);
    font-weight: 300;
    line-height: 1.15;
    margin-bottom: 3.5rem;
    letter-spacing: -0.02em;
  }

  .obs-philosophy p {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(1rem, 1.2vw, 1.2rem);
    color: var(--on-surface-variant);
    font-weight: 300;
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  /* FEATURES */
  .obs-features {
    padding: 12rem 3rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;
  }

  .feature-item { display: flex; flex-direction: column; gap: 2rem; }

  .feature-num {
    font-family: 'Newsreader', serif;
    font-size: 2.5rem;
    color: rgba(185,204,183,0.25);
    font-style: italic;
  }

  .feature-item h3 {
    font-family: 'Newsreader', serif;
    font-size: 1.75rem;
    font-weight: 300;
    line-height: 1.2;
  }

  .feature-item p {
    font-family: 'Manrope', sans-serif;
    font-size: 0.95rem;
    color: var(--on-surface-variant);
    font-weight: 300;
    line-height: 1.8;
  }

  /* SHOWCASE */
  .obs-showcase { padding: 0 3rem 12rem; }

  .showcase-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    height: 580px;
    background-color: var(--surface-container-highest);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .showcase-mock {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .mock-ui {
    display: flex;
    width: 85%;
    height: 80%;
    gap: 0;
  }

  .mock-sidebar {
    width: 200px;
    flex-shrink: 0;
    background: var(--surface-container-low);
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .mock-sidebar-logo {
    font-family: 'Newsreader', serif;
    font-style: italic;
    font-size: 0.8rem;
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .mock-entry { padding: 0.6rem 0.75rem; cursor: default; }
  .mock-entry.active { background: var(--surface-bright); }

  .mock-entry-title {
    font-family: 'Newsreader', serif;
    font-size: 0.75rem;
    color: var(--on-primary-container);
    margin-bottom: 0.2rem;
  }

  .mock-entry-date {
    font-family: 'Manrope', sans-serif;
    font-size: 0.6rem;
    color: var(--on-surface-variant);
    opacity: 0.6;
  }

  .mock-editor {
    flex: 1;
    background: var(--surface);
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .mock-editor-date {
    font-family: 'Manrope', sans-serif;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--on-surface-variant);
    opacity: 0.5;
  }

  .mock-editor-title {
    font-family: 'Newsreader', serif;
    font-size: 1.8rem;
    font-weight: 300;
    color: var(--on-surface);
    line-height: 1.1;
  }

  .mock-editor-line {
    width: 1px;
    height: 1.5rem;
    background: var(--primary);
    opacity: 0.7;
    animation: obsblink 1.2s step-end infinite;
  }

  @keyframes obsblink {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 0; }
  }

  .mock-editor-body {
    margin-top: 1.5rem;
    gap: 0.75rem;
    display: flex;
    flex-direction: column;
  }

  .mock-line { height: 1px; background: var(--on-surface); opacity: 0.08; }
  .mock-line.w-full-line { width: 100%; }
  .mock-line.w-90 { width: 90%; }
  .mock-line.w-75 { width: 75%; }
  .mock-line.w-60 { width: 60%; }
  .mock-line.w-30 { width: 30%; }
  .mock-line.w-gap { height: 1rem; background: transparent; }

  .mock-wordcount {
    margin-top: auto;
    font-family: 'Manrope', sans-serif;
    font-size: 0.6rem;
    color: var(--on-surface-variant);
    opacity: 0.4;
    letter-spacing: 0.1em;
  }

  .showcase-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(185,204,183,0.07);
    pointer-events: none;
  }

  .showcase-label {
    position: absolute;
    bottom: 2.5rem;
    left: 3rem;
    font-family: 'Manrope', sans-serif;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    color: var(--on-surface-variant);
  }

  /* FINAL CTA */
  .obs-final-cta {
    padding: 16rem 3rem;
    text-align: center;
    position: relative;
  }

  .obs-final-cta .final-cta-inner { max-width: 900px; margin: 0 auto; }

  .obs-final-cta h2 {
    font-family: 'Newsreader', serif;
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 200;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 5rem;
  }

  .obs-final-cta h2 em { font-style: italic; color: var(--primary); }

  .cta-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .cta-primary {
    font-family: 'Manrope', sans-serif;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: var(--primary);
    transition: color 0.3s ease;
  }
  .cta-primary:hover { color: var(--on-surface); }

  .cta-divider {
    width: 3rem;
    height: 1px;
    background: var(--outline-variant);
    flex-shrink: 0;
  }

  .cta-secondary {
    font-family: 'Manrope', sans-serif;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: var(--on-surface-variant);
    transition: color 0.3s ease;
  }
  .cta-secondary:hover { color: var(--on-surface); }

  /* FOOTER */
  .obs-footer {
    background: var(--surface-container-low);
    padding: 5rem 3rem;
  }

  .footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 3rem;
  }

  .footer-brand-name {
    font-family: 'Newsreader', serif;
    font-size: 1.1rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .footer-copy {
    font-family: 'Manrope', sans-serif;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #3a3a3a;
  }

  .footer-links { display: flex; gap: 3rem; }

  .footer-links a {
    font-family: 'Manrope', sans-serif;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #3a3a3a;
    transition: color 0.3s ease;
  }
  .footer-links a:hover { color: var(--on-surface); }

  .footer-rule {
    margin: 5rem auto 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(72,72,72,0.3), transparent);
    max-width: 1400px;
  }

  @media (max-width: 900px) {
    .obs-nav { padding: 1.5rem; }
    .obs-nav .nav-links { display: none; }
    .obs-hero { padding: 7rem 1.5rem 3rem; }
    .obs-philosophy { padding: 8rem 1.5rem; }
    .obs-features { padding: 8rem 1.5rem; }
    .features-grid { grid-template-columns: 1fr; gap: 4rem; }
    .obs-showcase { padding: 0 1.5rem 8rem; }
    .showcase-inner { height: 400px; }
    .mock-sidebar { display: none; }
    .mock-editor { padding: 2rem; }
    .mock-editor-title { font-size: 1.3rem; }
    .obs-final-cta { padding: 10rem 1.5rem; }
    .obs-footer { padding: 4rem 1.5rem; }
    .footer-inner { flex-direction: column; align-items: flex-start; }
    .cta-divider { display: none; }
  }
`;

// ─── Sub-components ───────────────────────────────────────────────

function Nav({ onBeginWriting }) {
  return (
    <nav className="obs-nav">
      <div className="nav-logo">The Obsidian Editorial</div>
      <div className="nav-links">
        <a href="#philosophy">The Philosophy</a>
        <a href="#features">The Editor</a>
        <a href="#">Privacy</a>
      </div>
      <a className="nav-cta" onClick={onBeginWriting}>Begin Writing</a>
    </nav>
  );
}

function Hero({ onBeginWriting }) {
  return (
    <section className="obs-hero">
      <div className="hero-inner">
        <h1 className="serif">The Architecture of Silence</h1>
        <p className="hero-sub">
          A high-fidelity editorial canvas designed for deep archival thought. No distractions. No noise. Just the ink of your mind against the digital obsidian.
        </p>
        <a className="hero-cta" onClick={onBeginWriting}>Begin Your Manuscript</a>
      </div>
      <div className="hero-accent" aria-hidden="true" />
    </section>
  );
}

function Philosophy() {
  return (
    <section className="obs-philosophy" id="philosophy">
      <div className="philosophy-inner">
        <span className="eyebrow">The Silent Monolith</span>
        <h2 className="serif">A rejection of the modern interface.</h2>
        <p>We believe that the tools we use shape the thoughts we produce. Modern software is built for speed, notification, and ephemeral consumption. The Obsidian Editorial is built for the opposite.</p>
        <p>By removing every standard UI convention—the borders, the cards, the persistent shadows—we return the focus to the typography. This is not a utility; it is a sanctuary for deep reflection and permanent record.</p>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      num: "01",
      title: "The Silent Editor",
      body: "A distraction-free workspace that disappears when you start writing. The interface recedes into the periphery, leaving only your words on the obsidian canvas.",
    },
    {
      num: "02",
      title: "Archival Longevity",
      body: "Your thoughts, preserved indefinitely. We use markdown-native storage and encrypted syncing to ensure that what you write today remains readable a century from now.",
    },
    {
      num: "03",
      title: "Typographic Soul",
      body: "The Newsreader serif is the center of the experience. Optimized for long-form reading and cognitive ease, every character is rendered with archival precision.",
    },
  ];

  return (
    <section className="obs-features" id="features">
      <div className="features-grid">
        {items.map((f) => (
          <div className="feature-item" key={f.num}>
            <span className="feature-num serif">{f.num}</span>
            <h3 className="serif">{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  const entries = [
    { title: "The Architecture of Silence", date: "14 Jun 2024", active: true },
    { title: "Notes on the void", date: "9 Jun 2024" },
    { title: "Morning thoughts", date: "3 Jun 2024" },
    { title: "On permanence", date: "28 May 2024" },
  ];

  return (
    <section className="obs-showcase">
      <div className="showcase-inner">
        <div className="showcase-mock">
          <div className="mock-ui">
            <div className="mock-sidebar">
              <div className="mock-sidebar-logo">The Obsidian Editorial</div>
              {entries.map((e) => (
                <div className={`mock-entry${e.active ? " active" : ""}`} key={e.title}>
                  <div className="mock-entry-title">{e.title}</div>
                  <div className="mock-entry-date">{e.date}</div>
                </div>
              ))}
            </div>
            <div className="mock-editor">
              <div className="mock-editor-date">14 June 2024 — Friday</div>
              <div className="mock-editor-title">The Architecture of Silence</div>
              <div className="mock-editor-line" />
              <div className="mock-editor-body">
                <div className="mock-line w-full-line" />
                <div className="mock-line w-90" />
                <div className="mock-line w-full-line" />
                <div className="mock-line w-75" />
                <div className="mock-line w-gap" />
                <div className="mock-line w-full-line" />
                <div className="mock-line w-full-line" />
                <div className="mock-line w-60" />
                <div className="mock-line w-gap" />
                <div className="mock-line w-full-line" />
                <div className="mock-line w-30" />
              </div>
              <div className="mock-wordcount">Word count: 347 &nbsp;·&nbsp; Last edited 2 min ago</div>
            </div>
          </div>
        </div>
        <div className="showcase-line" aria-hidden="true" />
        <div className="showcase-label">System State: Equilibrium</div>
      </div>
    </section>
  );
}

function FinalCta({ onBeginWriting }) {
  return (
    <section className="obs-final-cta">
      <div className="final-cta-inner">
        <h2 className="serif">
          Enter the Void.<br /><em>Start Writing.</em>
        </h2>
        <div className="cta-links">
          <a className="cta-primary" onClick={onBeginWriting}>Open Sanctuary</a>
          <div className="cta-divider" aria-hidden="true" />
          <a className="cta-secondary" href="#">View The Manifesto</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="obs-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand-name serif">The Obsidian Editorial</div>
          <p className="footer-copy">© 2024 The Obsidian Editorial. An Archival Sanctuary.</p>
        </div>
        <div className="footer-links">
          <a href="#">Journaling Guide</a>
          <a href="#">Privacy Manifesto</a>
          <a href="#">Terms</a>
        </div>
      </div>
      <div className="footer-rule" />
    </footer>
  );
}

// ─── Root Component ───────────────────────────────────────────────

export default function ObsidianEditorial({ onBeginWriting }) {
  useEffect(() => {
    const styleId = "obsidian-editorial-styles";
    if (!document.getElementById(styleId)) {
      const tag = document.createElement("style");
      tag.id = styleId;
      tag.textContent = styles;
      document.head.appendChild(tag);
    }
    return () => {
      const tag = document.getElementById(styleId);
      if (tag) tag.remove();
    };
  }, []);

  const handleBeginWriting = onBeginWriting || (() => console.log("Begin writing clicked"));

  return (
    <div className="obsidian-root">
      <div className="grain-overlay" aria-hidden="true" />
      <Nav onBeginWriting={handleBeginWriting} />
      <main style={{ paddingTop: "6rem" }}>
        <Hero onBeginWriting={handleBeginWriting} />
        <Philosophy />
        <Features />
        <Showcase />
        <FinalCta onBeginWriting={handleBeginWriting} />
      </main>
      <Footer />
    </div>
  );
}
