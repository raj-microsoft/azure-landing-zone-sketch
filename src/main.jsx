import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";

const BASE = import.meta.env.BASE_URL;

// Viewer-only shims for two Excalidraw 0.18 behaviours that log console errors on GitHub Pages:
// - its font-subsetting worker chunk touches `document` and fails, then falls back to the main thread
//   anyway (SVG export). Use the main thread from the start.
// - Edit mode registers a deprecated `unload` listener, which Chromium reports as a policy violation.
//   `pagehide` fires in the same situations.
if (new URLSearchParams(location.search).has("a")) {
  try { window.Worker = undefined; } catch {}
  const add = window.addEventListener.bind(window), remove = window.removeEventListener.bind(window);
  window.addEventListener = (type, ...rest) => add(type === "unload" ? "pagehide" : type, ...rest);
  window.removeEventListener = (type, ...rest) => remove(type === "unload" ? "pagehide" : type, ...rest);
}
const Viewer = lazy(() => import("./viewer.jsx"));

// Display-only category groups. Scene files and index.json keep their own category text; the gallery
// folds near-duplicates ("AI + Machine Learning" vs "AI + machine learning", "Web" vs "Web + apps",
// one-item buckets) into a short list so the filter stays scannable.
const CATEGORY_GROUPS = {
  "landing zone": "Landing zone",
  networking: "Networking",
  hybrid: "Hybrid + multicloud",
  "hybrid + multicloud": "Hybrid + multicloud",
  containers: "Containers + microservices",
  "containers + microservices": "Containers + microservices",
  microservices: "Containers + microservices",
  "ai + machine learning": "AI + machine learning",
  "internet of things": "AI + machine learning",
  analytics: "Data + analytics",
  databases: "Data + analytics",
  "databases + analytics": "Data + analytics",
  web: "Web + apps",
  "web + apps": "Web + apps",
  multitenancy: "Web + apps",
  integration: "Integration + DevOps",
  "integration + devops": "Integration + DevOps",
  devops: "Integration + DevOps",
  mainframe: "Mainframe + migration",
  "mainframe + migration": "Mainframe + migration",
  sap: "SAP + industry",
  manufacturing: "SAP + industry",
  compute: "Compute + storage",
  storage: "Compute + storage",
  "infrastructure + storage": "Compute + storage",
  "virtual desktop": "Compute + storage",
  identity: "Identity + security",
  security: "Identity + security",
  "design patterns": "Patterns + guidance",
  "design guidance": "Patterns + guidance",
  "design principles": "Patterns + guidance",
  "best practices": "Patterns + guidance",
};
const groupOf = (c = "") => CATEGORY_GROUPS[c.trim().toLowerCase()] ?? c.trim();
const CHIPS_SHOWN = 8; // desktop shows the largest groups; the rest sit behind "More"
const SUGGESTIONS = ["AKS", "Front Door", "SAP"];

// Real material for the featured card, taken from the sketch's own labels.
const FEATURE_NOTES = {
  "azure-landing-zone": {
    lede: "The Cloud Adoption Framework reference landing zone on one sheet: the management group hierarchy, the platform subscriptions and the workload landing zones that peer to the hub network.",
    listLabel: "Subscriptions in the sketch",
    list: ["Identity", "Management", "Connectivity", "Security", "Workload landing zones P1 and A2", "Sandbox"],
  },
};

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

function LearnLink({ url }) {
  return (
    <a className="learn" href={url} target="_blank" rel="noopener">
      Source on Learn<span className="vh"> (opens in a new tab)</span>
    </a>
  );
}

function Card({ s, featured }) {
  const done = s.status === "done";
  const none = s.status === "no-diagram";
  const placeholder = none ? "No architecture diagram in this article" : "Sketch coming";
  const notes = featured ? FEATURE_NOTES[s.slug] : null;
  return (
    <li className={`card${featured ? " featured" : ""}${done ? "" : " pending"}`}>
      <div className="thumb" aria-hidden="true">
        {done
          ? <img src={`${BASE}thumbs/${s.slug}.png`} alt="" width="560" height="350" loading={featured ? "eager" : "lazy"} fetchpriority={featured ? "high" : "auto"} decoding="async" />
          : <span>{placeholder}</span>}
      </div>
      <div className="meta">
        <p className="cat">{groupOf(s.category)}</p>
        <h2>{done ? <a className="stretch" href={viewerHref(s.slug)}>{s.title}</a> : s.title}</h2>
        {notes && (
          <>
            <p className="blurb">{notes.lede}</p>
            <p className="facts"><span className="facts-label">{notes.listLabel}:</span> {notes.list.join(", ")}.</p>
          </>
        )}
        <p className="links">
          {featured && done && <a className="btn primary" href={viewerHref(s.slug)}>Open sketch</a>}
          <LearnLink url={s.url} />
        </p>
      </div>
    </li>
  );
}

function Skeleton() {
  return (
    <ul className="grid" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <li key={i} className={`card skeleton${i === 0 ? " featured" : ""}`}>
          <div className="thumb" />
          <div className="meta"><span className="bar-s w30" /><span className="bar-s w80" /><span className="bar-s w50" /></div>
        </li>
      ))}
    </ul>
  );
}

