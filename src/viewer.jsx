import React, { useCallback, useEffect, useRef, useState } from "react";
import { CaptureUpdateAction, Excalidraw, exportToBlob, exportToSvg, serializeAsJSON } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { LineMotion, PRESETS, isLinear } from "./line-motion.js";
import { LOOKS, getLook, themeElements, untheme } from "./looks.js";

const LOOK = getLook(); // ?look=a|c|d. Default Pencil (chosen by Raj on 2026-11-24)

const BASE = import.meta.env.BASE_URL;
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
// Display-only copies with the lines hidden, so the overlay can draw them in. Never saved or exported.
const withLinesHidden = (els) => els.map((e) => (isLinear(e) ? { ...e, opacity: 0 } : e));
// Flow is a "show me" aid, never ambient motion: it switches itself off after one calm stretch.
const FLOW_MS = 12000;
// Excalidraw clamps wheel/pinch zoom at 0.1, but a programmatic fit may go lower so wide scenes
// (the landing zone is 4160 px) fit a phone instead of being cropped.
const FIT_MIN_ZOOM = 0.02;

// Regular look: swap each sketch icon for the official Azure icon with the same name. Ids and positions stay the same.
async function iconFiles(files) {
  if (LOOK.iconSet !== "regular") return files;
  const out = { ...files };
  await Promise.all(Object.entries(files).filter(([id, f]) => id.startsWith("icon-") && f.mimeType === "image/svg+xml").map(async ([id, f]) => {
    const r = await fetch(`${BASE}icons-regular/${id.slice(5)}.svg`);
    if (!r.ok) return; // keep the sketch icon if the official one is missing
    let bin = "";
    for (const b of new Uint8Array(await r.arrayBuffer())) bin += String.fromCharCode(b);
    out[id] = { ...f, dataURL: `data:image/svg+xml;base64,${btoa(bin)}` };
  }));
  return out;
}

