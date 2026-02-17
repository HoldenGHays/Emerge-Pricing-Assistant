export interface PricingTier {
  annual_freight_spend: number
  coreMarketplace: {
    target: number
    targetPercentage: number
  }
  proMarketplace: {
    target: number
    targetPercentage: number
    saasAddOnFee: number
  }
  coreSaaS: {
    fee: number
  }
  proSaaS: {
    fee: number
  }
}
