import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";

const BASE = import.meta.env.BASE_URL;
const Viewer = lazy(() => import("./viewer.jsx"));

function useIndex() {
  const [idx, setIdx] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(BASE + "scenes/index.json")
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(setIdx)
      .catch(() => setError("The list of architectures could not be loaded. Reload the page to try again."));
  }, []);
  return { idx, error };
}

const viewerHref = (slug) => `${BASE}?a=${encodeURIComponent(slug)}`;

function Card({ s }) {
  const done = s.status === "done";
  return (
    <li className={`card${s.featured ? " featured" : ""}${done ? "" : " pending"}`}>
      {done ? (
        <a className="thumb" href={viewerHref(s.slug)} aria-label={`Open the sketch of ${s.title}`}>
          <img src={`${BASE}thumbs/${s.slug}.png`} alt="" loading="lazy" decoding="async" />
        </a>
      ) : (
        <div className="thumb empty" aria-hidden="true"><span>Sketch coming</span></div>
      )}
      <div className="meta">
        <p className="cat">{s.category}{s.featured ? " · featured" : ""}</p>
        <h2>{done ? <a href={viewerHref(s.slug)}>{s.title}</a> : s.title}</h2>
        <p className="links">
          {done ? <a href={viewerHref(s.slug)}>Open sketch</a> : <span className="soon">Sketch coming</span>}
          <a href={s.url} target="_blank" rel="noopener">Learn article</a>
        </p>
      </div>
    </li>
  );
}

function Gallery() {
  const { idx, error } = useIndex();
  const [q, setQ] = useState(() => new URLSearchParams(location.search).get("q") ?? "");
  const [cat, setCat] = useState("All");
  const [onlyDone, setOnlyDone] = useState(false);
  useEffect(() => { document.title = "Azure reference architectures, sketched"; }, []);

  const cats = useMemo(() => {
    if (!idx) return [];
    const m = new Map();
    for (const s of idx.scenes.filter((s) => s.status !== "duplicate")) m.set(s.category, (m.get(s.category) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [idx]);
  const list = useMemo(() => {
    if (!idx) return [];
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return idx.scenes.filter((s) => s.status !== "duplicate" &&
      (cat === "All" || s.category === cat) && (!onlyDone || s.status === "done") &&
      words.every((w) => `${s.title} ${s.category} ${s.slug}`.toLowerCase().includes(w)));
  }, [idx, q, cat, onlyDone]);

  return (
    <div className="gallery">
      <header className="ghead">
        <h1>Azure reference architectures, sketched</h1>
        <p className="lede">
          Microsoft&rsquo;s Azure Architecture Center diagrams, redrawn like for like in Excalidraw with pencil-sketch Azure icons.
          {idx && <> {idx.done} of {idx.count} drawn so far.</>}
        </p>
      </header>
      <div className="tools" role="search">
        <label className="search">
          <span className="vh">Search architectures</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, for example AKS or mainframe" />
        </label>
        <label className="toggle">
          <input type="checkbox" checked={onlyDone} onChange={(e) => setOnlyDone(e.target.checked)} /> Drawn only
        </label>
      </div>
      <nav className="cats" aria-label="Categories">
        {[["All", idx?.count ?? 0], ...cats].map(([c, n]) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c} <span className="n">{n}</span>
          </button>
        ))}
      </nav>
      {error && <p className="note err" role="alert">{error}</p>}
      {!idx && !error && <p className="status" role="status">Loading the list…</p>}
      {idx && (
        <>
          <p className="status" role="status">{list.length === idx.count ? `${list.length} architectures` : `${list.length} of ${idx.count} architectures`}</p>
          {list.length ? (
            <ul className="grid">{list.map((s) => <Card key={s.slug} s={s} />)}</ul>
          ) : (
            <p className="empty-state">Nothing matches &ldquo;{q}&rdquo;{cat !== "All" ? ` in ${cat}` : ""}. <button type="button" className="linkish" onClick={() => { setQ(""); setCat("All"); setOnlyDone(false); }}>Clear filters</button></p>
          )}
        </>
      )}
      <footer className="gfoot">
        Diagrams are redraws of the official Microsoft Learn originals; each card links to its source article.
      </footer>
    </div>
  );
}

function App() {
  const slug = new URLSearchParams(location.search).get("a");
  useEffect(() => { document.body.classList.add("live"); }, []);
  if (!slug) return <Gallery />;
  return (
    <Suspense fallback={<p className="status pad" role="status">Opening the sketch…</p>}>
      <Viewer slug={slug} />
    </Suspense>
  );
}

createRoot(document.getElementById("root")).render(<App />);
