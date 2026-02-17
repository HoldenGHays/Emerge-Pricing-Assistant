/**
 * ProcureOS Pricing Calculator - json V0.1
 * Kept for rollback. Default table is V0.2.
 */
import type { PricingTier } from "./pricing-types"

export const pricingDataV1: PricingTier[] = [
  { annual_freight_spend: 250000, coreMarketplace: { target: 0, targetPercentage: 0 }, proMarketplace: { target: 0, targetPercentage: 0, saasAddOnFee: 0 }, coreSaaS: { fee: 199 }, proSaaS: { fee: 239 } },
  { annual_freight_spend: 500000, coreMarketplace: { target: 0, targetPercentage: 0 }, proMarketplace: { target: 0, targetPercentage: 0, saasAddOnFee: 0 }, coreSaaS: { fee: 249 }, proSaaS: { fee: 299 } },
  { annual_freight_spend: 1000000, coreMarketplace: { target: 0, targetPercentage: 0 }, proMarketplace: { target: 0, targetPercentage: 0, saasAddOnFee: 0 }, coreSaaS: { fee: 279 }, proSaaS: { fee: 349 } },
  { annual_freight_spend: 5000000, coreMarketplace: { target: 0, targetPercentage: 0 }, proMarketplace: { target: 0, targetPercentage: 0, saasAddOnFee: 0 }, coreSaaS: { fee: 499 }, proSaaS: { fee: 599 } },
  { annual_freight_spend: 10000000, coreMarketplace: { target: 250000, targetPercentage: 2.5 }, proMarketplace: { target: 250000, targetPercentage: 2.5, saasAddOnFee: 749 }, coreSaaS: { fee: 2199 }, proSaaS: { fee: 2499 } },
  { annual_freight_spend: 25000000, coreMarketplace: { target: 250000, targetPercentage: 1.25 }, proMarketplace: { target: 250000, targetPercentage: 1.25, saasAddOnFee: 999 }, coreSaaS: { fee: 2599 }, proSaaS: { fee: 3199 } },
  { annual_freight_spend: 50000000, coreMarketplace: { target: 250000, targetPercentage: 0.75 }, proMarketplace: { target: 250000, targetPercentage: 0.75, saasAddOnFee: 1199 }, coreSaaS: { fee: 3199 }, proSaaS: { fee: 3799 } },
  { annual_freight_spend: 75000000, coreMarketplace: { target: 250000, targetPercentage: 0.58 }, proMarketplace: { target: 250000, targetPercentage: 0.58, saasAddOnFee: 1399 }, coreSaaS: { fee: 3699 }, proSaaS: { fee: 4499 } },
  { annual_freight_spend: 100000000, coreMarketplace: { target: 500000, targetPercentage: 0.5 }, proMarketplace: { target: 500000, targetPercentage: 0.5, saasAddOnFee: 1499 }, coreSaaS: { fee: 4199 }, proSaaS: { fee: 4999 } },
  { annual_freight_spend: 125000000, coreMarketplace: { target: 500000, targetPercentage: 0.43 }, proMarketplace: { target: 500000, targetPercentage: 0.43, saasAddOnFee: 1649 }, coreSaaS: { fee: 4499 }, proSaaS: { fee: 5499 } },
  { annual_freight_spend: 150000000, coreMarketplace: { target: 500000, targetPercentage: 0.38 }, proMarketplace: { target: 500000, targetPercentage: 0.38, saasAddOnFee: 1749 }, coreSaaS: { fee: 4799 }, proSaaS: { fee: 5799 } },
  { annual_freight_spend: 175000000, coreMarketplace: { target: 500000, targetPercentage: 0.34 }, proMarketplace: { target: 500000, targetPercentage: 0.34, saasAddOnFee: 1799 }, coreSaaS: { fee: 4999 }, proSaaS: { fee: 5999 } },
  { annual_freight_spend: 200000000, coreMarketplace: { target: 500000, targetPercentage: 0.31 }, proMarketplace: { target: 500000, targetPercentage: 0.31, saasAddOnFee: 1899 }, coreSaaS: { fee: 5299 }, proSaaS: { fee: 6299 } },
  { annual_freight_spend: 225000000, coreMarketplace: { target: 500000, targetPercentage: 0.29 }, proMarketplace: { target: 500000, targetPercentage: 0.29, saasAddOnFee: 1999 }, coreSaaS: { fee: 5499 }, proSaaS: { fee: 6599 } },
  { annual_freight_spend: 250000000, coreMarketplace: { target: 500000, targetPercentage: 0.28 }, proMarketplace: { target: 500000, targetPercentage: 0.28, saasAddOnFee: -1 }, coreSaaS: { fee: -1 }, proSaaS: { fee: -1 } },
]
