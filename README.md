# Azure landing zone, sketched

A hand-drawn Excalidraw redraw of the Microsoft Cloud Adoption Framework **Azure landing zone (ALZ) – Hub & Spoke** reference architecture, drawn like for like and illustrated with ChatGPT sketchnote Azure icons.

Live: https://raj-microsoft.github.io/azure-landing-zone-sketch/

Source: [What is an Azure landing zone? (Microsoft Learn)](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/), the Hub-Spoke reference architecture and the Management group hierarchy tabs.

## Build

```
npm install
npm run build     # build-scene -> check-geometry (must print PASS) -> vite build into docs/
```

- `scripts/build-scene.mjs` writes `public/scene.excalidraw` (bound text, bound arrows, icons embedded as data URLs). It refuses icon ids that are missing from the azure-icons catalogue or the sketchnote set.
- `scripts/check-geometry.mjs` checks arrow bindings and edge endpoints, arrows crossing boxes, icons or zones, overlapping arrows, overlapping shapes, every image having a file, text sizes of at least 16 px and labelled shapes of at least 120x60.
- `public/fallback.svg` is a prerendered picture that shows if JavaScript fails.

## What differs from the official diagram

- Hand-drawn style: Excalifont, rough strokes, and the design-area letters drawn as larger green ovals.
- Simplified: the small Sentinel connector icons, the stacked-subscription shadow in the billing box, the gear badges on management groups, the on-premises building icons and the GitHub logo are omitted. Shared tool rows sit inside each subscription panel.
- The Local management group shows no subscriptions, as in the hub-and-spoke diagram. The separate hierarchy diagram adds LC1 and LA1 under Local.
- The Workload A2 to compliant-VM-templates (G) link is drawn once, from region N, as a dashed line.

## Icon substitutions (no exact sketch icon)

Action Groups → automation-accounts · Role assignment → entra-identity-roles-and-administrators · Microsoft Entra ID → entra-connect · Active Directory Domain Services → active-directory-connect-health · DC1-3 → virtual-machine · Azure DNS → dns-zones · Applications → application-group · Shared services → shared-image-galleries · Compliant VM templates → image-templates · VM SKU server → server-farm · Database → sql-database · Git repository → tfs-vc-repository · Platform DevOps team and IAM → groups · EA → cost-management-and-billing · Subscription key → subscriptions.

Diagram content © Microsoft (reference architecture); this is an illustrative redraw.
