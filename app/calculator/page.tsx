"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download } from "lucide-react"
import { calculatePricing, convertVolumeToSpend } from "@/lib/pricing-calculator"
import { generateMarketplacePricingPDF, generateSaaSPricingPDF, downloadPDF } from "@/lib/pdf-utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingCalculator() {
  const [inputType, setInputType] = useState<"spend" | "volume">("spend")
  const [annualSpend, setAnnualSpend] = useState("")
  const [volume, setVolume] = useState("")
  const [frequency, setFrequency] = useState<"yearly" | "monthly" | "weekly" | "daily">("yearly")
  const [calculationResult, setCalculationResult] = useState<any>(null)
  const [isGeneratingPDFs, setIsGeneratingPDFs] = useState(false)
  const [generateMarketplacePDF, setGenerateMarketplacePDF] = useState(false)
  const [generateSaaSPDF, setGenerateSaaSPDF] = useState(false)

  // Function to check if marketplace pricing is available for the current spend/volume
  const isMarketplacePricingAvailable = () => {
    if (!calculationResult?.pricing) return false
    return (calculationResult.pricing.marketplace?.core?.target ?? 0) > 0
  }

  // Custom pricing state
  const [customPricing, setCustomPricing] = useState({
    marketplacePro: "",
    saasCore: "",
    saasPro: "",
    marketplaceTarget: "",
    marketplaceTargetUnit: "thousands" as "thousands" | "millions" | "billions"
  })

  const handleSpendCalculation = () => {
    const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
    if (spendValue > 0) {
      const result = calculatePricing(spendValue)
      setCalculationResult({ ...result, inputType: "spend", inputValue: spendValue })
    }
  }

  const handleVolumeCalculation = () => {
    const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0
    if (volumeValue > 0) {
      const annualVolume = calculateAnnualVolume(volumeValue, frequency)
      const estimatedSpend = convertVolumeToSpend(annualVolume)
      const result = calculatePricing(estimatedSpend)
      setCalculationResult({ ...result, inputType: "volume", inputValue: volumeValue, annualVolume, estimatedSpend })
    }
  }

  const handleCalculate = () => {
    if (inputType === "spend") {
      handleSpendCalculation()
    } else {
      handleVolumeCalculation()
    }
  }

  // Clear inputs and results when switching input types
  useEffect(() => {
    setAnnualSpend("")
    setVolume("")
    setCalculationResult(null)
    setCustomPricing({
      marketplacePro: "",
      saasCore: "",
      saasPro: "",
      marketplaceTarget: "",
      marketplaceTargetUnit: "thousands"
    })
  }, [inputType])

  // Function to convert marketplace target to dollars
  const convertMarketplaceTargetToDollars = (value: string, unit: string) => {
    const numValue = Number.parseFloat(value) || 0
    switch (unit) {
      case "thousands":
        return numValue * 1000
      case "millions":
        return numValue * 1000000
      case "billions":
        return numValue * 1000000000
      default:
        return numValue
    }
  }

  const handleGenerateSelectedPDFs = async () => {
    if (!calculationResult?.pricing) {
      console.error('No calculation result available')
      return
    }

    if (!generateMarketplacePDF && !generateSaaSPDF) {
      alert('Please select at least one PDF type to generate.')
      return
    }

    setIsGeneratingPDFs(true)
    
    try {
      const inputValue = calculationResult.inputType === "spend" 
        ? calculationResult.inputValue 
        : calculationResult.estimatedSpend
      
      // Generate Marketplace PDF if selected
      if (generateMarketplacePDF) {
        console.log('Starting Marketplace PDF generation...')
        
        const marketplaceTemplatePath = "/templates/Pricing Tool_Generic Marketplace Pricing Sheet (v0.2).pdf"
        let proMarketplaceFee: number
        if (calculationResult.pricing.marketplace.pro.price === "Custom") {
          proMarketplaceFee = customPricing.marketplacePro ? Number(customPricing.marketplacePro) : -1
        } else {
          proMarketplaceFee = calculationResult.pricing.marketplace.pro.price as number
        }
        
        // Use custom marketplace target if provided, otherwise use the calculated target
        let targetAmount: number
        if (customPricing.marketplaceTarget) {
          targetAmount = convertMarketplaceTargetToDollars(customPricing.marketplaceTarget, customPricing.marketplaceTargetUnit)
        } else {
          targetAmount = calculationResult.pricing.marketplace.core.target
        }
        
        const marketplacePdf = await generateMarketplacePricingPDF(
          marketplaceTemplatePath,
          proMarketplaceFee,
          targetAmount
        )
        
        const marketplaceFilename = `procureos-marketplace-pricing-${formatCurrency(inputValue).replace(/[^0-9]/g, '')}.pdf`
        downloadPDF(marketplacePdf, marketplaceFilename)
        
        console.log('✅ Marketplace PDF generated and downloaded successfully')
      }
      
      // Generate SaaS PDF if selected
      if (generateSaaSPDF) {
        console.log('Starting SaaS PDF generation...')
        
        // Use SaaS-only template when marketplace pricing is not available
        const saasTemplatePath = !isMarketplacePricingAvailable() 
          ? "/templates/Pricing Tool_Generic Pricing Sheet SaaS Only (v0.1).pdf"
          : "/templates/Pricing Tool_Generic Pricing Sheet (v0.1).pdf"
        let coreSaaSFee: number
        let proSaaSFee: number
        
        if (calculationResult.pricing.saas.core.price === "Custom") {
          coreSaaSFee = customPricing.saasCore ? Number(customPricing.saasCore) : -1
        } else {
          coreSaaSFee = calculationResult.pricing.saas.core.price as number
        }
        
        if (calculationResult.pricing.saas.pro.price === "Custom") {
          proSaaSFee = customPricing.saasPro ? Number(customPricing.saasPro) : -1
        } else {
          proSaaSFee = calculationResult.pricing.saas.pro.price as number
        }
        
        const saasPdf = await generateSaaSPricingPDF(
          saasTemplatePath,
          coreSaaSFee,
          proSaaSFee
        )
        
        const saasFilename = `procureos-saas-pricing-${formatCurrency(inputValue).replace(/[^0-9]/g, '')}.pdf`
        downloadPDF(saasPdf, saasFilename)
        
        console.log('✅ SaaS PDF generated and downloaded successfully')
      }
      
      console.log('✅ All selected PDFs generated and downloaded successfully')
      
    } catch (error) {
      console.error('❌ Error generating PDFs:', error)
      alert('Error generating PDFs. Please try again.')
    } finally {
      setIsGeneratingPDFs(false)
    }
  }

  const calculateAnnualVolume = (volume: number, frequency: string) => {
    switch (frequency) {
      case "yearly":
        return volume
      case "monthly":
        return volume * 12
      case "weekly":
        return volume * 52
      case "daily":
        return volume * 365
      default:
        return volume
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ProcureOS Pricing Calculator</h1>
          <p className="text-gray-600">Calculate pricing based on annual freight spend or volume</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Method</CardTitle>
                <CardDescription>Choose how you want to calculate pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={inputType} onValueChange={(value) => setInputType(value as "spend" | "volume")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="spend">Spend ($)</TabsTrigger>
                    <TabsTrigger value="volume">Volume</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="spend" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Annual Freight Spend</Label>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={annualSpend}
                        onChange={(e) => setAnnualSpend(e.target.value)}
                      />
                    </div>
                    {annualSpend && (
                      <p className="text-sm text-gray-500">
                        Annual spend: {formatCurrency(Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0)}
                      </p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="volume" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Volume</Label>
                      <Input
                        type="text"
                        placeholder="Enter volume"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                      >
                        <option value="yearly">Yearly</option>
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                      </select>
                    </div>
                    {volume && (
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Annual volume: {calculateAnnualVolume(Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0, frequency).toLocaleString()} truckloads</p>
                        <p>Estimated spend: {formatCurrency(convertVolumeToSpend(calculateAnnualVolume(Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0, frequency)))}</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
                
                <Button 
                  onClick={handleCalculate} 
                  disabled={inputType === "spend" ? !annualSpend : !volume}
                  className="w-full"
                >
                  Calculate
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {calculationResult?.error ? (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800">Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700">{calculationResult.error}</p>
                </CardContent>
              </Card>
            ) : calculationResult?.pricing ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Input Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Input Type:</strong> {calculationResult.inputType === "spend" ? "Annual Freight Spend" : "Volume"}</p>
                      <p><strong>Input Value:</strong> {calculationResult.inputType === "spend" 
                        ? formatCurrency(calculationResult.inputValue)
                        : `${calculationResult.inputValue.toLocaleString()} truckloads (${calculationResult.frequency})`
                      }</p>
                      {calculationResult.inputType === "volume" && (
                        <>
                          <p><strong>Annual Volume:</strong> {calculationResult.annualVolume.toLocaleString()} truckloads</p>
                          <p><strong>Estimated Annual Spend:</strong> {formatCurrency(calculationResult.estimatedSpend)}</p>
                        </>
                      )}
                      <p><strong>Pricing Tier:</strong> {formatCurrency(calculationResult.tier.annual_freight_spend)}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Marketplace Plan</CardTitle>
                    <CardDescription>Discounted pricing with freight spend commitment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4 bg-green-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-green-800">Core</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Free</Badge>
                      </div>
                      <p className="text-sm text-green-700">
                        {calculationResult.pricing.marketplace.core.description}
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Pro Add-on</h3>
                        <Badge variant="outline">
                          {calculationResult.pricing.marketplace.pro.price === "Custom" 
                            ? "Custom" 
                            : `$${calculationResult.pricing.marketplace.pro.price}/month`
                          }
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {calculationResult.pricing.marketplace.pro.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Standard SaaS Plan</CardTitle>
                    <CardDescription>Traditional SaaS pricing without marketplace commitment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Core</h3>
                        <Badge variant="outline">
                          {calculationResult.pricing.saas.core.price === "Custom" 
                            ? "Custom" 
                            : `$${calculationResult.pricing.saas.core.price}/month`
                          }
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {calculationResult.pricing.saas.core.description}
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Pro</h3>
                        <Badge variant="outline">
                          {calculationResult.pricing.saas.pro.price === "Custom" 
                            ? "Custom" 
                            : `$${calculationResult.pricing.saas.pro.price}/month`
                          }
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {calculationResult.pricing.saas.pro.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                                 {calculationResult.isCustomPricing && (
                   <Card className="border-orange-200 bg-orange-50">
                     <CardHeader>
                       <CardTitle className="text-orange-800">Custom Pricing</CardTitle>
                       <CardDescription>Enter your custom pricing values below</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                       {/* Marketplace Target - always show if marketplace pricing is selected */}
                       {calculationResult.pricing.marketplace.core.target > 0 && (
                         <div className="space-y-2">
                           <Label htmlFor="custom-marketplace-target" className="text-sm font-medium">
                             Marketplace Target Requirement
                           </Label>
                           <div className="flex items-center gap-2">
                             <Input
                               id="custom-marketplace-target"
                               type="number"
                               placeholder="250"
                               value={customPricing.marketplaceTarget}
                               onChange={(e) => setCustomPricing(prev => ({ ...prev, marketplaceTarget: e.target.value }))}
                               className="flex-1"
                             />
                             <select
                               value={customPricing.marketplaceTargetUnit}
                               onChange={(e) => setCustomPricing(prev => ({ ...prev, marketplaceTargetUnit: e.target.value as "thousands" | "millions" | "billions" }))}
                               className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                             >
                               <option value="thousands">Thousands</option>
                               <option value="millions">Millions</option>
                               <option value="billions">Billions</option>
                             </select>
                           </div>
                         </div>
                       )}
                       
                       {calculationResult.pricing.marketplace.pro.price === "Custom" && (
                         <div className="space-y-2">
                           <Label htmlFor="custom-marketplace-pro" className="text-sm font-medium">
                             Marketplace Pro Add-on (Monthly)
                           </Label>
                           <div className="flex items-center gap-2">
                             <Input
                               id="custom-marketplace-pro"
                               type="number"
                               placeholder="Enter price"
                               value={customPricing.marketplacePro}
                               onChange={(e) => setCustomPricing(prev => ({ ...prev, marketplacePro: e.target.value }))}
                               className="flex-1"
                             />
                             <span className="text-sm text-gray-500">/month</span>
                           </div>
                         </div>
                       )}
                       {calculationResult.pricing.saas.core.price === "Custom" && (
                         <div className="space-y-2">
                           <Label htmlFor="custom-saas-core" className="text-sm font-medium">
                             SaaS Core (Monthly)
                           </Label>
                           <div className="flex items-center gap-2">
                             <Input
                               id="custom-saas-core"
                               type="number"
                               placeholder="Enter price"
                               value={customPricing.saasCore}
                               onChange={(e) => setCustomPricing(prev => ({ ...prev, saasCore: e.target.value }))}
                               className="flex-1"
                             />
                             <span className="text-sm text-gray-500">/month</span>
                           </div>
                         </div>
                       )}
                       {calculationResult.pricing.saas.pro.price === "Custom" && (
                         <div className="space-y-2">
                           <Label htmlFor="custom-saas-pro" className="text-sm font-medium">
                             SaaS Pro (Monthly)
                           </Label>
                           <div className="flex items-center gap-2">
                             <Input
                               id="custom-saas-pro"
                               type="number"
                               placeholder="Enter price"
                               value={customPricing.saasPro}
                               onChange={(e) => setCustomPricing(prev => ({ ...prev, saasPro: e.target.value }))}
                               className="flex-1"
                             />
                             <span className="text-sm text-gray-500">/month</span>
                           </div>
                         </div>
                       )}
                     </CardContent>
                   </Card>
                 )}

                 {/* Generate PDF Section */}
                 <Card>
                   <CardHeader>
                     <CardTitle>Generate Pricing PDFs</CardTitle>
                     <CardDescription>Select which pricing sheets you'd like to generate</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                     {/* PDF Type Selection */}
                     <div className="space-y-3">
                       <div className="flex items-center space-x-2">
                         <Checkbox
                           id="generate-marketplace"
                           checked={generateMarketplacePDF}
                           onCheckedChange={(checked) => setGenerateMarketplacePDF(checked as boolean)}
                         />
                         <Label htmlFor="generate-marketplace" className="text-sm font-medium">
                           Marketplace Pricing Sheet
                         </Label>
                       </div>
                       {generateMarketplacePDF && calculationResult?.pricing && (
                         <div className="ml-6 text-sm text-gray-600">
                           Core = Free, Pro = ${calculationResult.pricing.marketplace.pro.price === "Custom" ? "Custom" : calculationResult.pricing.marketplace.pro.price}/month, 
                           requiring {calculationResult.pricing.marketplace.core.targetPercentage}% marketplace commitment.
                         </div>
                       )}
                       
                       <div className="flex items-center space-x-2">
                         <Checkbox
                           id="generate-saas"
                           checked={generateSaaSPDF}
                           onCheckedChange={(checked) => setGenerateSaaSPDF(checked as boolean)}
                         />
                         <Label htmlFor="generate-saas" className="text-sm font-medium">
                           Standard SaaS Pricing Sheet
                         </Label>
                       </div>
                       {generateSaaSPDF && calculationResult?.pricing && (
                         <div className="ml-6 text-sm text-gray-600">
                           Core = ${calculationResult.pricing.saas.core.price === "Custom" ? "Custom" : calculationResult.pricing.saas.core.price}/month, 
                           Pro = ${calculationResult.pricing.saas.pro.price === "Custom" ? "Custom" : calculationResult.pricing.saas.pro.price}/month
                         </div>
                       )}
                     </div>
                     
                     {/* Generate Button */}
                     <Button 
                       onClick={handleGenerateSelectedPDFs} 
                       disabled={isGeneratingPDFs || !calculationResult?.pricing || (!generateMarketplacePDF && !generateSaaSPDF)}
                       className="w-full"
                     >
                       <Download className="w-4 h-4 mr-2" />
                       {isGeneratingPDFs ? 'Generating PDFs...' : 'Generate Selected PDFs'}
                     </Button>
                     
                     {calculationResult?.pricing && (
                       <p className="text-sm text-gray-500">
                         Select one or both PDF types to generate customized pricing sheets.
                       </p>
                     )}
                   </CardContent>
                 </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-8">
                    Enter your annual freight spend or volume to see pricing calculations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
