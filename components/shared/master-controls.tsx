import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MasterControlsProps {
  // Input state
  inputType: "spend" | "volume"
  setInputType: (value: "spend" | "volume") => void
  annualSpend: string
  setAnnualSpend: (value: string) => void
  spendUnit: "thousands" | "millions" | "billions"
  setSpendUnit: (value: "thousands" | "millions" | "billions") => void
  volume: string
  setVolume: (value: string) => void
  frequency: "yearly" | "quarterly" | "monthly" | "weekly" | "daily"
  setFrequency: (value: "yearly" | "quarterly" | "monthly" | "weekly" | "daily") => void
  
  // Document type state
  documentType: "docs" | "decks"
  setDocumentType: (value: "docs" | "decks") => void
  
  // Checkbox states
  includeTitle: boolean
  setIncludeTitle: (value: boolean) => void
  includeIntro: boolean
  setIncludeIntro: (value: boolean) => void
  includeProblemSolution: boolean
  setIncludeProblemSolution: (value: boolean) => void
  includeContractOverview: boolean
  setIncludeContractOverview: (value: boolean) => void
  includeSpotOverview: boolean
  setIncludeSpotOverview: (value: boolean) => void
  includeEmergeInsights: boolean
  setIncludeEmergeInsights: (value: boolean) => void
  includeRFPFeatureGrid: boolean
  setIncludeRFPFeatureGrid: (value: boolean) => void
  includeSpotFeatureGrid: boolean
  setIncludeSpotFeatureGrid: (value: boolean) => void
  includeSpotQuoteCreation: boolean
  setIncludeSpotQuoteCreation: (value: boolean) => void
  includeSpotRateCollection: boolean
  setIncludeSpotRateCollection: (value: boolean) => void
  includeSpotBenchmarking: boolean
  setIncludeSpotBenchmarking: (value: boolean) => void
  includeSpotTracking: boolean
  setIncludeSpotTracking: (value: boolean) => void
  includeSpotReporting: boolean
  setIncludeSpotReporting: (value: boolean) => void
  includeSpotVendorEngagement: boolean
  setIncludeSpotVendorEngagement: (value: boolean) => void
  includeSpotEmergeMarketplace: boolean
  setIncludeSpotEmergeMarketplace: (value: boolean) => void
  includeContractReporting: boolean
  setIncludeContractReporting: (value: boolean) => void
  includeContractBenchmarking: boolean
  setIncludeContractBenchmarking: (value: boolean) => void
  includeContractEmergeMarketplace: boolean
  setIncludeContractEmergeMarketplace: (value: boolean) => void
  includeContractVendorEngagement: boolean
  setIncludeContractVendorEngagement: (value: boolean) => void
  includeContractSpendOptimization: boolean
  setIncludeContractSpendOptimization: (value: boolean) => void
  includeContractEventManagement: boolean
  setIncludeContractEventManagement: (value: boolean) => void
  includeIntegrations: boolean
  setIncludeIntegrations: (value: boolean) => void
  includeGeneralIntegration: boolean
  setIncludeGeneralIntegration: (value: boolean) => void
  includeMercuryGateIntegration: boolean
  setIncludeMercuryGateIntegration: (value: boolean) => void
  includeCapacityLinkIntegration: boolean
  setIncludeCapacityLinkIntegration: (value: boolean) => void
  
  // Pricing sheet state
  includePricingSheet: boolean
  setIncludePricingSheet: (value: boolean) => void
  pricingSheetType: "marketplace" | "saas" | "both" | "combined" | "proOnly"
  setPricingSheetType: (value: "marketplace" | "saas" | "both" | "combined" | "proOnly") => void
  billingCadence: "month" | "year"
  setBillingCadence: (value: "month" | "year") => void
  isMarketplacePricingAvailable?: boolean
  
  // Custom pricing state
  customPricing: {
    marketplacePro: string
    saasCore: string
    saasPro: string
    marketplaceTarget: string
    marketplaceTargetUnit: "thousands" | "millions" | "billions"
  }
  setCustomPricing: (updater: (prev: any) => any) => void
  
  // Utility functions
  error?: string
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleVolumeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  convertSpendToDollars: (value: number, unit: string) => number
  calculateAnnualVolume: (volumeValue: number, freq: string) => number
  calculatePricing: (spend: number) => any
  
  // UI state
  isContractDetailsExpanded: boolean
  setIsContractDetailsExpanded: (value: boolean) => void
  isSpotDetailsExpanded: boolean
  setIsSpotDetailsExpanded: (value: boolean) => void
  isIntegrationsExpanded: boolean
  setIsIntegrationsExpanded: (value: boolean) => void
  
  // Variant for different styling
  variant?: "welcome" | "preview"
}

