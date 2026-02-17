const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "../pricing_table/ProcureOS Pricing Calculator - json V0.2.csv");
const csv = fs.readFileSync(csvPath, "utf8");
const lines = csv.trim().split("\n");
const headers = lines[0].split(",");
const rows = lines.slice(1);

function parseDollar(val) {
  const s = String(val).trim().replace(/^["']|["']$/g, "").replace(/\$/g, "").replace(/,/g, "").trim();
  if (!s || s === "SaaS Only" || s === "Custom") return null;
  const n = parseInt(s, 10);
  return isNaN(n) ? null : n;
}

function parsePct(val) {
  const s = String(val).trim().replace(/%/g, "");
  if (!s || s === "SaaS Only") return 0;
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

function parseFee(val) {
  const s = String(val).trim().replace(/^["']|["']$/g, "").replace(/\$/g, "").replace(/,/g, "").trim();
  if (s === "SaaS Only") return 0;
  if (s === "Custom") return -1;
  const n = parseInt(s, 10);
  return isNaN(n) ? -1 : n;
}

const tiers = [];
for (const line of rows) {
  const parts = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQuotes = !inQuotes;
    else if ((c === "," && !inQuotes) || (c === "\n" && !inQuotes)) {
      parts.push(cur);
      cur = "";
    } else cur += c;
  }
  parts.push(cur);

  const spend = parseDollar(parts[0]);
  if (spend == null) continue;

  const coreTarget = parts[1] && parts[1].trim() === "SaaS Only" ? 0 : (parseDollar(parts[1]) ?? 0);
  const corePct = parsePct(parts[2]);
  const proTarget = parts[3] && parts[3].trim() === "SaaS Only" ? 0 : (parseDollar(parts[3]) ?? 0);
  const proPct = parsePct(parts[4]);
  const proAddOn = parts[5] && parts[5].trim() === "SaaS Only" ? 0 : parseFee(parts[5]);
  const coreSaaS = parseFee(parts[6]);
  const proSaaS = parseFee(parts[7]);

  tiers.push({
    annual_freight_spend: spend,
    coreMarketplace: { target: coreTarget, targetPercentage: corePct },
    proMarketplace: { target: proTarget, targetPercentage: proPct, saasAddOnFee: proAddOn },
    coreSaaS: { fee: coreSaaS },
    proSaaS: { fee: proSaaS },
  });
}

const out = `/**
 * ProcureOS Pricing Calculator - json V0.2
 * Generated from pricing_table/ProcureOS Pricing Calculator - json V0.2.csv
 * Do not edit by hand; re-run scripts/generate-pricing-v2.js after CSV changes.
 */
import type { PricingTier } from "./pricing-calculator"

export const pricingDataV2: PricingTier[] = ${JSON.stringify(tiers, null, 2).replace(/"([^"]+)":/g, "$1:")}
`;

const outPath = path.join(__dirname, "../lib/pricing-data-v2.ts");
fs.writeFileSync(outPath, out);
console.log("Wrote", outPath, "with", tiers.length, "tiers");