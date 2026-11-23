// 068 Microsoft Entra identity management and access management for AWS.
export const meta = {
  num: 68,
  slug: "aws-azure-ad-security",
  title: "Microsoft Entra identity management and access management for AWS",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/aws/aws-azure-ad-security",
  category: "Identity",
  status: "done",
  otherDiagrams: ["Multiple-account AWS environment", "AWS and Microsoft Entra integration", "Role mapping from AWS IAM to Microsoft Entra ID", "Configuration interactions", "Portal screenshots"],
  substitutions: {},
  differences: ["The first diagram is the single-account AWS environment; every item is an AWS concept, so all are plain sketch shapes (no Azure icons)."],
};

export function draw(k) {
  const { TINT, txt, box, group, arrow, line } = k;
  txt("title", 40, 10, "Microsoft Entra identity and access management for AWS", { size: 30 });

  box("company", 260, 90, 300, 90, "Company A", { fill: TINT.mg, size: 22 });

  group("bill", 60, 230, 900, 220, null, { fill: TINT.mg, stroke: "#868e96" });
  txt("bill-lbl", 80, 300, "Billing\nAgreement", { size: 18 });
  box("org", 260, 270, 300, 140, "AWS\nOrganization", { fill: TINT.warn, size: 20 });

  group("res", 60, 500, 900, 220, null, { fill: TINT.mg, stroke: "#868e96" });
  txt("res-lbl", 80, 570, "Resource\nGrouping", { size: 18 });
  box("acct", 260, 540, 300, 140, "AWS\nAccount", { fill: TINT.warn, size: 20 });
  box("root", 660, 570, 260, 80, "Root user", { fill: TINT.sub, size: 20 });

  group("iam", 60, 770, 900, 300, null, { fill: TINT.mg, stroke: "#868e96" });
  txt("iam-lbl", 80, 870, "Identity &\nAccess\nManagement", { size: 18 });
  box("awsiam", 260, 850, 300, 140, "AWS IAM", { fill: TINT.warn, size: 20 });
  box("princ", 660, 880, 260, 80, "Principal", { fill: TINT.sub, size: 20 });

  line("c-o", "company", "bottom", 410, "org", "top", 410, [], { dashed: true });
  line("o-a", "org", "bottom", 410, "acct", "top", 410, [], { dashed: true });
  arrow("r-a", "root", "left", 610, "acct", "right", 610);
  arrow("i-a", "awsiam", "top", 410, "acct", "bottom", 410);
  arrow("p-i", "princ", "left", 920, "awsiam", "right", 920);

  txt("footer", 40, 1120, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Microsoft Entra identity management and access management for AWS\"", { size: 20, color: "#495057" });
}