export function MasterControls({
  // Input state
  inputType,
  setInputType,
  annualSpend,
  setAnnualSpend,
  spendUnit,
  setSpendUnit,
  volume,
  setVolume,
  frequency,
  setFrequency,
  
  // Document type state
  documentType,
  setDocumentType,
  
  // Checkbox states
  includeTitle,
  setIncludeTitle,
  includeIntro,
  setIncludeIntro,
  includeProblemSolution,
  setIncludeProblemSolution,
  includeContractOverview,
  setIncludeContractOverview,
  includeSpotOverview,
  setIncludeSpotOverview,
  includeEmergeInsights,
  setIncludeEmergeInsights,
  includeRFPFeatureGrid,
  setIncludeRFPFeatureGrid,
  includeSpotFeatureGrid,
  setIncludeSpotFeatureGrid,
  includeSpotQuoteCreation,
  setIncludeSpotQuoteCreation,
  includeSpotRateCollection,
  setIncludeSpotRateCollection,
  includeSpotBenchmarking,
  setIncludeSpotBenchmarking,
  includeSpotTracking,
  setIncludeSpotTracking,
  includeSpotReporting,
  setIncludeSpotReporting,
  includeSpotVendorEngagement,
  setIncludeSpotVendorEngagement,
  includeSpotEmergeMarketplace,
  setIncludeSpotEmergeMarketplace,
  includeContractReporting,
  setIncludeContractReporting,
  includeContractBenchmarking,
  setIncludeContractBenchmarking,
  includeContractEmergeMarketplace,
  setIncludeContractEmergeMarketplace,
  includeContractVendorEngagement,
  setIncludeContractVendorEngagement,
  includeContractSpendOptimization,
  setIncludeContractSpendOptimization,
  includeContractEventManagement,
  setIncludeContractEventManagement,
  includeIntegrations,
  setIncludeIntegrations,
  includeGeneralIntegration,
  setIncludeGeneralIntegration,
  includeMercuryGateIntegration,
  setIncludeMercuryGateIntegration,
  includeCapacityLinkIntegration,
  setIncludeCapacityLinkIntegration,
  
  // Pricing sheet state
  includePricingSheet,
  setIncludePricingSheet,
  pricingSheetType,
  setPricingSheetType,
  billingCadence,
  setBillingCadence,
  isMarketplacePricingAvailable = true,
  
  // Custom pricing state
  customPricing,
  setCustomPricing,
  
  // Utility functions
  error,
  handleInputChange,
  handleVolumeChange,
  convertSpendToDollars,
  calculateAnnualVolume,
  calculatePricing,
  
  // UI state
  isContractDetailsExpanded,
  setIsContractDetailsExpanded,
  isSpotDetailsExpanded,
  setIsSpotDetailsExpanded,
  isIntegrationsExpanded,
  setIsIntegrationsExpanded,
  
  // Variant
  variant = "welcome"
}: MasterControlsProps) {
  const isWelcome = variant === "welcome"
  const labelClass = isWelcome ? "text-foreground" : "text-foreground text-sm font-medium"
  const inputClass = isWelcome ? `flex-1 ${error ? "border-destructive" : "border-input"}` : "flex-1"
  const selectClass = "px-3 py-2 border border-input rounded-md bg-background text-sm"

  // Calculate pricing info for custom pricing fields
  const getPricingInfo = () => {
    const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
    const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0
    
    if (spendValue > 0) {
      const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
      const pricingResult = calculatePricing(spendInDollars)
      return pricingResult.pricing
    } else if (volumeValue > 0) {
      const annualVolume = calculateAnnualVolume(volumeValue, frequency)
      const estimatedSpend = annualVolume * 1700
      const pricingResult = calculatePricing(estimatedSpend)
      return pricingResult.pricing
    }
    return null
  }

  const pricingInfo = getPricingInfo()

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className={labelClass}>
            Input Method
          </Label>
          <Tabs value={inputType} onValueChange={(value) => setInputType(value as "spend" | "volume")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="spend">Spend ($)</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
            </TabsList>
            
            <TabsContent value="spend" className="space-y-2 mt-4">
              <Label htmlFor={`annual-spend-${variant}`} className={labelClass}>
                What is the customer's annual freight spend?
              </Label>
              <div className="flex gap-2">
                <Input
                  id={`annual-spend-${variant}`}
                  type="text"
                  placeholder="250"
                  value={annualSpend}
                  onChange={handleInputChange || ((e) => setAnnualSpend(e.target.value))}
                  className={inputClass}
                />
                <select
                  value={spendUnit}
                  onChange={(e) => setSpendUnit(e.target.value as any)}
                  className={selectClass}
                >
                  <option value="thousands">Thousands</option>
                  <option value="millions">Millions</option>
                  <option value="billions">Billions</option>
                </select>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {annualSpend && (
                <p className="text-xs text-muted-foreground">
                  Annual spend: ${convertSpendToDollars(Number.parseFloat(annualSpend) || 0, spendUnit).toLocaleString()}
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="volume" className="space-y-2 mt-4">
              <Label htmlFor={`volume-${variant}`} className={labelClass}>
                What is the customer's estimated volume?
              </Label>
              <div className="flex gap-2">
                <Input
                  id={`volume-${variant}`}
                  type="text"
                  placeholder="100"
                  value={volume}
                  onChange={handleVolumeChange || ((e) => setVolume(e.target.value))}
                  className={inputClass}
                />
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                  className={selectClass}
                >
                  <option value="yearly">Yearly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {volume && (
                <p className="text-xs text-muted-foreground">
                  Annual volume: {calculateAnnualVolume(Number.parseFloat(volume) || 0, frequency).toLocaleString()} truckloads
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Document Type Selector */}
      <div className="space-y-2">
        <Label className={labelClass}>
          Document Type
        </Label>
        <Tabs value={documentType} onValueChange={(value) => setDocumentType(value as "docs" | "decks")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="docs">Docs</TabsTrigger>
            <TabsTrigger value="decks">Decks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Document Selection Controls */}
      <div className="space-y-2">
        {documentType === "docs" ? (
          // Docs mode - original structure
          <>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`include-intro-${variant}`}
                checked={includeIntro}
                onCheckedChange={(checked) => setIncludeIntro(checked as boolean)}
              />
              <Label htmlFor={`include-intro-${variant}`} className="text-foreground text-sm">
                Include ProcureOS Overview
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`include-rfp-${variant}`}
                checked={includeProblemSolution}
                onCheckedChange={(checked) => {
                  console.log('RFP checkbox changed:', checked)
                  setIncludeProblemSolution(checked as boolean)
                }}
              />
              <Label htmlFor={`include-rfp-${variant}`} className="text-foreground text-sm">
                Include RFP Overview
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`include-spot-${variant}`}
                checked={includeSpotOverview}
                onCheckedChange={(checked) => {
                  console.log('Spot checkbox changed:', checked)
                  setIncludeSpotOverview(checked as boolean)
                }}
              />
              <Label htmlFor={`include-spot-${variant}`} className="text-foreground text-sm">
                Include Spot Overview
              </Label>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-pricing-sheet-${variant}`}
                  checked={includePricingSheet}
                  onCheckedChange={(checked) => setIncludePricingSheet(checked as boolean)}
                />
                <Label htmlFor={`include-pricing-sheet-${variant}`} className="text-foreground text-sm font-medium">
                  Include Pricing Sheet
                </Label>
              </div>
              
              {/* Pricing Sheet Type Radio Buttons - Show when Pricing Sheet is checked */}
              {includePricingSheet && (
                <div className="space-y-2 ml-6 border-l-2 border-border pl-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`pricing-sheet-marketplace-${variant}`}
                        name={`pricing-sheet-type-${variant}`}
                        value="marketplace"
                        checked={pricingSheetType === "marketplace"}
                        onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined" | "proOnly")}
                        disabled={!isMarketplacePricingAvailable}
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ${!isMarketplacePricingAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      <Label htmlFor={`pricing-sheet-marketplace-${variant}`} className={`text-foreground text-sm ${!isMarketplacePricingAvailable ? 'opacity-50' : ''}`}>
                        Marketplace Pricing Sheet
                        {!isMarketplacePricingAvailable && <span className="text-xs text-gray-500 ml-1">(Not available for this spend level)</span>}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`pricing-sheet-saas-${variant}`}
                        name={`pricing-sheet-type-${variant}`}
                        value="saas"
                        checked={pricingSheetType === "saas"}
                        onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined" | "proOnly")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <Label htmlFor={`pricing-sheet-saas-${variant}`} className="text-foreground text-sm">
                        Standard SaaS Pricing Sheet
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`pricing-sheet-both-${variant}`}
                        name={`pricing-sheet-type-${variant}`}
                        value="both"
                        checked={pricingSheetType === "both"}
                        onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined" | "proOnly")}
                        disabled={!isMarketplacePricingAvailable}
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ${!isMarketplacePricingAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      <Label htmlFor={`pricing-sheet-both-${variant}`} className={`text-foreground text-sm ${!isMarketplacePricingAvailable ? 'opacity-50' : ''}`}>
                        Both Pricing Sheets
                        {!isMarketplacePricingAvailable && <span className="text-xs text-gray-500 ml-1">(Not available for this spend level)</span>}
                      </Label>
                    </div>
<div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`pricing-sheet-combined-${variant}`}
                          name={`pricing-sheet-type-${variant}`}
                          value="combined"
                          checked={pricingSheetType === "combined"}
                          onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined" | "proOnly")}
                          disabled={!isMarketplacePricingAvailable}
                          className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ${!isMarketplacePricingAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <Label htmlFor={`pricing-sheet-combined-${variant}`} className={`text-foreground text-sm ${!isMarketplacePricingAvailable ? 'opacity-50' : ''}`}>
                          Combined Pricing Sheet
                          {!isMarketplacePricingAvailable && <span className="text-xs text-gray-500 ml-1">(Not available for this spend level)</span>}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`pricing-sheet-pro-only-${variant}`}
                          name={`pricing-sheet-type-${variant}`}
                          value="proOnly"
                          checked={pricingSheetType === "proOnly"}
                          onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined" | "proOnly")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor={`pricing-sheet-pro-only-${variant}`} className="text-foreground text-sm">
                          ProcureOS Pro Pricing Only
                        </Label>
                      </div>
                    </div>
                    
                    {/* Billing Cadence Selector */}
                    <div className="space-y-2 mt-3 pt-3 border-t border-border">
                      <Label className="text-xs font-medium text-foreground block mb-2">
                        Billing Cadence
                      </Label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`billing-cadence-month-docs-${variant}`}
                          name={`billing-cadence-docs-${variant}`}
                          value="month"
                          checked={billingCadence === "month"}
                          onChange={(e) => setBillingCadence(e.target.value as "month" | "year")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor={`billing-cadence-month-docs-${variant}`} className="text-foreground text-sm cursor-pointer">
                          Monthly
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`billing-cadence-year-docs-${variant}`}
                          name={`billing-cadence-docs-${variant}`}
                          value="year"
                          checked={billingCadence === "year"}
                          onChange={(e) => setBillingCadence(e.target.value as "month" | "year")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor={`billing-cadence-year-docs-${variant}`} className="text-foreground text-sm cursor-pointer">
                          Yearly
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Decks mode - new structure
          <>
            {/* Main deck files */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-title-${variant}`}
                  checked={includeTitle}
                  onCheckedChange={(checked) => setIncludeTitle(checked as boolean)}
                />
                <Label htmlFor={`include-title-${variant}`} className="text-foreground text-sm font-medium">
                  Title Slide
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-intro-${variant}`}
                  checked={includeIntro}
                  onCheckedChange={(checked) => setIncludeIntro(checked as boolean)}
                />
                <Label htmlFor={`include-intro-${variant}`} className="text-foreground text-sm font-medium">
                  Emerge Intro
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-problem-solution-${variant}`}
                  checked={includeProblemSolution}
                  onCheckedChange={(checked) => setIncludeProblemSolution(checked as boolean)}
                />
                <Label htmlFor={`include-problem-solution-${variant}`} className="text-foreground text-sm font-medium">
                  Problem & Solution
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-contract-overview-${variant}`}
                  checked={includeContractOverview}
                  onCheckedChange={(checked) => setIncludeContractOverview(checked as boolean)}
                />
                <Label htmlFor={`include-contract-overview-${variant}`} className="text-foreground text-sm font-medium">
                  Contract Overview
                </Label>
              </div>
              
              {/* Contract Detail Slides - Nested under Contract Overview */}
              {includeContractOverview && (
                <div className="space-y-2 ml-6 border-l-2 border-border pl-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 font-medium">Detail Slides</div>
                    <button
                      type="button"
                      onClick={() => setIsContractDetailsExpanded(!isContractDetailsExpanded)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {isContractDetailsExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  </div>
                  {isContractDetailsExpanded && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-contract-reporting-${variant}`}
                          checked={includeContractReporting}
                          onCheckedChange={(checked) => setIncludeContractReporting(checked as boolean)}
                        />
                        <Label htmlFor={`include-contract-reporting-${variant}`} className="text-foreground text-sm">
                          Reporting
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-contract-benchmarking-${variant}`}
                          checked={includeContractBenchmarking}
                          onCheckedChange={(checked) => setIncludeContractBenchmarking(checked as boolean)}
                        />
                        <Label htmlFor={`include-contract-benchmarking-${variant}`} className="text-foreground text-sm">
                          Benchmarking
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-contract-emerge-marketplace-${variant}`}
                          checked={includeContractEmergeMarketplace}
                          onCheckedChange={(checked) => setIncludeContractEmergeMarketplace(checked as boolean)}
                        />
                        <Label htmlFor={`include-contract-emerge-marketplace-${variant}`} className="text-foreground text-sm">
                          Emerge Marketplace
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-contract-vendor-engagement-${variant}`}
                          checked={includeContractVendorEngagement}
                          onCheckedChange={(checked) => setIncludeContractVendorEngagement(checked as boolean)}
                        />
                        <Label htmlFor={`include-contract-vendor-engagement-${variant}`} className="text-foreground text-sm">
                          Vendor Engagement
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-contract-spend-optimization-${variant}`}
                          checked={includeContractSpendOptimization}
                          onCheckedChange={(checked) => setIncludeContractSpendOptimization(checked as boolean)}
                        />
                        <Label htmlFor={`include-contract-spend-optimization-${variant}`} className="text-foreground text-sm">
                          Spend Optimization
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-contract-event-management-${variant}`}
                          checked={includeContractEventManagement}
                          onCheckedChange={(checked) => setIncludeContractEventManagement(checked as boolean)}
                        />
                        <Label htmlFor={`include-contract-event-management-${variant}`} className="text-foreground text-sm">
                          Event Management
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-spot-overview-${variant}`}
                  checked={includeSpotOverview}
                  onCheckedChange={(checked) => setIncludeSpotOverview(checked as boolean)}
                />
                <Label htmlFor={`include-spot-overview-${variant}`} className="text-foreground text-sm font-medium">
                  Spot Overview
                </Label>
              </div>
              
              {/* Spot Detail Slides - Nested under Spot Overview */}
              {includeSpotOverview && (
                <div className="space-y-2 ml-6 border-l-2 border-border pl-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 font-medium">Detail Slides</div>
                    <button
                      type="button"
                      onClick={() => setIsSpotDetailsExpanded(!isSpotDetailsExpanded)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {isSpotDetailsExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  </div>
                  {isSpotDetailsExpanded && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-spot-quote-creation-${variant}`}
                          checked={includeSpotQuoteCreation}
                          onCheckedChange={(checked) => setIncludeSpotQuoteCreation(checked as boolean)}
                        />
                        <Label htmlFor={`include-spot-quote-creation-${variant}`} className="text-foreground text-sm">
                          Quote Creation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-spot-rate-collection-${variant}`}
                          checked={includeSpotRateCollection}
                          onCheckedChange={(checked) => setIncludeSpotRateCollection(checked as boolean)}
                        />
                        <Label htmlFor={`include-spot-rate-collection-${variant}`} className="text-foreground text-sm">
                          Rate Collection
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-spot-benchmarking-${variant}`}
                          checked={includeSpotBenchmarking}
                          onCheckedChange={(checked) => setIncludeSpotBenchmarking(checked as boolean)}
                        />
                        <Label htmlFor={`include-spot-benchmarking-${variant}`} className="text-foreground text-sm">
                          Benchmarking
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-spot-tracking-${variant}`}
                          checked={includeSpotTracking}
                          onCheckedChange={(checked) => setIncludeSpotTracking(checked as boolean)}
                        />
                        <Label htmlFor={`include-spot-tracking-${variant}`} className="text-foreground text-sm">
                          Tracking
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-spot-reporting-${variant}`}
                          checked={includeSpotReporting}
                          onCheckedChange={(checked) => setIncludeSpotReporting(checked as boolean)}
                        />
                        <Label htmlFor={`include-spot-reporting-${variant}`} className="text-foreground text-sm">
                          Reporting
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-spot-vendor-engagement-${variant}`}
                          checked={includeSpotVendorEngagement}
                          onCheckedChange={(checked) => setIncludeSpotVendorEngagement(checked as boolean)}
                        />
                        <Label htmlFor={`include-spot-vendor-engagement-${variant}`} className="text-foreground text-sm">
                          Vendor Engagement
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-spot-emerge-marketplace-${variant}`}
                          checked={includeSpotEmergeMarketplace}
                          onCheckedChange={(checked) => setIncludeSpotEmergeMarketplace(checked as boolean)}
                        />
                        <Label htmlFor={`include-spot-emerge-marketplace-${variant}`} className="text-foreground text-sm">
                          Emerge Marketplace
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-integrations-${variant}`}
                  checked={includeIntegrations}
                  onCheckedChange={(checked) => {
                    console.log('Integrations checkbox changed:', checked)
                    setIncludeIntegrations(checked as boolean)
                  }}
                />
                <Label htmlFor={`include-integrations-${variant}`} className="text-foreground text-sm font-medium">
                  Integrations
                </Label>
              </div>
              
              {/* Integration Checkboxes - Show when Integrations is checked */}
              {includeIntegrations && (
                <div className="space-y-2 ml-6 border-l-2 border-border pl-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`integration-general-${variant}`}
                        checked={includeGeneralIntegration}
                        onCheckedChange={(checked) => setIncludeGeneralIntegration(checked as boolean)}
                      />
                      <Label htmlFor={`integration-general-${variant}`} className="text-foreground text-sm">
                        General
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`integration-mercury-gate-${variant}`}
                        checked={includeMercuryGateIntegration}
                        onCheckedChange={(checked) => setIncludeMercuryGateIntegration(checked as boolean)}
                      />
                      <Label htmlFor={`integration-mercury-gate-${variant}`} className="text-foreground text-sm">
                        Mercury Gate
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`integration-capacity-link-${variant}`}
                        checked={includeCapacityLinkIntegration}
                        onCheckedChange={(checked) => setIncludeCapacityLinkIntegration(checked as boolean)}
                      />
                      <Label htmlFor={`integration-capacity-link-${variant}`} className="text-foreground text-sm">
                        Capacity Link
                      </Label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-emerge-insights-${variant}`}
                  checked={includeEmergeInsights}
                  onCheckedChange={(checked) => setIncludeEmergeInsights(checked as boolean)}
                />
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`include-emerge-insights-${variant}`} className="text-foreground text-sm font-medium">
                    Emerge Insights
                  </Label>
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-medium">
                    In Alpha
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-rfp-feature-grid-${variant}`}
                  checked={includeRFPFeatureGrid}
                  onCheckedChange={(checked) => setIncludeRFPFeatureGrid(checked as boolean)}
                />
                <Label htmlFor={`include-rfp-feature-grid-${variant}`} className="text-foreground text-sm font-medium">
                  RFP Feature Grid
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`include-spot-feature-grid-${variant}`}
                  checked={includeSpotFeatureGrid}
                  onCheckedChange={(checked) => setIncludeSpotFeatureGrid(checked as boolean)}
                />
                <Label htmlFor={`include-spot-feature-grid-${variant}`} className="text-foreground text-sm font-medium">
                  Spot Feature Grid
                </Label>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`include-pricing-sheet-${variant}`}
                    checked={includePricingSheet}
                    onCheckedChange={(checked) => setIncludePricingSheet(checked as boolean)}
                  />
                  <Label htmlFor={`include-pricing-sheet-${variant}`} className="text-foreground text-sm font-medium">
                    Include Pricing Sheet
                  </Label>
                </div>
                
                {/* Pricing Sheet Type Radio Buttons - Show when Pricing Sheet is checked */}
                {includePricingSheet && (
                  <div className="space-y-2 ml-6 border-l-2 border-border pl-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`pricing-sheet-marketplace-${variant}`}
                          name={`pricing-sheet-type-${variant}`}
                          value="marketplace"
                          checked={pricingSheetType === "marketplace"}
                          onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined")}
                          disabled={!isMarketplacePricingAvailable}
                          className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ${!isMarketplacePricingAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <Label htmlFor={`pricing-sheet-marketplace-${variant}`} className={`text-foreground text-sm ${!isMarketplacePricingAvailable ? 'opacity-50' : ''}`}>
                          Marketplace Pricing Sheet
                          {!isMarketplacePricingAvailable && <span className="text-xs text-gray-500 ml-1">(Not available for this spend level)</span>}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`pricing-sheet-saas-${variant}`}
                          name={`pricing-sheet-type-${variant}`}
                          value="saas"
                          checked={pricingSheetType === "saas"}
                          onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor={`pricing-sheet-saas-${variant}`} className="text-foreground text-sm">
                          Standard SaaS Pricing Sheet
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`pricing-sheet-both-${variant}`}
                          name={`pricing-sheet-type-${variant}`}
                          value="both"
                          checked={pricingSheetType === "both"}
                          onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined" | "proOnly")}
                          disabled={!isMarketplacePricingAvailable}
                          className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ${!isMarketplacePricingAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <Label htmlFor={`pricing-sheet-both-${variant}`} className={`text-foreground text-sm ${!isMarketplacePricingAvailable ? 'opacity-50' : ''}`}>
                          Both Pricing Sheets
                          {!isMarketplacePricingAvailable && <span className="text-xs text-gray-500 ml-1">(Not available for this spend level)</span>}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`pricing-sheet-combined-${variant}`}
                          name={`pricing-sheet-type-${variant}`}
                          value="combined"
                          checked={pricingSheetType === "combined"}
                          onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined" | "proOnly")}
                          disabled={!isMarketplacePricingAvailable}
                          className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ${!isMarketplacePricingAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <Label htmlFor={`pricing-sheet-combined-${variant}`} className={`text-foreground text-sm ${!isMarketplacePricingAvailable ? 'opacity-50' : ''}`}>
                          Combined Pricing Sheet
                          {!isMarketplacePricingAvailable && <span className="text-xs text-gray-500 ml-1">(Not available for this spend level)</span>}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`pricing-sheet-pro-only-decks-${variant}`}
                          name={`pricing-sheet-type-${variant}`}
                          value="proOnly"
                          checked={pricingSheetType === "proOnly"}
                          onChange={(e) => setPricingSheetType(e.target.value as "marketplace" | "saas" | "both" | "combined" | "proOnly")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor={`pricing-sheet-pro-only-decks-${variant}`} className="text-foreground text-sm">
                          ProcureOS Pro Pricing Only
                        </Label>
                      </div>
                    </div>
                    
                    {/* Billing Cadence Selector */}
                    <div className="space-y-2 mt-3 pt-3 border-t border-border">
                      <Label className="text-xs font-medium text-foreground block mb-2">
                        Billing Cadence
                      </Label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`billing-cadence-month-${variant}`}
                            name={`billing-cadence-${variant}`}
                            value="month"
                            checked={billingCadence === "month"}
                            onChange={(e) => setBillingCadence(e.target.value as "month" | "year")}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <Label htmlFor={`billing-cadence-month-${variant}`} className="text-foreground text-sm cursor-pointer">
                            Monthly
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`billing-cadence-year-${variant}`}
                            name={`billing-cadence-${variant}`}
                            value="year"
                            checked={billingCadence === "year"}
                            onChange={(e) => setBillingCadence(e.target.value as "month" | "year")}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <Label htmlFor={`billing-cadence-year-${variant}`} className="text-foreground text-sm cursor-pointer">
                            Yearly
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Calculated Pricing Preview - Hide when custom pricing fields are visible */}
      {pricingInfo && 
       pricingInfo.marketplace.pro.price !== "Custom" && 
       pricingInfo.saas.core.price !== "Custom" && 
       pricingInfo.saas.pro.price !== "Custom" && (
        <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pricing Preview
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-[10px]">
              Auto-calculated
            </div>
          </div>
          
          {/* When Pro Only: cross out Core in preview */}
          {pricingSheetType === "proOnly" && (
            <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
              Pro only — Core not included in packet
            </p>
          )}
          
          {/* Marketplace Pricing */}
          {pricingInfo.marketplace.core.target > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Marketplace Pricing
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className={`p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 ${pricingSheetType === "proOnly" ? "opacity-60" : ""}`}>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">Core</div>
                  <div className={`font-semibold text-gray-900 dark:text-gray-100 ${pricingSheetType === "proOnly" ? "line-through" : ""}`}>
                    {pricingSheetType === "proOnly" ? "N/A" : "Free"}
                  </div>
                  {pricingSheetType !== "proOnly" && (
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Req. ${pricingInfo.marketplace.core.target.toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                  <div className="text-gray-500 dark:text-gray-400 text-xs">Pro Add-on</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {typeof pricingInfo.marketplace.pro.price === 'number' 
                      ? (() => {
                          if (billingCadence === "year") {
                            const discounted = pricingInfo.marketplace.pro.price * 12 * 0.875
                            const rounded = Math.floor(discounted / 100) * 100 - 1 // Round down to nearest 99
                            return `$${rounded.toLocaleString()}/yr`
                          }
                          return `$${pricingInfo.marketplace.pro.price.toLocaleString()}/mo`
                        })()
                      : pricingInfo.marketplace.pro.price}
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Req. ${pricingInfo.marketplace.pro.target.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* SaaS Pricing */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              SaaS Pricing
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className={`p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 ${pricingSheetType === "proOnly" ? "opacity-60" : ""}`}>
                <div className="text-gray-500 dark:text-gray-400 text-xs">Core</div>
                <div className={`font-semibold text-gray-900 dark:text-gray-100 ${pricingSheetType === "proOnly" ? "line-through" : ""}`}>
                  {pricingSheetType === "proOnly"
                    ? "N/A"
                    : typeof pricingInfo.saas.core.price === 'number'
                      ? (() => {
                          if (billingCadence === "year") {
                            const discounted = pricingInfo.saas.core.price * 12 * 0.875
                            const rounded = Math.floor(discounted / 100) * 100 - 1
                            return `$${rounded.toLocaleString()}/yr`
                          }
                          return `$${pricingInfo.saas.core.price.toLocaleString()}/mo`
                        })()
                      : pricingInfo.saas.core.price}
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                <div className="text-gray-500 dark:text-gray-400 text-xs">Pro</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {typeof pricingInfo.saas.pro.price === 'number'
                    ? (() => {
                        if (billingCadence === "year") {
                          const discounted = pricingInfo.saas.pro.price * 12 * 0.875
                          const rounded = Math.floor(discounted / 100) * 100 - 1 // Round down to nearest 99
                          return `$${rounded.toLocaleString()}/yr`
                        }
                        return `$${pricingInfo.saas.pro.price.toLocaleString()}/mo`
                      })()
                    : pricingInfo.saas.pro.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Pricing Fields */}
      {pricingInfo && (
        <div className="space-y-3">
          {/* Marketplace Target - only show if pricing is custom */}
          {pricingInfo.marketplace.pro.price === "Custom" && pricingInfo.marketplace.core.target > 0 && (
            <div className="space-y-1">
              <Label htmlFor={`custom-marketplace-target-${variant}`} className="text-xs font-medium text-orange-700 dark:text-orange-300">
                Marketplace Target Requirement
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`custom-marketplace-target-${variant}`}
                  type="number"
                  placeholder="250"
                  value={customPricing.marketplaceTarget}
                  onChange={(e) => setCustomPricing(prev => ({ ...prev, marketplaceTarget: e.target.value }))}
                  className="h-8 text-sm border-orange-300 dark:border-orange-600 flex-1"
                />
                <select
                  value={customPricing.marketplaceTargetUnit}
                  onChange={(e) => setCustomPricing(prev => ({ ...prev, marketplaceTargetUnit: e.target.value as "thousands" | "millions" | "billions" }))}
                  className="h-8 text-xs border-orange-300 dark:border-orange-600 bg-white dark:bg-gray-800 px-2 rounded"
                >
                  <option value="thousands">Thousands</option>
                  <option value="millions">Millions</option>
                  <option value="billions">Billions</option>
                </select>
              </div>
            </div>
          )}
          
          {pricingInfo.marketplace.pro.price === "Custom" && (
            <div className="space-y-1">
              <Label htmlFor={`custom-marketplace-pro-${variant}`} className="text-xs font-medium text-orange-700 dark:text-orange-300">
                Marketplace Pro Add-on ({billingCadence === "year" ? "Yearly" : "Monthly"})
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`custom-marketplace-pro-${variant}`}
                  type="number"
                  placeholder={billingCadence === "year" ? "Enter yearly price" : "Enter monthly price"}
                  value={customPricing.marketplacePro}
                  onChange={(e) => setCustomPricing(prev => ({ ...prev, marketplacePro: e.target.value }))}
                  className="h-8 text-sm border-orange-300 dark:border-orange-600"
                />
                <span className="text-xs text-orange-600 dark:text-orange-300">{billingCadence === "year" ? "/year" : "/month"}</span>
              </div>
              {billingCadence === "year" && customPricing.marketplacePro && (
                <p className="text-[10px] text-gray-500">Monthly equivalent: ${(Number(customPricing.marketplacePro) / 12).toFixed(2)}/month</p>
              )}
            </div>
          )}
         
          {pricingInfo.saas.core.price === "Custom" && (
            <div className="space-y-1">
              <Label htmlFor={`custom-saas-core-${variant}`} className="text-xs font-medium text-orange-700 dark:text-orange-300">
                SaaS Core ({billingCadence === "year" ? "Yearly" : "Monthly"})
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`custom-saas-core-${variant}`}
                  type="number"
                  placeholder={billingCadence === "year" ? "Enter yearly price" : "Enter monthly price"}
                  value={customPricing.saasCore}
                  onChange={(e) => setCustomPricing(prev => ({ ...prev, saasCore: e.target.value }))}
                  className="h-8 text-sm border-orange-300 dark:border-orange-600"
                />
                <span className="text-xs text-orange-600 dark:text-orange-300">{billingCadence === "year" ? "/year" : "/month"}</span>
              </div>
              {billingCadence === "year" && customPricing.saasCore && (
                <p className="text-[10px] text-gray-500">Monthly equivalent: ${(Number(customPricing.saasCore) / 12).toFixed(2)}/month</p>
              )}
            </div>
          )}
          
          {pricingInfo.saas.pro.price === "Custom" && (
            <div className="space-y-1">
              <Label htmlFor={`custom-saas-pro-${variant}`} className="text-xs font-medium text-orange-700 dark:text-orange-300">
                SaaS Pro ({billingCadence === "year" ? "Yearly" : "Monthly"})
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`custom-saas-pro-${variant}`}
                  type="number"
                  placeholder={billingCadence === "year" ? "Enter yearly price" : "Enter monthly price"}
                  value={customPricing.saasPro}
                  onChange={(e) => setCustomPricing(prev => ({ ...prev, saasPro: e.target.value }))}
                  className="h-8 text-sm border-orange-300 dark:border-orange-600"
                />
                <span className="text-xs text-orange-600 dark:text-orange-300">{billingCadence === "year" ? "/year" : "/month"}</span>
              </div>
              {billingCadence === "year" && customPricing.saasPro && (
                <p className="text-[10px] text-gray-500">Monthly equivalent: ${(Number(customPricing.saasPro) / 12).toFixed(2)}/month</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
