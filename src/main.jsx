import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Excalidraw, exportToBlob, exportToSvg, serializeAsJSON } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import "./app.css";

const KEY = "alz-sketch:edits:v1";
const SOURCE = "https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/";
const BASE = import.meta.env.BASE_URL;

function save(name, blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function App() {
  const [original, setOriginal] = useState(null);
  const [initial, setInitial] = useState(null);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState(null);
  const api = useRef(null);
  const ready = useRef(false);

  useEffect(() => {
    fetch(BASE + "scene.excalidraw")
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((scene) => {
        setOriginal(scene);
        let elements = scene.elements;
        try {
          const saved = JSON.parse(localStorage.getItem(KEY) || "null");
          if (saved?.elements?.length) { elements = saved.elements; setEdited(true); }
        } catch {}
        setInitial({ elements, files: scene.files, appState: { ...scene.appState, viewModeEnabled: true }, scrollToContent: true });
      })
      .catch(() => setError("The diagram could not be loaded. The static picture below is still accurate."));
  }, []);

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

  const onApi = useCallback((a) => {
    api.current = a;
    window.__alz = { api: a, exportToSvg };
    requestAnimationFrame(() => { fit(); document.body.classList.add("live"); ready.current = true; });
  }, [fit]);

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
  }, [editing]);

  const reset = () => {
    localStorage.removeItem(KEY);
    setEdited(false);
    setEditing(false);
    api.current?.updateScene({ elements: original.elements, appState: { viewModeEnabled: true } });
    requestAnimationFrame(fit);
  };
  const toggleEdit = () => {
    const next = !editing;
    setEditing(next);
    api.current?.updateScene({ appState: { viewModeEnabled: !next } });
  };
  const current = () => ({
    elements: api.current.getSceneElements(),
    appState: { ...api.current.getAppState(), exportBackground: true, exportWithDarkMode: false, viewBackgroundColor: "#fdfdfb" },
    files: api.current.getFiles(),
  });
  const download = () => {
    const c = current();
    save("azure-landing-zone-sketch.excalidraw", new Blob([serializeAsJSON(c.elements, c.appState, c.files, "local")], { type: "application/json" }));
  };
  const png = async () => save("azure-landing-zone-sketch.png", await exportToBlob({ ...current(), mimeType: "image/png", exportPadding: 24 }));
  const svg = async () => {
    const el = await exportToSvg({ ...current(), exportPadding: 24 });
    save("azure-landing-zone-sketch.svg", new Blob([el.outerHTML], { type: "image/svg+xml" }));
  };

  return (
    <div className="shell">
      <header className="bar">
        <h1>Azure landing zone, sketched</h1>
        <nav aria-label="Diagram actions">
          <button type="button" aria-pressed={editing} onClick={toggleEdit} disabled={!initial}>{editing ? "Done editing" : "Edit"}</button>
          <button type="button" onClick={reset} disabled={!initial || (!edited && !editing)}>Reset</button>
          <span className="sep" aria-hidden="true" />
          <button type="button" onClick={download} disabled={!initial}>Download .excalidraw</button>
          <button type="button" onClick={png} disabled={!initial}>PNG</button>
          <button type="button" onClick={svg} disabled={!initial}>SVG</button>
          <a href={SOURCE} target="_blank" rel="noopener">Source: Microsoft CAF</a>
        </nav>
      </header>
      {editing && <p className="note" role="status">Editing. Changes stay in this browser only.</p>}
      {error && <p className="note err" role="alert">{error}</p>}
      <main className="canvas">
        {initial && (
          <Excalidraw
            initialData={initial}
            excalidrawAPI={onApi}
            viewModeEnabled={!editing}
            onChange={onChange}
            UIOptions={{ canvasActions: { loadScene: false, saveToActiveFile: false, export: false, saveAsImage: false, toggleTheme: false, changeViewBackgroundColor: false } }}
          />
        )}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
