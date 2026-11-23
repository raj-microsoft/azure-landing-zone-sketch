// 104 Machine learning inference on IoT Edge.
export const meta = {
  num: 104,
  slug: "machine-learning-inference-iot-edge",
  title: "Enable machine learning inference on an Azure IoT Edge device",
  url: "https://learn.microsoft.com/azure/architecture/guide/iot/machine-learning-inference-iot-edge",
  category: "Internet of Things",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Machine Learning": "machine-learning", "Blob Storage": "blob-block", "Azure IoT Hub": "iot-hub", "Module twin": "code", "Client": "virtual-machine" },
  differences: ["Edge module stack (Python AI Loader, Flask, OpenCV, PIL, TensorFlow/ONNX RT, Linux container) and local storage cylinders are labelled sketch shapes.", "Step 3 HTTP download is routed below the IoT Hub column to Blob Storage instead of a diagonal line across it."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow, step } = k;
  const S = 16;
  txt("title", 40, 0, "Machine learning inference on IoT Edge", { size: 28 });
  txt("c1-lbl", 70, 60, "AI model", { size: 20 });
  group("c1", 40, 100, 220, 760, null, { fill: TINT.white, dashed: true });
  card("aml", 60, 160, 180, 160, "machine-learning", "Azure Machine\nLearning", { size: S });
  card("blob", 60, 560, 180, 140, "blob-block", "Blob Storage", { size: S });
  arrow("a1", "aml", "bottom", 150, "blob", "top", 150);
  step("s1", 170, 420, 1);
  txt("c2-lbl", 320, 60, "IoT Hub", { size: 20 });
  group("c2", 290, 100, 220, 760, null, { fill: TINT.white, dashed: true });
  card("hub", 310, 160, 180, 160, "iot-hub", "Azure\nIoT Hub", { size: S });
  card("twin", 540, 110, 120, 110, "code", "Module\ntwin", { size: S });
  txt("c3-lbl", 1100, 60, "IoT Edge", { size: 20 });
  group("c3", 700, 100, 1180, 760, null, { fill: TINT.white, dashed: true });
  group("mod", 730, 130, 1120, 480, null, { fill: TINT.white, dashed: true });
  txt("mod-lbl", 1060, 145, "Edge module (AI Loader)", { size: 18 });
  box("aim", 750, 190, 240, 160, "AI model\n*.tflite\n*.onnx", { size: S, fill: TINT.sub });
  step("s5", 940, 300, 5);
  box("py", 1020, 190, 810, 60, "Python AI Loader code", { size: S, fill: TINT.sub });
  box("mt", 1020, 270, 190, 80, "Module\ntwin", { size: S, fill: TINT.sub });
  box("fl", 1225, 270, 190, 80, "Flask", { size: S, fill: TINT.sub });
  box("cv", 1430, 270, 190, 80, "Open CV", { size: S, fill: TINT.sub });
  box("pil", 1635, 270, 195, 80, "PIL", { size: S, fill: TINT.sub });
  box("pkg", 1020, 370, 400, 80, "Azure IoT device package", { size: S, fill: TINT.sub });
  box("tf", 1435, 370, 395, 80, "TensorFlow / ONNX RT", { size: S, fill: TINT.sub });
  box("lx", 1020, 470, 810, 60, "Linux container", { size: S, fill: TINT.sub });
  box("shared", 750, 410, 200, 120, "Shared local\nstorage", { size: S, fill: TINT.mg, type: "ellipse" });
  box("local", 750, 680, 200, 120, "Local\nstorage", { size: S, fill: TINT.mg, type: "ellipse" });
  arrow("a4", "shared", "bottom", 850, "local", "top", 850);
  step("s4", 870, 615, 4);
  group("rt", 1000, 640, 850, 190, null, { fill: TINT.white, dashed: true });
  box("ea", 1020, 660, 400, 60, "Edge agent", { size: S, fill: TINT.sub });
  box("eh", 1435, 660, 395, 60, "Edge hub", { size: S, fill: TINT.sub });
  box("er", 1020, 740, 810, 70, "Edge runtime", { size: S, fill: "#d0ebff" });
  arrow("a2", "hub", "right", 240, "mod", "left", 240);
  step("s2", 560, 260, 2);
  arrow("a3", "shared", "left", 470, "blob", "bottom", 150, [620, 900, 150]);
  txt("http-lbl", 522, 760, "HTTP\ndownload", { size: 16 });
  step("s3", 400, 910, 3);
  txt("c4-lbl", 1990, 60, "Client", { size: 20 });
  group("c4", 1960, 100, 220, 760, null, { fill: TINT.white, dashed: true });
  card("cli", 1980, 220, 180, 140, "virtual-machine", "Client", { size: S });
  arrow("a6", "cli", "left", 330, "pil", "right", 330);
  txt("web-lbl", 1990, 380, "Web API", { size: 16 });
  step("s6", 1895, 230, 6);
  txt("footer", 40, 980, "Pencil-sketch redraw of the Azure Architecture Center diagram \"machine learning inference on IoT Edge\"", { size: 20, color: "#495057" });
}
