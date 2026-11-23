// 021 Manage Microsoft 365 tenant configuration by using Microsoft365DSC and Azure DevOps.
export const meta = {
  num: 21,
  slug: "manage-microsoft-365-tenant-configuration-microsoft365dsc-devops",
  title: "Manage Microsoft 365 tenant configuration by using Microsoft365DSC and Azure DevOps",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/devops/manage-microsoft-365-tenant-configuration-microsoft365dsc-devops",
  category: "DevOps",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Git repository (fork, main)": "tfs-vc-repository", "Azure Pipelines / multi-stage pipeline": "azure-devops", "Microsoft365DSC": "powershell", "Admins": "users", "Config file": "file", "Key Vault": "key-vaults" },
  differences: [
    "Microsoft 365 staging and production have no sketch icon; they are plain labelled shapes.",
    "Diagonal deploy and approve arrows are drawn as orthogonal routes.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, step, arrow } = k;
  const Y = (v) => v + 60;
  txt("title", 60, 10, "Manage Microsoft 365 tenant configuration with Microsoft365DSC and Azure DevOps", { size: 30 });
  box("devops", 120, Y(20), 280, 90, "Azure DevOps", { iconLeft: "azure-devops", size: 22 });
  card("fork", 120, Y(380), 220, 150, "tfs-vc-repository", "Fork\nadmin 1");
  card("main", 680, Y(380), 220, 150, "tfs-vc-repository", "Main\nrepository");
  card("azp", 420, Y(640), 220, 150, "azure-devops", "Azure Pipelines");
  card("pipe", 1130, Y(380), 220, 150, "azure-devops", "Multi-stage\npipeline");
  card("kv", 1130, Y(10), 220, 150, "key-vaults", "Key Vault");
  card("dsc", 1480, Y(380), 220, 150, "powershell", "Microsoft365DSC");
  box("stg", 2000, Y(200), 240, 130, "Microsoft 365\nstaging", { fill: TINT.onprem, size: 20 });
  box("prod", 2000, Y(700), 240, 130, "Microsoft 365\nproduction", { fill: TINT.onprem, size: 20 });
  card("cfg", 120, Y(880), 220, 150, "file", "Config file");
  card("adm1", 680, Y(880), 220, 150, "users", "Admin 1");
  card("adm5", 940, Y(760), 220, 150, "users", "Admins");
  card("adm8", 1600, Y(20), 220, 150, "users", "Admins");
  card("adm9", 1600, Y(880), 220, 150, "users", "Admins");

  arrow("f1", "adm1", "left", Y(955), "cfg", "right", Y(955));
  txt("f1-t", 420, Y(970), "Add/modify/\ndelete", { size: 18 }); step("s1", 560, Y(975), 1);
  arrow("f2", "cfg", "top", 230, "fork", "bottom", 230);
  txt("f2-t", 260, Y(660), "Commit &\nsync", { size: 18 }); step("s2", 165, Y(690), 2);
  arrow("f3", "fork", "right", Y(440), "main", "left", Y(440));
  txt("f3-t", 380, Y(380), "Create pull\nrequest", { size: 18 }); step("s3", 510, Y(330), 3);
  arrow("f4", "fork", "right", Y(495), "azp", "top", 500, [500]);
  txt("f4-t", 380, Y(545), "Check pull\nrequest", { size: 18 }); step("s4", 520, Y(560), 4);
  arrow("f5", "adm5", "top", 1000, "main", "bottom", 850, [Y(620)]);
  txt("f5-t", 700, Y(630), "Review code &\nmerge PR", { size: 18 }); step("s5", 1060, Y(640), 5);
  arrow("mp", "main", "right", Y(455), "pipe", "left", Y(455));
  arrow("f6", "pipe", "top", 1240, "kv", "bottom", 1240);
  txt("f6-t", 1270, Y(225), "Get credentials for compiling\nManaged Object Format\n(MOF) files", { size: 18 }); step("s6", 1180, Y(250), 6);
  arrow("pd", "pipe", "right", Y(455), "dsc", "left", Y(455));
  txt("f7-t", 1430, Y(550), "Deploy changes from MOF\nfiles via PowerShell task", { size: 18 }); step("s7", 1560, Y(620), 7);
  arrow("dep-s", "dsc", "right", Y(420), "stg", "left", Y(265), [1800]);
  txt("dep-s-t", 1820, Y(330), "Deploy", { size: 18 });
  arrow("dep-p", "dsc", "right", Y(490), "prod", "left", Y(765), [1880]);
  txt("dep-p-t", 1900, Y(600), "Deploy", { size: 18 });
  arrow("f8", "adm8", "right", Y(95), "stg", "top", 2120);
  txt("f8-t", 1900, Y(25), "Validate\nchanges", { size: 18 }); step("s8", 1840, Y(25), 8);
  arrow("f9", "adm9", "right", Y(955), "prod", "bottom", 2120);
  txt("f9-t", 1560, Y(795), "Approve change for\ndeployment", { size: 18 }); step("s9", 1860, Y(850), 9);

  txt("footer", 60, 1160, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Manage Microsoft 365 tenant configuration by using Microsoft365DSC and Azure DevOps\"", { size: 20, color: "#495057" });
}
