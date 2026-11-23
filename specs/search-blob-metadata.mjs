// 094 Create an Azure AI Search index based on file content and metadata.
export const meta = {
  num: 94,
  slug: "search-blob-metadata",
  title: "Create an Azure AI Search index based on file content and metadata",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/search-blob-metadata",
  category: "AI + Machine Learning",
  status: "done",
  otherDiagrams: [],
  substitutions: {},
  differences: [
    "The diagram has no product icons; blob tree, tables and indexers are plain labelled shapes, the laptop client is a labelled shape.",
    "Green field-mapping arrows from Table Storage are drawn as Table Storage -> Table indexer -> index columns, orthogonally, instead of diagonal lines passing through the indexer.",
    "Connector lines from each blob to its author metadata tag are replaced by placing the tags beside the blobs.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, group, arrow, step } = k;
  const G = "#5c940d";
  function tbl(p, x, y, widths, rows, heights, fills) {
    let yy = y;
    rows.forEach((r, ri) => {
      let xx = x;
      r.forEach((c, ci) => {
        box(`${p}-${ri}-${ci}`, xx, yy, widths[ci], heights[ri], c, { size: 16, fill: fills[ri] });
        xx += widths[ci];
      });
      yy += heights[ri];
    });
  }
  txt("title", 40, 0, "AI Search index from file content and metadata", { size: 28 });
  step("s1", 140, 60, 1);
  txt("blob-lbl", 190, 64, "Blob Storage", { size: 22 });
  box("tree", 180, 110, 560, 270,
    "files/\n   paper/\n      Five Steps to Culture Change.pdf\n      Resilience in Azure.pdf\n      ...\n   report/\n      2021 Diversity and Inclusion Report.pdf\n      2022 Diversity and Inclusion Report.pdf\n      ...",
    { size: 16, align: "left", fill: TINT.white });
  box("tag1", 770, 120, 230, 60, "Author: Henry Ross", { size: 16, fill: TINT.sub });
  box("tag2", 770, 190, 230, 60, "Author: Ana Bowman", { size: 16, fill: TINT.sub });
  box("tag3", 770, 260, 230, 60, "Author: Corey Gray", { size: 16, fill: TINT.sub });
  box("tag4", 770, 320 + 10, 230, 60, "Author: Corey Gray", { size: 16, fill: TINT.sub });
  txt("ais-lbl", 100, 450, "Azure AI Search", { size: 22 });
  group("ais", 100, 490, 1300, 700, null, { fill: TINT.white });
  box("bidx", 240, 520, 900, 100, "Blob indexer", { size: 20, fill: TINT.sub });
  arrow("a3", "tree", "bottom", 460, "bidx", "top", 460);
  step("s3", 480, 410, 3);
  txt("si-lbl", 140, 660, "Search index", { size: 18 });
  tbl("si", 140, 700, [260, 200, 180, 200, 200, 120],
    [["metadata_storage_path", "content", "author", "business_impact", "document_type", "..."],
     ["aHR0cHM6...mUucGRm0", "\\nResilience...", "Ana Bowman", "high", "paper", "..."],
     ["aHR0cHM6...dC5wZGY1", "\\nOur approach...", "Corey Gray", "medium", "report", "..."],
     ["...", "...", "", "...", "...", "..."]],
    [60, 60, 60, 60], [TINT.white, TINT.sub, TINT.white, TINT.sub]);
  arrow("a-c0", "bidx", "bottom", 270, "si-0-0", "top", 270);
  arrow("a-c1", "bidx", "bottom", 500, "si-0-1", "top", 500);
  arrow("a-c2", "bidx", "bottom", 690, "si-0-2", "top", 690);
  box("tidx", 240, 1060, 900, 100, "Table indexer", { size: 20, fill: TINT.app });
  txt("fm-lbl", 310, 970, "field mapping\nbase64Encode", { size: 16 });
  arrow("g-c0", "tidx", "top", 270, "si-3-0", "bottom", 270, [], { color: G });
  arrow("g-c3", "tidx", "top", 880, "si-3-3", "bottom", 880, [], { color: G });
  arrow("g-c4", "tidx", "top", 1080, "si-3-4", "bottom", 1080, [], { color: G });
  step("s4", 1200, 1080, 4);
  box("client", 1470, 750, 200, 100, "Client\n(web browser)", { size: 16, fill: TINT.onprem });
  step("s5", 1550, 680, 5);
  arrow("a5", "client", "left", 790, "si-1-5", "right", 790, [], { dashed: true });
  step("s2", 140, 1250, 2);
  txt("ts-lbl", 190, 1254, "Table Storage", { size: 22 });
  tbl("ts", 140, 1300, [180, 200, 480, 200, 200],
    [["PartitionKey", "RowKey", "metadata_storage_path", "business_impact", "document_type"],
     ["files", "aHR0cHM6...\nUucGRmCg", "https://contoso.blob.core.windows.net/\nfiles/paper/Resilience in Azure.pdf", "high", "whitepaper"],
     ["files", "aHR0cHM6...\ndC5wZGYK", "https://contoso.blob.core.windows.net/files/\nreport/2021 Diversity and Inclusion Report.pdf", "medium", "report"],
     ["...", "...", "...", "...", "..."]],
    [60, 80, 80, 60], [TINT.white, TINT.sub, TINT.white, TINT.sub]);
  arrow("g-t2", "ts-0-2", "top", 760, "tidx", "bottom", 760, [], { color: G });
  arrow("g-t3", "ts-0-3", "top", 1100, "tidx", "bottom", 1100, [], { color: G });
  arrow("g-t4", "ts-0-4", "top", 1300, "tidx", "right", 1130, [], { color: G });
  txt("footer", 40, 1620, "Pencil-sketch redraw of the Azure Architecture Center diagram \"search based on file content and metadata\"", { size: 20, color: "#495057" });
}
