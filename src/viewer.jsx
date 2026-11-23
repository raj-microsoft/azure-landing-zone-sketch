import React, { useCallback, useEffect, useRef, useState } from "react";
import { CaptureUpdateAction, Excalidraw, exportToBlob, exportToSvg, serializeAsJSON } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { LineMotion, isLinear } from "./line-motion.js";

const BASE = import.meta.env.BASE_URL;
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
// Display-only copies with the lines hidden, so the overlay can draw them in. Never saved or exported.
const withLinesHidden = (els) => els.map((e) => (isLinear(e) ? { ...e, opacity: 0 } : e));

function save(name, blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export default function Viewer({ slug }) {
  // The landing zone keeps its original key so edits saved before the gallery existed still load.
  const KEY = slug === "azure-landing-zone" ? "alz-sketch:edits:v1" : `aac-sketch:edits:v1:${slug}`;
  const [entry, setEntry] = useState(null);
  const [original, setOriginal] = useState(null);
  const [initial, setInitial] = useState(null);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState(null);
  const [flow, setFlow] = useState(false);
  const [directed, setDirected] = useState(true); // Flow only means something when some arrow has a head
  const api = useRef(null);
  const ready = useRef(false);
  const overlay = useRef(null);
  const motion = useRef(null);
  const real = useRef(null); // the scene's own elements while the canvas shows hidden-line copies

  useEffect(() => {
    fetch(BASE + "scenes/index.json").then((r) => r.json()).then((idx) => {
      const e = idx.scenes.find((s) => s.slug === slug);
      if (!e) throw new Error("unknown");
      setEntry(e);
      document.title = `${e.title}, sketched`;
      if (e.status !== "done" && !new URLSearchParams(location.search).has("draft")) { setError(e.status === "no-diagram" ? "no-diagram" : "pending"); return null; }
      return fetch(`${BASE}scenes/${slug}.excalidraw`).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });
    }).then((scene) => {
      if (!scene) return;
      setOriginal(scene);
      let elements = scene.elements;
      try {
        const saved = JSON.parse(localStorage.getItem(KEY) || "null");
        if (saved?.elements?.length) { elements = saved.elements; setEdited(true); }
      } catch {}
      setDirected(elements.some((e) => e.type === "arrow" && !e.isDeleted && (e.startArrowhead || e.endArrowhead)));
      const animate = !reducedMotion();
      real.current = animate ? elements : null;
      setInitial({ elements: animate ? withLinesHidden(elements) : elements, files: scene.files, appState: { ...scene.appState, viewModeEnabled: true }, scrollToContent: true, animate });
    }).catch((err) => setError(err.message === "unknown" ? "unknown" : "load"));
  }, [slug]);

  const fit = useCallback(() => {
    const a = api.current;
    if (!a) return;
    const els = a.getSceneElements();
    const s = a.getAppState();
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    for (const e of els) { x1 = Math.min(x1, e.x); y1 = Math.min(y1, e.y); x2 = Math.max(x2, e.x + e.width); y2 = Math.max(y2, e.y + e.height); }
    const pad = 24;
    const z = Math.max(0.1, Math.min(1, (s.width - pad) / (x2 - x1), (s.height - pad) / (y2 - y1)));
    a.updateScene({ appState: { zoom: { value: z }, scrollX: s.width / 2 / z - (x1 + x2) / 2, scrollY: s.height / 2 / z - (y1 + y2) / 2 } });
  }, []);

  // Put the scene's own lines back on the canvas (no history entry, nothing persisted).
  const restoreLines = useCallback(() => {
    const els = real.current;
    real.current = null;
    if (els && api.current) api.current.updateScene({ elements: els, captureUpdate: CaptureUpdateAction.NEVER });
  }, []);

  const syncView = useCallback(() => {
    const s = api.current?.getAppState();
    if (s && motion.current) motion.current.setView(s.scrollX, s.scrollY, s.zoom.value);
  }, []);

  const drawIn = useCallback(() => {
    const a = api.current, m = motion.current;
    if (!a || !m) return;
    m.finishDraw();
    const els = real.current ?? a.getSceneElements();
    m.build(els);
    syncView();
    if (!real.current) {
      real.current = els;
      a.updateScene({ elements: withLinesHidden(els), captureUpdate: CaptureUpdateAction.NEVER });
    }
    m.drawIn({ onReveal: restoreLines });
  }, [restoreLines, syncView]);

  const onApi = useCallback((a) => {
    api.current = a;
    window.__alz = { api: a, exportToSvg, exportToBlob, motion: () => motion.current };
    requestAnimationFrame(() => {
      fit();
      ready.current = true;
      // If the overlay is not mounted for any reason, never leave the lines hidden.
      if (real.current) { if (motion.current) drawIn(); else restoreLines(); }
    });
  }, [fit, drawIn, restoreLines]);

  useEffect(() => {
    if (!initial || !overlay.current) return;
    const m = new LineMotion(overlay.current, { background: initial.appState?.viewBackgroundColor ?? "#fdfdfb" });
    motion.current = m;
    return () => { m.destroy(); motion.current = null; };
  }, [initial]);

  const onScrollChange = useCallback((scrollX, scrollY, zoom) => {
    motion.current?.setView(scrollX, scrollY, zoom.value);
  }, []);

  const toggleFlow = () => {
    const next = !flow;
    const m = motion.current;
    if (!m || editing) return;
    if (next) { if (!m.draw) m.build(real.current ?? api.current.getSceneElements()); syncView(); }
    m.setFlow(next);
    setFlow(next);
  };

  useEffect(() => {
    const main = document.querySelector(".canvas");
    if (!main || !initial) return;
    let t;
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(fit, 120); });
    ro.observe(main);
    const late = setTimeout(fit, 600);
    return () => { ro.disconnect(); clearTimeout(t); clearTimeout(late); };
  }, [fit, initial]);

  const onChange = useCallback((elements) => {
    if (!ready.current || !editing) return;
    try { localStorage.setItem(KEY, JSON.stringify({ elements })); setEdited(true); } catch {}
  }, [editing, KEY]);

  const settle = () => {
    motion.current?.finishDraw();
    motion.current?.setFlow(false);
    setFlow(false);
  };
  const reset = () => {
    settle();
    localStorage.removeItem(KEY);
    setEdited(false);
    setEditing(false);
    api.current?.updateScene({ elements: original.elements, appState: { viewModeEnabled: true } });
    requestAnimationFrame(fit);
  };
  const toggleEdit = () => {
    const next = !editing;
    settle();
    setEditing(next);
    api.current?.updateScene({ appState: { viewModeEnabled: !next } });
  };
  const current = () => (motion.current?.finishDraw(), {
    elements: api.current.getSceneElements(),
    appState: { ...api.current.getAppState(), exportBackground: true, exportWithDarkMode: false, viewBackgroundColor: "#fdfdfb" },
    files: api.current.getFiles(),
  });
  const download = () => {
    const c = current();
    save(`${slug}-sketch.excalidraw`, new Blob([serializeAsJSON(c.elements, c.appState, c.files, "local")], { type: "application/json" }));
  };
  const png = async () => save(`${slug}-sketch.png`, await exportToBlob({ ...current(), mimeType: "image/png", exportPadding: 24 }));
  const svg = async () => {
    const el = await exportToSvg({ ...current(), exportPadding: 24 });
    save(`${slug}-sketch.svg`, new Blob([el.outerHTML], { type: "image/svg+xml" }));
  };

  const title = entry?.title ?? "Sketch";
  return (
    <div className="shell">
      <header className="bar">
        <div className="crumb">
          <a className="back" href={BASE}>All architectures</a>
          <h1>{title}</h1>
        </div>
        <nav aria-label="Diagram actions">
          <button type="button" aria-pressed={editing} onClick={toggleEdit} disabled={!initial}>{editing ? "Done editing" : "Edit"}</button>
          <button type="button" onClick={reset} disabled={!initial || (!edited && !editing)}>Reset</button>
          <span className="sep" aria-hidden="true" />
          <button type="button" onClick={drawIn} disabled={!initial || editing} title="Draw the lines in again">Replay</button>
          <button type="button" aria-pressed={flow} onClick={toggleFlow} disabled={!initial || editing || !directed} title={directed ? "Show direction of flow along the arrows" : "This sketch has no directed arrows"}>Flow</button>
          <span className="sep" aria-hidden="true" />
          <button type="button" onClick={download} disabled={!initial}>Download .excalidraw</button>
          <button type="button" onClick={png} disabled={!initial}>PNG</button>
          <button type="button" onClick={svg} disabled={!initial}>SVG</button>
          {entry && <a href={entry.url} target="_blank" rel="noopener">Source: Microsoft Learn</a>}
        </nav>
      </header>
      {editing && <p className="note" role="status">Editing. Changes stay in this browser only.</p>}
      {error === "no-diagram" && <p className="note" role="status">No architecture diagram in this article. <a href={entry?.url} target="_blank" rel="noopener">Read the Learn article</a> or <a href={BASE}>go back to the gallery</a>.</p>}
        {error === "pending" && <p className="note" role="status">This sketch is not drawn yet. <a href={entry?.url} target="_blank" rel="noopener">Read the Learn article</a> or <a href={BASE}>go back to the gallery</a>.</p>}
      {error === "unknown" && <p className="note err" role="alert">There is no architecture called &ldquo;{slug}&rdquo;. <a href={BASE}>Go back to the gallery</a>.</p>}
      {error === "load" && <p className="note err" role="alert">The diagram could not be loaded. Reload the page to try again.</p>}
      <main className="canvas">
        {initial && (
          <Excalidraw
            initialData={initial}
            excalidrawAPI={onApi}
            viewModeEnabled={!editing}
            onChange={onChange}
            onScrollChange={onScrollChange}
            UIOptions={{ canvasActions: { loadScene: false, saveToActiveFile: false, export: false, saveAsImage: false, toggleTheme: false, changeViewBackgroundColor: false } }}
          />
        )}
        {initial && <svg ref={overlay} className="line-motion" aria-hidden="true" data-motion={initial.animate ? "draw" : "still"} data-flow="off" data-editing={editing ? "on" : "off"} />}
      </main>
    </div>
  );
}