function save(name, blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

const BackIcon = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false">
    <path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Caret = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">
    <path d="M3 4.5 6 7.5l3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// One "Download" button with a small menu. Closes on Escape, outside click or after a choice.
function DownloadMenu({ items, disabled }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") { setOpen(false); wrap.current?.querySelector("button")?.focus(); } };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    wrap.current?.querySelector("[role=menuitem]")?.focus();
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);
  const onKey = (e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const list = [...wrap.current.querySelectorAll("[role=menuitem]")];
    const i = list.indexOf(document.activeElement);
    list[(i + (e.key === "ArrowDown" ? 1 : list.length - 1)) % list.length]?.focus();
  };
  return (
    <div className="menu-wrap" ref={wrap}>
      <button type="button" className="act" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} disabled={disabled}>
        Download <Caret />
      </button>
      {open && (
        <div className="menu" role="menu" aria-label="Download as" onKeyDown={onKey}>
          {items.map(([label, hint, run]) => (
            <button key={label} type="button" role="menuitem" data-format={label} onClick={() => { setOpen(false); run(); }}>
              <span>{label}</span><span className="hint">{hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const CloseIcon = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M5 5l10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

// The explainer video in a calm modal: muted, inline, never autoplays with sound.
// Native <dialog> makes the page behind it inert; Tab still cycles inside, Escape closes.
function VideoPanel({ video, title, onClose }) {
  const dlg = useRef(null);
  const opener = useRef(document.activeElement);
  useEffect(() => {
    const d = dlg.current;
    d.showModal();
    d.querySelector(".video-close")?.focus();
    const back = opener.current;
    return () => { d.querySelector("video")?.pause(); back?.focus?.(); };
  }, []);
  const onKey = (e) => {
    if (e.key !== "Tab") return;
    const f = [...dlg.current.querySelectorAll("button, video[controls]")];
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  };
  const secs = Math.round(video.duration);
  return (
    <dialog ref={dlg} className="video-panel" aria-labelledby="video-title" onCancel={(e) => { e.preventDefault(); onClose(); }} onKeyDown={onKey}
      onClick={(e) => { if (e.target === dlg.current) onClose(); }}>
      <div className="video-head">
        <h2 id="video-title">{title}</h2>
        <p className="video-meta">{secs} s, {video.steps} steps, no sound</p>
        <button type="button" className="act video-close" onClick={onClose} aria-label="Close video" title="Close (Esc)"><CloseIcon /></button>
      </div>
      <video src={BASE + video.url} controls muted playsInline preload="metadata" poster={`${BASE}thumbs/${video.url.split("/").pop().replace(".mp4", ".png")}`} />
    </dialog>
  );
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
  const [video, setVideo] = useState(null);
  const [watching, setWatching] = useState(false);
  const api = useRef(null);
  const ready = useRef(false);
  const overlay = useRef(null);
  const motion = useRef(null);
  const flowTimer = useRef(0);
  const real = useRef(null); // the scene's own elements while the canvas shows hidden-line copies
  const tmap = useRef(new Map()); // look colours -> scene colours, so exports and saved edits stay untouched
  const show = (els) => themeElements(els, LOOK, tmap.current).elements;
  useEffect(() => { document.body.dataset.look = LOOK.id; }, []);
  useEffect(() => {
    fetch(BASE + "scenes/videos.json").then((r) => (r.ok ? r.json() : {})).then((v) => setVideo(v[slug] ?? null)).catch(() => {});
  }, [slug]);

  useEffect(() => {
    fetch(BASE + "scenes/index.json").then((r) => r.json()).then((idx) => {
      const e = idx.scenes.find((s) => s.slug === slug);
      if (!e) throw new Error("unknown");
      setEntry(e);
      document.title = `${e.title}, sketched`;
      if (e.status !== "done" && !new URLSearchParams(location.search).has("draft")) { setError(e.status === "no-diagram" ? "no-diagram" : "pending"); return null; }
      return fetch(`${BASE}scenes/${slug}.excalidraw`).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });
    }).then(async (scene) => {
      if (!scene) return;
      setOriginal(scene);
      let elements = scene.elements;
      try {
        const saved = JSON.parse(localStorage.getItem(KEY) || "null");
        if (saved?.elements?.length) { elements = saved.elements; setEdited(true); }
      } catch {}
      setDirected(elements.some((e) => e.type === "arrow" && !e.isDeleted && (e.startArrowhead || e.endArrowhead)));
      const animate = !reducedMotion();
      const shown = show(elements);
      real.current = animate ? shown : null;
      setInitial({ elements: animate ? withLinesHidden(shown) : shown, files: await iconFiles(scene.files), appState: { ...scene.appState, viewBackgroundColor: LOOK.paper, viewModeEnabled: true }, scrollToContent: true, animate });
    }).catch((err) => setError(err.message === "unknown" ? "unknown" : "load"));
  }, [slug]);

  // Contained fit inside the canvas area below the toolbar. Padding keeps the scene clear of
  // Excalidraw's own corner controls (zoom/help bottom-left on desktop, menu bottom-left on phone),
  // so the bottom caption never sits under them. Phones align to the top: no dead band above.
  const fit = useCallback(() => {
    const a = api.current;
    if (!a) return;
    const els = a.getSceneElements().filter((e) => !e.isDeleted);
    if (!els.length) return;
    const s = a.getAppState();
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    for (const e of els) { x1 = Math.min(x1, e.x); y1 = Math.min(y1, e.y); x2 = Math.max(x2, e.x + e.width); y2 = Math.max(y2, e.y + e.height); }
    const phone = s.width < 640;
    const pad = phone ? { t: 16, r: 10, b: 76, l: 10 } : { t: 28, r: 32, b: 76, l: 32 };
    const availW = s.width - pad.l - pad.r, availH = s.height - pad.t - pad.b;
    const z = Math.max(FIT_MIN_ZOOM, Math.min(1, availW / (x2 - x1), availH / (y2 - y1)));
    const left = pad.l + (availW - (x2 - x1) * z) / 2;
    const top = phone ? pad.t : pad.t + (availH - (y2 - y1) * z) / 2;
    a.updateScene({ appState: { zoom: { value: z }, scrollX: left / z - x1, scrollY: top / z - y1 } });
    const n = a.getAppState();
    motion.current?.setView(n.scrollX, n.scrollY, n.zoom.value);
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
    const m = new LineMotion(overlay.current, { background: LOOK.paper, accent: LOOK.accent, preset: PRESETS[LOOK.id], reduced: reducedMotion() });
    if (reducedMotion()) overlay.current.dataset.reduced = "on";
    motion.current = m;
    return () => { m.destroy(); motion.current = null; };
  }, [initial]);

  const onScrollChange = useCallback((scrollX, scrollY, zoom) => {
    motion.current?.setView(scrollX, scrollY, zoom.value);
  }, []);

  const stopFlow = useCallback(() => {
    clearTimeout(flowTimer.current);
    motion.current?.setFlow(false);
    setFlow(false);
  }, []);
  useEffect(() => () => clearTimeout(flowTimer.current), []);

  const toggleFlow = () => {
    const m = motion.current;
    if (!m || editing) return;
    if (flow) return stopFlow();
    if (!m.draw) m.build(real.current ?? api.current.getSceneElements());
    syncView();
    m.setFlow(true);
    setFlow(true);
    clearTimeout(flowTimer.current);
    flowTimer.current = setTimeout(stopFlow, FLOW_MS);
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
    try { localStorage.setItem(KEY, JSON.stringify({ elements: untheme(elements, tmap.current) })); setEdited(true); } catch {}
  }, [editing, KEY]);

  const settle = () => {
    motion.current?.finishDraw();
    stopFlow();
  };
  const reset = () => {
    settle();
    localStorage.removeItem(KEY);
    setEdited(false);
    setEditing(false);
    api.current?.updateScene({ elements: show(original.elements), appState: { viewModeEnabled: true } });
    requestAnimationFrame(fit);
  };
  const toggleEdit = () => {
    const next = !editing;
    settle();
    setEditing(next);
    api.current?.updateScene({ appState: { viewModeEnabled: !next } });
  };
  const current = () => (motion.current?.finishDraw(), {
    elements: untheme(api.current.getSceneElements(), tmap.current),
    appState: { ...api.current.getAppState(), exportBackground: true, exportWithDarkMode: false, viewBackgroundColor: "#fdfdfb" },
    files: { ...api.current.getFiles(), ...(original?.files ?? {}) }, // exports keep the scene's own icons
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

  // Action groups, left to right: View (watch the sketch), Edit, Download, Source.
  // To add another way of viewing (for example a "Video" button), append it to viewActions.
  const viewActions = [
    { id: "replay", label: "Replay", onClick: drawIn, disabled: !initial || editing, title: "Draw the lines in again" },
    { id: "flow", label: "Flow", onClick: toggleFlow, pressed: flow, disabled: !initial || editing || !directed, title: directed ? "Show the direction of flow along the arrows" : "This sketch has no directed arrows" },
    { id: "fit", label: "Fit", onClick: fit, disabled: !initial, title: "Fit the whole sketch on screen" },
    ...(video ? [{ id: "video", label: "Video", onClick: () => { settle(); setWatching(true); }, disabled: editing, title: `Watch a ${Math.round(video.duration)} s explainer video` }] : []),
  ];

  const title = entry?.title ?? "Sketch";
  return (
    <div className="shell">
      <header className="bar">
        <div className="crumb">
          <a className="back" href={BASE} aria-label="All architectures" title="All architectures"><BackIcon /><span className="back-text">All architectures</span></a>
          <h1>{title}</h1>
        </div>
        <nav className="looks" aria-label="Look">
          {["a", "c", "d"].map((id) => (
            <a key={id} href={`${BASE}?a=${encodeURIComponent(slug)}&look=${id}`} aria-current={LOOK.id === id ? "true" : undefined}>{LOOKS[id].name}</a>
          ))}
        </nav>
        <nav className="actions" aria-label="Diagram actions">
          <div className="group" role="group" aria-label="View">
            {viewActions.map((a) => (
              <button key={a.id} type="button" className="act" data-action={a.id} aria-pressed={a.pressed} onClick={a.onClick} disabled={a.disabled} title={a.title}>{a.label}</button>
            ))}
          </div>
          <div className="group" role="group" aria-label="Edit">
            <button type="button" className={`act${editing ? " primary" : ""}`} data-action="edit" aria-pressed={editing} onClick={toggleEdit} disabled={!initial}>{editing ? "Done" : "Edit"}</button>
            {(edited || editing) && <button type="button" className="act quiet" data-action="reset" onClick={reset} disabled={!initial} title="Throw away your edits and show the original sketch">Reset</button>}
          </div>
          <DownloadMenu disabled={!initial} items={[["PNG", "image", png], ["SVG", "vector", svg], [".excalidraw", "editable", download]]} />
          {entry && <a className="source" href={entry.url} target="_blank" rel="noopener">Source<span className="source-long">&nbsp;on Learn</span><span className="vh"> (opens in a new tab)</span></a>}
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
        {initial && <svg ref={overlay} className="line-motion" data-look={LOOK.id} aria-hidden="true" data-motion={initial.animate ? "draw" : "still"} data-flow="off" data-editing={editing ? "on" : "off"} />}
      </main>
      {watching && video && <VideoPanel video={video} title={title} onClose={() => setWatching(false)} />}
    </div>
  );
}
