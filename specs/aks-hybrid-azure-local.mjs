// 013 AKS hybrid on Azure Local with GitOps. Redraw of the article's diagram.
export const meta = {
  num: 13,
  slug: "aks-hybrid-azure-local",
  title: "AKS on Azure Local and AKS Edge Essentials with GitOps",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/hybrid/aks-hybrid-azure-local",
  category: "Containers + microservices",
  status: "done",
  otherDiagrams: [],
  substitutions: {
    "AKS Hybrid and Edge": "kubernetes-services", "GitOps configurations": "gear", "Container with a desired state": "worker-container-app",
    "Git repo": "tfs-vc-repository", "Git merge": "commit", "Application changes / versions": "code", "Azure Pipelines": "azure-devops",
  },
  differences: [
    "Flux and Helm controllers are labelled sketch boxes (no Azure icon or third-party logo).",
    "The large brace grouping the Git steps under Azure Pipelines is drawn as a dashed group.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, box, card, step, arrow, both } = k;
  txt("title", 40, 10, "AKS on Azure Local with GitOps", { size: 30 });

  card("op", 60, 170, 220, 200, "azure-local", "Operator\nAzure Local or\nAKS on bare metal", { size: 18 });
  step("s1", 40, 120, 1);
  card("aks", 380, 190, 240, 160, "kubernetes-services", "AKS Hybrid and Edge", { size: 18 });
  step("s2", 480, 130, 2);
  card("gitops", 720, 190, 220, 160, "gear", "GitOps\nconfigurations", { size: 18 });
  step("s3", 810, 130, 3);
  zone("ctl", 1040, 160, 440, 240, TINT.mg);
  box("flux", 1060, 200, 190, 160, "Flux\ncontroller", { size: 20 });
  box("helm", 1270, 200, 190, 160, "Helm\ncontroller", { size: 20 });
  box("fluxsrc", 1620, 220, 200, 100, "Flux source", { size: 18 });
  step("s7", 1700, 340, 7);
  txt("flux-t", 1560, 150, "Flux picks up changes", { size: 18 });
  card("git", 1960, 180, 200, 140, "tfs-vc-repository", "Git repo", { size: 18 });
  step("s4", 2040, 120, 4);
  card("merge", 1960, 400, 200, 130, "commit", "Git merge", { size: 18 });
  card("chg", 1960, 600, 200, 140, "code", "Application\nchanges", { size: 18 });
  step("s6", 1945, 747, 6);
  card("dev", 1960, 790, 200, 130, "users", "Developer", { size: 18 });
  group("pipes", 1930, 100, 560, 840, "", { dashed: true, fill: "transparent" });
  card("pipelines", 2240, 440, 220, 150, "azure-devops", "Azure Pipelines", { size: 18 });

  card("ctn", 380, 470, 240, 160, "worker-container-app", "Container that has\na desired state", { size: 18 });
  card("acr", 380, 730, 240, 150, "container-registries", "Container\nRegistry", { size: 18 });
  card("v1", 1000, 640, 260, 150, "code", "Application v1\n(desired state)", { size: 18 });
  card("v2", 1300, 640, 260, 150, "code", "Application v2\n(new desired state)", { size: 18 });
  step("s5", 1060, 470, 5);
  txt("s5-t", 900, 520, "Application\ndeployment", { size: 18 });
  step("s8", 1400, 470, 8);
  txt("s8-t", 1450, 520, "Application\nrolling update", { size: 18 });

  arrow("f12", "op", "right", 270, "aks", "left", 270);
  arrow("f23", "aks", "right", 270, "gitops", "left", 270);
  arrow("f3c", "gitops", "right", 270, "ctl", "left", 270);
  arrow("fc-src", "ctl", "right", 245, "fluxsrc", "left", 245, [], { tail: "arrow" });
  arrow("fsrc-git", "fluxsrc", "right", 245, "git", "left", 245);
  arrow("fgit-src", "git", "left", 300, "fluxsrc", "right", 300);
  arrow("fsrc-c", "fluxsrc", "left", 300, "ctl", "right", 300);
  arrow("f5", "flux", "bottom", 1155, "v1", "top", 1155);
  arrow("f8", "helm", "bottom", 1365, "v2", "top", 1365);
  arrow("f-ctn", "ctn", "top", 500, "aks", "bottom", 500);
  k.line("f-acr", "acr", "top", 500, "ctn", "bottom", 500);
  arrow("f-dev", "dev", "top", 2060, "chg", "bottom", 2060);
  arrow("f-chg", "chg", "top", 2060, "merge", "bottom", 2060);
  arrow("f-merge", "merge", "top", 2060, "git", "bottom", 2060);
  arrow("f-img", "dev", "bottom", 2060, "acr", "bottom", 500, [1000]);
  txt("img-t", 1100, 1010, "Container image", { size: 18 });

  txt("footer", 40, 1080, "Pencil-sketch redraw of the Azure Architecture Center diagram \"AKS on Azure Local with GitOps\"", { size: 20, color: "#495057" });
}
