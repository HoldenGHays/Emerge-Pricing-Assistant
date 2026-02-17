/**
 * Formats a dollar amount as shortened currency (e.g., $500K, $1.2M, $2.5B)
 * @param {number} amount - The dollar amount to format
 * @returns {string} - Formatted currency string
 */
function formatShortenedCurrency(amount: number): string {
  if (amount === 0) return '$0'
  
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`
  } else {
    return `$${amount.toLocaleString()}`
  }
}

export type { PricingTier } from "./pricing-types"
import type { PricingTier } from "./pricing-types"

/** Which pricing table to use. Set to "v1" to roll back to ProcureOS Pricing Calculator - json V0.1. */
export const PRICING_TABLE_VERSION = "v2" as const

import { pricingDataV1 } from "./pricing-data-v1"
import { pricingDataV2 } from "./pricing-data-v2"

/** Active pricing table (V0.2 by default). Use PRICING_TABLE_VERSION to switch. */
export function getPricingData(): PricingTier[] {
  return PRICING_TABLE_VERSION === "v2" ? pricingDataV2 : pricingDataV1
}

/** @deprecated Use getPricingData() or pricingDataV1/pricingDataV2. Kept for compatibility. */
export const pricingData: PricingTier[] = getPricingData()

export function findPricingTier(annualSpend: number, data?: PricingTier[]): PricingTier | null {
  const table = data ?? getPricingData()
  // Sort by annual freight spend to ensure we find the correct tier
  const sortedData = [...table].sort((a, b) => a.annual_freight_spend - b.annual_freight_spend);
  
  // Find the tier where the annual spend is less than or equal to the tier's spend
  for (let i = sortedData.length - 1; i >= 0; i--) {
    if (annualSpend >= sortedData[i].annual_freight_spend) {
      return sortedData[i];
    }
  }
  
  return null;
}

export function calculatePricing(annualSpend: number) {
  const tier = findPricingTier(annualSpend);
  
  if (!tier) {
    return {
      error: "Annual spend is below minimum threshold of $250,000",
      tier: null
    };
  }

  const isCustomPricing = tier.coreSaaS.fee === -1;
  
  return {
    tier,
    isCustomPricing,
    pricing: {
      marketplace: {
        core: {
          price: 0, // Always free
          target: tier.coreMarketplace.target,
          targetPercentage: tier.coreMarketplace.targetPercentage,
          description: `Free (requires ${formatShortenedCurrency(tier.coreMarketplace.target)} through marketplace)`
        },
        pro: {
          price: isCustomPricing ? "Custom" : tier.proMarketplace.saasAddOnFee,
          target: tier.proMarketplace.target,
          targetPercentage: tier.proMarketplace.targetPercentage,
          description: isCustomPricing 
            ? "Custom pricing" 
            : `$${tier.proMarketplace.saasAddOnFee}/month (requires ${formatShortenedCurrency(tier.proMarketplace.target)} through marketplace)`
        }
      },
      saas: {
        core: {
          price: isCustomPricing ? "Custom" : tier.coreSaaS.fee,
          description: isCustomPricing ? "Custom pricing" : `$${tier.coreSaaS.fee}/month`
        },
        pro: {
          price: isCustomPricing ? "Custom" : tier.proSaaS.fee,
          description: isCustomPricing ? "Custom pricing" : `$${tier.proSaaS.fee}/month`
        }
      }
    }
  };
}

export function convertVolumeToSpend(volume: number): number {
  return volume * 1700; // $1700 per truckload
}
