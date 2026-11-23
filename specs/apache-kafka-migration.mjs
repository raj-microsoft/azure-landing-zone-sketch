// 127 Apache Kafka migration to Azure (decision chart).
export const meta = {
  num: 127,
  slug: "apache-kafka-migration",
  title: "Apache Kafka migration to Azure",
  url: "https://learn.microsoft.com/azure/architecture/guide/hadoop/apache-kafka-migration",
  category: "Analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: {},
  differences: ["The article's only diagram is a decision chart; redrawn as a sketch flowchart with no icons (as in the official image)."],
};

export function draw(k) {
  const { TINT, txt, box, arrow } = k;
  const S = 16;
  const D = { type: "diamond", fill: TINT.sub, size: S };
  const T = { fill: TINT.sub, size: S };
  box("start", 680, 20, 240, 70, "Kafka migration start", T);
  box("d1", 660, 150, 280, 130, "Planned\nlift & shift to IaaS", D);
  box("d2", 320, 150, 280, 130, "On-premise\nKafka running\nin Kubernetes", D);
  box("d3", 320, 360, 280, 130, "Plan to\ncontainerize", D);
  box("d4", 640, 360, 320, 150, "Dependency on 3rd\nparty components or\nfull control over\ninfra nodes", D);
  box("d5", 660, 600, 280, 130, "Full Kafka\ncompatibility\nrequired", D);
  box("o1", 20, 820, 240, 80, "Kafka on Azure\nKubernetes Service", T);
  box("o2", 340, 820, 240, 80, "Kafka on IaaS / Kafka\non Confluent Cloud", T);
  box("o3", 680, 820, 240, 80, "Azure Event Hubs\nfor Kafka", T);
  box("o4", 1000, 820, 240, 80, "Kafka on Azure\nHDInsight", T);
  arrow("a0", "start", "bottom", null, "d1", "top", null, []);
  arrow("a1", "d1", "left", null, "d2", "right", null, []);
  txt("a1-l", 615, 190, "Yes", { size: S });
  arrow("a2", "d2", "left", null, "o1", "top", 120, []);
  txt("a2-l", 160, 190, "Yes", { size: S });
  arrow("a3", "d2", "bottom", null, "d3", "top", null, []);
  txt("a3-l", 470, 310, "No", { size: S });
  arrow("a4", "d3", "left", null, "o1", "top", 160, []);
  txt("a4-l", 200, 400, "Yes", { size: S });
  arrow("a5", "d3", "bottom", null, "o2", "top", null, []);
  txt("a5-l", 470, 640, "No", { size: S });
  arrow("a6", "d1", "bottom", null, "d4", "top", null, []);
  txt("a6-l", 810, 310, "No", { size: S });
  arrow("a7", "d4", "right", null, "o4", "top", 1140, []);
  txt("a7-l", 1000, 400, "Yes", { size: S });
  arrow("a8", "d4", "bottom", null, "d5", "top", null, []);
  txt("a8-l", 810, 545, "No", { size: S });
  arrow("a9", "d5", "right", null, "o4", "top", 1100, []);
  txt("a9-l", 1000, 640, "Yes", { size: S });
  arrow("a10", "d5", "bottom", null, "o3", "top", null, []);
  txt("a10-l", 810, 760, "No", { size: S });
  txt("footer", 20, 940, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Decision chart for migrating Kafka to Azure\"", { size: 20, color: "#495057" });
}