function Gallery() {
  const { idx, error } = useIndex();
  const [q, setQ] = useState(() => new URLSearchParams(location.search).get("q") ?? "");
  const [cat, setCat] = useState("All");
  const [onlyDone, setOnlyDone] = useState(false);
  const [more, setMore] = useState(false);
  useEffect(() => { document.title = "Azure reference architectures, sketched"; }, []);

  const scenes = useMemo(() => (idx ? idx.scenes.filter((s) => s.status !== "duplicate") : []), [idx]);
  // Order groups by size once, so chips never jump around while typing.
  const groups = useMemo(() => {
    const m = new Map();
    for (const s of scenes) { const g = groupOf(s.category); m.set(g, (m.get(g) ?? 0) + 1); }
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([g]) => g);
  }, [scenes]);
  // Everything except the category filter, so the counts follow the search and "Drawn only".
  const base = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return scenes.filter((s) => (!onlyDone || s.status === "done") &&
      words.every((w) => `${s.title} ${s.category} ${groupOf(s.category)} ${s.slug}`.toLowerCase().includes(w)));
  }, [scenes, q, onlyDone]);
  const counts = useMemo(() => {
    const m = new Map();
    for (const s of base) { const g = groupOf(s.category); m.set(g, (m.get(g) ?? 0) + 1); }
    return m;
  }, [base]);
  const list = useMemo(() => base.filter((s) => cat === "All" || groupOf(s.category) === cat), [base, cat]);
  const filtering = q.trim() || onlyDone;
  const visibleGroups = groups.filter((g) => !filtering || counts.get(g) || g === cat);
  const hiddenCount = Math.max(0, visibleGroups.length - CHIPS_SHOWN);
  const showAll = more || visibleGroups.indexOf(cat) >= CHIPS_SHOWN;
  const chips = showAll ? visibleGroups : visibleGroups.slice(0, CHIPS_SHOWN);
  const clear = () => { setQ(""); setCat("All"); setOnlyDone(false); };
  const total = scenes.length;
  const featuredSlug = !filtering && cat === "All" ? scenes.find((s) => s.featured)?.slug : null;

  return (
    <div className="gallery">
      <header className="ghead">
        <h1>Azure reference architectures, sketched</h1>
        <p className="lede">
          Microsoft&rsquo;s Azure Architecture Center diagrams, redrawn like for like in Excalidraw with pencil-sketch Azure icons.
          {idx && <> {idx.done} of {total} drawn so far.</>}
        </p>
      </header>
      <div className="tools" role="search">
        <label className="search">
          <span className="vh">Search architectures</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, for example AKS or mainframe" />
        </label>
        <label className="catselect">
          <span>Category</span>
          <select value={cat} onChange={(e) => setCat(e.target.value)} disabled={!idx}>
            <option value="All">{idx ? `All (${base.length})` : "All"}</option>
            {visibleGroups.map((g) => <option key={g} value={g}>{g} ({counts.get(g) ?? 0})</option>)}
          </select>
        </label>
        <label className="toggle">
          <input type="checkbox" checked={onlyDone} onChange={(e) => setOnlyDone(e.target.checked)} /> Drawn only
        </label>
      </div>
      {idx && (
        <nav className="cats" aria-label="Categories">
          <button type="button" aria-pressed={cat === "All"} onClick={() => setCat("All")}>All <span className="n">{base.length}</span></button>
          {chips.map((g) => (
            <button key={g} type="button" aria-pressed={cat === g} onClick={() => setCat(g)}>
              {g} <span className="n">{counts.get(g) ?? 0}</span>
            </button>
          ))}
          {hiddenCount > 0 && visibleGroups.indexOf(cat) < CHIPS_SHOWN && (
            <button type="button" className="more" aria-expanded={more} onClick={() => setMore((m) => !m)}>
              {more ? "Fewer" : `More (${hiddenCount})`}
            </button>
          )}
        </nav>
      )}
      {error && <p className="note err" role="alert">{error}</p>}
      {!idx && !error && <><p className="vh" role="status">Loading the list…</p><Skeleton /></>}
      {idx && (
        <>
          <p className="status" role="status">{list.length === total ? `${total} architectures` : `${list.length} of ${total} architectures`}</p>
          {list.length ? (
            <ul className="grid">{list.map((s) => <Card key={s.slug} s={s} featured={s.slug === featuredSlug} />)}</ul>
          ) : (
            <div className="empty-state">
              <p className="empty-title">Nothing matches {q.trim() ? <>&ldquo;{q.trim()}&rdquo;</> : "these filters"}{cat !== "All" ? ` in ${cat}` : ""}.</p>
              <p>Try a service name such as AKS, Front Door or SAP.</p>
              <div className="suggest">
                {SUGGESTIONS.map((t) => (
                  <button key={t} type="button" onClick={() => { setQ(t); setCat("All"); }}>{t}</button>
                ))}
                <button type="button" className="linkish" onClick={clear}>Clear filters</button>
              </div>
            </div>
          )}
        </>
      )}
      <footer className="gfoot">
        Diagrams are redraws of the official Microsoft Learn originals; each card links to its source article.
      </footer>
    </div>
  );
}

// Hide the no-JS fallback as soon as the app runs, so it never shows through the loading skeleton.
document.body.classList.add("live");

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
