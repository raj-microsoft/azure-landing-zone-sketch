// 137 Use Azure file shares in a hybrid environment.
export const meta = {
  num: 137,
  slug: "azure-file-share",
  title: "Use Azure file shares in a hybrid environment",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/azure-file-share",
  category: "Hybrid",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Domain controller": "entra-domain-services", "Microsoft Entra Connect": "entra-connect-sync", "Microsoft Entra sync": "entra-connect-sync", "Microsoft Entra tenant": "entra-connect", "Recovery Services vault": "recovery-services-vaults", "Virtual network gateway": "virtual-network-gateways", "Azure file shares": "storage-azure-files" },
  differences: ["Clients drawn as labelled sketch shapes; Microsoft Entra sync shown as a card on the sync line; Microsoft Entra tenant given an icon card."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow } = k;
  const S = 16;
  group("onp1", 20, 40, 560, 220, null, { fill: TINT.onprem, dashed: true });
  card("dc", 60, 80, 180, 130, "entra-domain-services", "Domain\ncontroller", { size: S });
  card("ec", 340, 80, 200, 130, "entra-connect-sync", "Microsoft Entra\nConnect", { size: S });
  group("onp2", 20, 300, 560, 200, null, { fill: TINT.onprem, dashed: true });
  box("cl1", 180, 360, 160, 80, "Clients", { fill: TINT.app, size: S });
  group("onp3", 20, 540, 560, 220, null, { fill: TINT.onprem, dashed: true });
  box("cl2", 180, 610, 160, 80, "Clients", { fill: TINT.app, size: S });
  card("sync", 640, 80, 180, 120, "entra-connect-sync", "Microsoft Entra\nsync", { size: S });
  group("az", 880, 40, 720, 720, null, { fill: TINT.sub, dashed: true });
  txt("az-l", 1180, 0, "Azure", { size: 24 });
  card("ten", 1260, 80, 200, 120, "entra-connect", "Microsoft Entra\ntenant", { size: S });
  card("rsv", 1260, 260, 200, 120, "recovery-services-vaults", "Recovery Services\nvault", { size: S });
  card("vng", 920, 430, 190, 120, "virtual-network-gateways", "Virtual network\ngateway", { size: S });
  card("afs", 1260, 450, 200, 120, "storage-azure-files", "Azure file\nshares", { size: S });
  arrow("a1", "dc", "right", 145, "ec", "left", 145, [], {});
  arrow("a2", "ec", "right", 140, "sync", "left", 140, [], {});
  arrow("a3", "sync", "right", 140, "ten", "left", 140, [], {});
  arrow("vpn", "cl1", "right", 400, "vng", "left", 490, [720], {});
  txt("vpn-l", 610, 360, "VPN", { size: S });
  arrow("smb", "vng", "right", 490, "afs", "left", 490, [], {});
  txt("smb-l", 1140, 450, "SMB 3.0", { size: S });
  arrow("smb2", "cl2", "right", 650, "afs", "bottom", 1360, [], {});
  txt("smb2-l", 620, 600, "SMB 3.0\nport 445", { size: S });
  arrow("bk", "rsv", "right", 320, "afs", "right", 520, [1540], { tail: "arrow" });
  txt("footer", 20, 800, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure file shares architecture\"", { size: 20, color: "#495057" });
}
