// 071 GitOps for Azure Kubernetes Service.
export const meta = {
  num: 71,
  slug: "gitops-blueprint-aks",
  title: "GitOps for Azure Kubernetes Service",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/gitops-aks/gitops-blueprint-aks",
  category: "Containers",
  status: "done",
  otherDiagrams: ["CI/CD with GitOps, Flux, GitHub and AKS", "GitOps with Argo CD, GitHub and AKS", "CI/CD with GitOps, Argo CD, GitHub and AKS"],
  substitutions: { "Developer": "users", "Azure Kubernetes Service": "kubernetes-services", "Pods": "container-instances" },
  differences: ["GitHub, the app repository and the Flux operator are plain sketch shapes (non-Azure, no logos)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  txt("title", 40, 10, "GitOps for Azure Kubernetes Service", { size: 30 });

  box("gh", 640, 100, 260, 110, "GitHub", { fill: TINT.mg, size: 20 });
  box("repo", 640, 300, 260, 140, "App repository", { fill: TINT.mg, size: 20 });
  card("dev", 60, 280, 220, 180, "users", "Developer");
  arrow("commit", "dev", "right", 370, "repo", "left", 370);
  txt("commit-lbl", 380, 300, "Commit", { size: 18 });
  step("s1", 420, 390, 1);

  group("aks", 380, 720, 900, 420, null, { fill: TINT.white, dashed: true, stroke: "#868e96", iconName: "kubernetes-services" });
  txt("aks-lbl", 600, 1160, "Azure Kubernetes Service", { size: 20 });
  box("flux", 430, 840, 260, 180, "Flux operator", { fill: TINT.mg, size: 20 });
  group("pods", 960, 760, 260, 340, null, { fill: TINT.sub });
  card("pod1", 990, 790, 200, 130, "container-instances", "Pod", { size: 16 });
  card("pod2", 990, 945, 200, 130, "container-instances", "Pod", { size: 16 });
  arrow("sync", "aks", "top", 770, "repo", "bottom", 770);
  txt("sync-lbl", 680, 520, "Sync", { size: 18 });
  step("s2", 690, 580, 2);
  arrow("deploy", "flux", "right", 930, "pods", "left", 930);
  txt("dep-lbl", 740, 840, "Deploy", { size: 18 });
  step("s3", 790, 950, 3);
  txt("cd-lbl", 720, 1010, "Continuous\ndeployment", { size: 16 });

  txt("footer", 40, 1240, "Pencil-sketch redraw of the Azure Architecture Center diagram \"GitOps for Azure Kubernetes Service\"", { size: 20, color: "#495057" });
}
