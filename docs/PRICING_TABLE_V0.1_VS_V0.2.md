# Pricing Table Comparison: V0.1 vs V0.2

The app now uses **ProcureOS Pricing Calculator - json V0.2** by default. V0.1 is still available for rollback (set `PRICING_TABLE_VERSION = "v1"` in `lib/pricing-calculator.ts`).

## Three example comparisons

### Example 1: $1M annual freight spend (SaaS-only tier)

| Plan        | V0.1 (old) | V0.2 (new) | Change   |
|------------|------------|------------|----------|
| SaaS Core  | $279/mo    | $299/mo    | +$20/mo  |
| SaaS Pro   | $349/mo    | $349/mo    | —        |

**Implication:** Slight increase on Core only at $1M; Pro unchanged. Small revenue uplift for Core at this band.

---

### Example 2: $5M annual freight spend (SaaS-only tier)

| Plan        | V0.1 (old) | V0.2 (new) | Change    |
|------------|------------|------------|-----------|
| SaaS Core  | $499/mo    | $829/mo    | +$330/mo  |
| SaaS Pro   | $599/mo    | $999/mo    | +$400/mo  |

**Implication:** Large step-up in SaaS pricing in the $2M–$9M band. V0.2 introduces granular tiers ($2M–$9M) instead of one $5M-style tier, so $5M now maps to a higher list price. Expect higher deal sizes and possible pushback; good to align sales on positioning and discounts if needed.

---

### Example 3: $50M annual freight spend (marketplace available)

| Plan              | V0.1 (old) | V0.2 (new) | Change   |
|------------------|------------|------------|----------|
| Marketplace Pro  | $1,199/mo  | $1,199/mo  | —        |
| SaaS Core        | $3,199/mo  | $3,699/mo  | +$500/mo |
| SaaS Pro         | $3,799/mo  | $4,299/mo  | +$500/mo |

**Implication:** Marketplace pricing is unchanged at $50M. SaaS list prices increase by $500/mo (Core and Pro). Customers on marketplace are unaffected; standard SaaS quotes go up.

---

## Summary implications

1. **V0.2 raises list prices** for SaaS across most bands (especially $2M–$9M and $10M+). Marketplace structure and add-on fees are unchanged where they exist.
2. **More granular tiers in V0.2** ($250K–$9M in $1M steps) give a clearer progression; $5M no longer shares a tier with $1M–$5M, so it naturally lands on a higher price.
3. **Rollback:** To revert to the old table, set `PRICING_TABLE_VERSION = "v1"` in `lib/pricing-calculator.ts`. No other code changes required.
