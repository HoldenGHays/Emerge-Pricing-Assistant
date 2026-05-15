"use client"

// Main ProcureOS Pricing Tool — handles pricing calculations, PDF generation, and document combination
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download } from "lucide-react"
import { combinePricingWithAdditionalPDFs, combinePDFs, downloadPDF, generatePricingPDFFromTemplate, generateMarketplacePricingPDF, generateSaaSPricingPDF, generateCombinedPricingPDF, generateProOnlyPricingPDF } from "@/lib/pdf-utils"
import { calculatePricing, convertVolumeToSpend } from "@/lib/pricing-calculator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MasterControls } from "@/components/shared/master-controls"
import { ToolbarHeader } from "@/components/shared/toolbar-header"
import { useHeader } from "@/components/header-context"

export default function ProcureOSPricingTool() {
  // Get header context for managing secondary header and controls
  const { setShowSecondaryHeader, isControlsOpen, setIsControlsOpen, setOnBack, setOnDownload } = useHeader()
  const [phase, setPhase] = useState<"welcome" | "pricing" | "too-low">("welcome")
  const [inputType, setInputType] = useState<"spend" | "volume">("spend")
  const [annualSpend, setAnnualSpend] = useState("")
  const [spendUnit, setSpendUnit] = useState<"thousands" | "millions" | "billions">("millions")
  const [volume, setVolume] = useState("")
  const [frequency, setFrequency] = useState<"yearly" | "quarterly" | "monthly" | "weekly" | "daily">("monthly")
  const [documentType, setDocumentType] = useState<"docs" | "decks">("decks")
  // Main deck checkboxes (default ON)
  const [includeTitle, setIncludeTitle] = useState(true)
  const [includeIntro, setIncludeIntro] = useState(true)
  const [includeProblemSolution, setIncludeProblemSolution] = useState(true)
  const [includeContractOverview, setIncludeContractOverview] = useState(true)
  const [includeSpotOverview, setIncludeSpotOverview] = useState(true)
  const [includeEmergeInsights, setIncludeEmergeInsights] = useState(false)
  
  // Feature grid checkboxes (default OFF)
  const [includeRFPFeatureGrid, setIncludeRFPFeatureGrid] = useState(false)
  const [includeSpotFeatureGrid, setIncludeSpotFeatureGrid] = useState(false)
  
  // Spot detail checkboxes (default OFF)
  const [includeSpotQuoteCreation, setIncludeSpotQuoteCreation] = useState(false)
  const [includeSpotRateCollection, setIncludeSpotRateCollection] = useState(false)
  const [includeSpotBenchmarking, setIncludeSpotBenchmarking] = useState(false)
  const [includeSpotTracking, setIncludeSpotTracking] = useState(false)
  const [includeSpotReporting, setIncludeSpotReporting] = useState(false)
  const [includeSpotVendorEngagement, setIncludeSpotVendorEngagement] = useState(false)
  const [includeSpotEmergeMarketplace, setIncludeSpotEmergeMarketplace] = useState(false)
  
  // Contract detail checkboxes (default OFF)
  const [includeContractReporting, setIncludeContractReporting] = useState(false)
  const [includeContractBenchmarking, setIncludeContractBenchmarking] = useState(false)
  const [includeContractEmergeMarketplace, setIncludeContractEmergeMarketplace] = useState(false)
  const [includeContractVendorEngagement, setIncludeContractVendorEngagement] = useState(false)
  const [includeContractSpendOptimization, setIncludeContractSpendOptimization] = useState(false)
  const [includeContractEventManagement, setIncludeContractEventManagement] = useState(false)
  
  // Integration checkboxes (default OFF)
  const [includeIntegrations, setIncludeIntegrations] = useState(false)
  const [includeGeneralIntegration, setIncludeGeneralIntegration] = useState(false)
  const [includeMercuryGateIntegration, setIncludeMercuryGateIntegration] = useState(false)
  const [includeCapacityLinkIntegration, setIncludeCapacityLinkIntegration] = useState(false)
  
  // Docs mode checkboxes (for backward compatibility)
  const [includeRFP, setIncludeRFP] = useState(true)
  const [includeSpot, setIncludeSpot] = useState(true)
  
  const [error, setError] = useState("")
  const [combinedPdfUrl, setCombinedPdfUrl] = useState<string>("")
  const [isLoadingCombined, setIsLoadingCombined] = useState(false)
  const [isSpotDetailsExpanded, setIsSpotDetailsExpanded] = useState(false)
  const [isContractDetailsExpanded, setIsContractDetailsExpanded] = useState(false)
  const [isIntegrationsExpanded, setIsIntegrationsExpanded] = useState(false)
  const [pdfUpdateCounter, setPdfUpdateCounter] = useState(0)
  const [includePricingSheet, setIncludePricingSheet] = useState(true)
  const [pricingSheetType, setPricingSheetType] = useState<"marketplace" | "saas" | "both" | "combined" | "proOnly">("marketplace")
  const [billingCadence, setBillingCadence] = useState<"month" | "year">("month")

  // Custom pricing state
  const [customPricing, setCustomPricing] = useState({
    marketplacePro: "",
    saasCore: "",
    saasPro: "",
    marketplaceTarget: "",
    marketplaceTargetUnit: "thousands" as "thousands" | "millions" | "billions"
  })

  // Clear inputs when switching input types
  useEffect(() => {
    setAnnualSpend("")
    setVolume("")
    setError("")
    setCustomPricing({
      marketplacePro: "",
      saasCore: "",
      saasPro: "",
      marketplaceTarget: "",
      marketplaceTargetUnit: "thousands"
    })
    setIncludePricingSheet(true)
    setPricingSheetType("marketplace")
    setBillingCadence("month")
  }, [inputType])

  // Effect to automatically switch to SaaS pricing when marketplace is not available
  useEffect(() => {
    if (includePricingSheet && !isMarketplacePricingAvailable()) {
      // If marketplace pricing is not available and user has selected marketplace, both, or combined,
      // automatically switch to SaaS pricing
      if (pricingSheetType === "marketplace" || pricingSheetType === "both" || pricingSheetType === "combined") {
        setPricingSheetType("saas")
      }
      // proOnly is valid at any spend level; don't switch it
    }
  }, [annualSpend, volume, spendUnit, frequency, inputType, includePricingSheet, pricingSheetType])

  // Show/hide secondary header based on phase
  useEffect(() => {
    setShowSecondaryHeader(phase === "pricing")
  }, [phase, setShowSecondaryHeader])

  // Set handlers for secondary header buttons when in pricing phase
  useEffect(() => {
    if (phase === "pricing") {
      setOnBack(() => handleBack)
      setOnDownload(() => handlePricingDownload)
    } else {
      setOnBack(undefined)
      setOnDownload(undefined)
    }
  }, [phase, setOnBack, setOnDownload])

  // Function to check if custom pricing is needed
  const isCustomPricingNeeded = () => {
    const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
    const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0
    
    if (inputType === "spend" && spendValue > 0) {
      const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
      const pricingResult = calculatePricing(spendInDollars)
      return pricingResult.isCustomPricing
    } else if (inputType === "volume" && volumeValue > 0) {
      const annualVolume = calculateAnnualVolume(volumeValue, frequency)
      const estimatedSpend = annualVolume * 1700
      const pricingResult = calculatePricing(estimatedSpend)
      return pricingResult.isCustomPricing
    }
    return false
  }

  // Function to check if marketplace pricing is available for the current spend/volume
  const isMarketplacePricingAvailable = () => {
    const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
    const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0
    
    if (inputType === "spend" && spendValue > 0) {
      const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
      const pricingResult = calculatePricing(spendInDollars)
      return (pricingResult.pricing?.marketplace?.core?.target ?? 0) > 0
    } else if (inputType === "volume" && volumeValue > 0) {
      const annualVolume = calculateAnnualVolume(volumeValue, frequency)
      const estimatedSpend = annualVolume * 1700
      const pricingResult = calculatePricing(estimatedSpend)
      return (pricingResult.pricing?.marketplace?.core?.target ?? 0) > 0
    }
    return false
  }

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

  // Get PDF paths based on document type
  const getPdfPaths = () => {
    if (documentType === "docs") {
      return {
        intro: "/PDF/Docs/ProcureOS Overview.pdf",
        rfp: "/PDF/Docs/RFP Overview.pdf", 
        spot: "/PDF/Docs/Spot Overview.pdf",
        // Add empty strings for deck properties to satisfy TypeScript
        title: "",
        problemSolution: "",
        contractOverview: "",
        spotOverview: "",
        emergeInsights: "",
        spotQuoteCreation: "",
        spotRateCollection: "",
        spotBenchmarking: "",
        spotTracking: "",
        spotReporting: "",
        spotVendorEngagement: "",
        spotEmergeMarketplace: "",
        contractReporting: "",
        contractBenchmarking: "",
        contractEmergeMarketplace: "",
        contractVendorEngagement: "",
        contractSpendOptimization: "",
        contractEventManagement: "",
        integrations: "",
        mercuryGate: "",
        capacityLink: "",
        rfpFeatureGrid: "",
        spotFeatureGrid: ""
      }
    } else {
      return {
        // Main deck files
        title: "/PDF/Decks/A - Title.pdf",
        intro: "/PDF/Decks/B - Emerge Intro.pdf",
        problemSolution: "/PDF/Decks/C - Problem Solution.pdf",
        contractOverview: "/PDF/Decks/D.1 - Product Overview - Contract.pdf",
        spotOverview: "/PDF/Decks/D.2 - Product Overview - Spot.pdf",
        emergeInsights: "/PDF/Decks/D.3 - Product Overview - Emerge Insights.pdf",
        
        // Spot detail files
        spotQuoteCreation: "/PDF/Decks/Spot Details/Spot Detail - Quote Creation.pdf",
        spotRateCollection: "/PDF/Decks/Spot Details/Spot Detail - Rate Collection.pdf",
        spotBenchmarking: "/PDF/Decks/Spot Details/Spot Detail - Benchmarking.pdf",
        spotTracking: "/PDF/Decks/Spot Details/Spot Detail - Tracking.pdf",
        spotReporting: "/PDF/Decks/Spot Details/Spot Detail - Reporting.pdf",
        spotVendorEngagement: "/PDF/Decks/Spot Details/Spot Detail - Vendor Engagement.pdf",
        spotEmergeMarketplace: "/PDF/Decks/Spot Details/Spot Detail - Emerge Marketplace.pdf",
        
        // Contract detail files
        contractReporting: "/PDF/Decks/Contract Details/Contract Detail - Reporting.pdf",
        contractBenchmarking: "/PDF/Decks/Contract Details/Contract Detail - Benchmarking.pdf",
        contractEmergeMarketplace: "/PDF/Decks/Contract Details/Contract Detail - Emerge Marketplace.pdf",
        contractVendorEngagement: "/PDF/Decks/Contract Details/Contract Detail - Vendor Engagement.pdf",
        contractSpendOptimization: "/PDF/Decks/Contract Details/Contract Detail - Spend Optimization.pdf",
        contractEventManagement: "/PDF/Decks/Contract Details/Contract Detail - Event Management.pdf",
        
        // Integration files
        integrations: "/PDF/Decks/Integrations/Integration - General.pdf",
        mercuryGate: "/PDF/Decks/Integrations/Integrations - Mercury Gate.pdf",
        capacityLink: "/PDF/Decks/Integrations/Integration - Capacity Link.pdf",
        
        // Feature grid files
        rfpFeatureGrid: "/PDF/Decks/E.1 - RFP Feature Grid.pdf",
        spotFeatureGrid: "/PDF/Decks/E.2 - Spot Feature Grid.pdf",
        
        // Add empty strings for docs properties to satisfy TypeScript
        rfp: "",
        spot: ""
      }
    }
  }

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (combinedPdfUrl) {
        URL.revokeObjectURL(combinedPdfUrl)
      }
    }
  }, [combinedPdfUrl])



  // Effect to generate combined PDF when checkbox changes (only in pricing phase)
  useEffect(() => {
    const generatePDF = async () => {
      console.log('=== PDF COMBINATION EFFECT TRIGGERED ===')
      console.log('Phase:', phase)
      console.log('All checkbox states:', {
        includeTitle, includeIntro, includeProblemSolution, includeContractOverview,
        includeSpotOverview, includeEmergeInsights, includeSpotQuoteCreation, 
        includeSpotRateCollection, includeSpotBenchmarking, includeSpotTracking, 
        includeSpotReporting, includeSpotVendorEngagement, includeContractReporting, 
        includeContractBenchmarking, includeContractEmergeMarketplace, 
        includeContractVendorEngagement, includeContractSpendOptimization, 
        includeContractEventManagement, includeIntegrations, includeGeneralIntegration, includeMercuryGateIntegration, includeCapacityLinkIntegration
      })
      
      const hasAdditionalPdfs = includeTitle || includeIntro || includeProblemSolution || includeContractOverview || includeSpotOverview || includeEmergeInsights || includeSpotQuoteCreation || includeSpotRateCollection || includeSpotBenchmarking || includeSpotTracking || includeSpotReporting || includeSpotVendorEngagement || includeSpotEmergeMarketplace || includeContractReporting || includeContractBenchmarking || includeContractEmergeMarketplace || includeContractVendorEngagement || includeContractSpendOptimization || includeContractEventManagement || includeIntegrations
      
      console.log('Has additional PDFs:', hasAdditionalPdfs)
      
      if (phase === "pricing" && hasAdditionalPdfs) {
        const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
        const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0
        
        let pdfUrl = ""
        
        // Determine which method to use based on what was provided
        if (annualSpend.trim() && !isNaN(spendValue) && spendValue > 0) {
          const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
          // Use dynamic pricing generation instead of static PDFs
          const dynamicPricingPdfs = await generateDynamicPricingPDFs(Number(spendInDollars))
          if (dynamicPricingPdfs.length > 0) {
            // If we have multiple pricing PDFs, combine them first
            if (dynamicPricingPdfs.length > 1) {
              // Convert blob URLs back to ArrayBuffers for combination
              const pricingBuffers = await Promise.all(
                dynamicPricingPdfs.map(url => fetch(url).then(res => res.arrayBuffer()))
              )
              const combinedPricingBlob = await combinePDFs(pricingBuffers, "combined-pricing.pdf")
              pdfUrl = URL.createObjectURL(combinedPricingBlob)
            } else {
              pdfUrl = dynamicPricingPdfs[0] // Use single generated PDF for preview
            }
          } else {
            pdfUrl = getPdfUrl(spendInDollars) // Fallback to static PDF
          }
        } else if (volume.trim() && !isNaN(volumeValue) && volumeValue > 0) {
          const annualVolume = calculateAnnualVolume(volumeValue, frequency)
          // For volume-based calculations, convert to spend equivalent and use dynamic pricing
          const estimatedSpend = annualVolume * 1700 // Rough estimate: $1700 per truckload
          const dynamicPricingPdfs = await generateDynamicPricingPDFs(Number(estimatedSpend))
          if (dynamicPricingPdfs.length > 0) {
            // If we have multiple pricing PDFs, combine them first
            if (dynamicPricingPdfs.length > 1) {
              // Convert blob URLs back to ArrayBuffers for combination
              const pricingBuffers = await Promise.all(
                dynamicPricingPdfs.map(url => fetch(url).then(res => res.arrayBuffer()))
              )
              const combinedPricingBlob = await combinePDFs(pricingBuffers, "combined-pricing.pdf")
              pdfUrl = URL.createObjectURL(combinedPricingBlob)
            } else {
              pdfUrl = dynamicPricingPdfs[0] // Use single generated PDF for preview
            }
          } else {
            pdfUrl = getPdfUrlByVolume(annualVolume) // Fallback to static PDF
          }
        }

              if (pdfUrl) {
          console.log('Starting PDF combination for preview...', pdfUrl)
          setIsLoadingCombined(true)
          
          // Add a timeout to prevent infinite loading
          const timeoutId = setTimeout(() => {
            console.error('PDF combination timed out')
            setIsLoadingCombined(false)
            setCombinedPdfUrl("")
          }, 10000) // 10 second timeout

          // Build array of additional PDFs to include using dynamic paths
          const pdfPaths = getPdfPaths()
          const additionalPdfs: string[] = []
          
          console.log('Document type:', documentType)
          console.log('PDF paths:', pdfPaths)
          console.log('Checkbox states:', {
            includeTitle, includeIntro, includeProblemSolution, includeContractOverview,
            includeSpotOverview, includeEmergeInsights, includeIntegrations, includeGeneralIntegration, includeMercuryGateIntegration, includeCapacityLinkIntegration
          })
          
          if (documentType === "decks") {
            // Add main deck files in order
            if (includeTitle && pdfPaths.title && pdfPaths.title !== "") {
              console.log('Adding title:', pdfPaths.title)
              additionalPdfs.push(pdfPaths.title)
            }
            if (includeIntro && pdfPaths.intro && pdfPaths.intro !== "") {
              console.log('Adding intro:', pdfPaths.intro)
              additionalPdfs.push(pdfPaths.intro)
            }
            if (includeProblemSolution && pdfPaths.problemSolution && pdfPaths.problemSolution !== "") {
              console.log('Adding problem solution:', pdfPaths.problemSolution)
              additionalPdfs.push(pdfPaths.problemSolution)
            }
            if (includeContractOverview && pdfPaths.contractOverview && pdfPaths.contractOverview !== "") {
              console.log('Adding contract overview:', pdfPaths.contractOverview)
              additionalPdfs.push(pdfPaths.contractOverview)
            }
            
            // Add contract detail files after contract overview
            if (includeContractReporting && pdfPaths.contractReporting && pdfPaths.contractReporting !== "") additionalPdfs.push(pdfPaths.contractReporting)
            if (includeContractBenchmarking && pdfPaths.contractBenchmarking && pdfPaths.contractBenchmarking !== "") additionalPdfs.push(pdfPaths.contractBenchmarking)
            if (includeContractEmergeMarketplace && pdfPaths.contractEmergeMarketplace && pdfPaths.contractEmergeMarketplace !== "") additionalPdfs.push(pdfPaths.contractEmergeMarketplace)
            if (includeContractVendorEngagement && pdfPaths.contractVendorEngagement && pdfPaths.contractVendorEngagement !== "") additionalPdfs.push(pdfPaths.contractVendorEngagement)
            if (includeContractSpendOptimization && pdfPaths.contractSpendOptimization && pdfPaths.contractSpendOptimization !== "") additionalPdfs.push(pdfPaths.contractSpendOptimization)
            if (includeContractEventManagement && pdfPaths.contractEventManagement && pdfPaths.contractEventManagement !== "") additionalPdfs.push(pdfPaths.contractEventManagement)
            
            if (includeSpotOverview && pdfPaths.spotOverview && pdfPaths.spotOverview !== "") {
              console.log('Adding spot overview:', pdfPaths.spotOverview)
              additionalPdfs.push(pdfPaths.spotOverview)
            }
            
            // Add spot detail files after spot overview
            if (includeSpotQuoteCreation && pdfPaths.spotQuoteCreation && pdfPaths.spotQuoteCreation !== "") additionalPdfs.push(pdfPaths.spotQuoteCreation)
            if (includeSpotRateCollection && pdfPaths.spotRateCollection && pdfPaths.spotRateCollection !== "") additionalPdfs.push(pdfPaths.spotRateCollection)
            if (includeSpotBenchmarking && pdfPaths.spotBenchmarking && pdfPaths.spotBenchmarking !== "") additionalPdfs.push(pdfPaths.spotBenchmarking)
            if (includeSpotTracking && pdfPaths.spotTracking && pdfPaths.spotTracking !== "") additionalPdfs.push(pdfPaths.spotTracking)
            if (includeSpotReporting && pdfPaths.spotReporting && pdfPaths.spotReporting !== "") additionalPdfs.push(pdfPaths.spotReporting)
            if (includeSpotVendorEngagement && pdfPaths.spotVendorEngagement && pdfPaths.spotVendorEngagement !== "") additionalPdfs.push(pdfPaths.spotVendorEngagement)
            if (includeSpotEmergeMarketplace && pdfPaths.spotEmergeMarketplace && pdfPaths.spotEmergeMarketplace !== "") additionalPdfs.push(pdfPaths.spotEmergeMarketplace)
            
            // Add emerge insights at the end
            if (includeEmergeInsights && pdfPaths.emergeInsights && pdfPaths.emergeInsights !== "") {
              console.log('Adding emerge insights:', pdfPaths.emergeInsights)
              additionalPdfs.push(pdfPaths.emergeInsights)
            }
            
            // Add feature grids after emerge insights
            if (includeRFPFeatureGrid && pdfPaths.rfpFeatureGrid && pdfPaths.rfpFeatureGrid !== "") {
              console.log('Adding RFP feature grid:', pdfPaths.rfpFeatureGrid)
              additionalPdfs.push(pdfPaths.rfpFeatureGrid)
            }
            if (includeSpotFeatureGrid && pdfPaths.spotFeatureGrid && pdfPaths.spotFeatureGrid !== "") {
              console.log('Adding spot feature grid:', pdfPaths.spotFeatureGrid)
              additionalPdfs.push(pdfPaths.spotFeatureGrid)
            }
            
            // Add integrations at the end
            if (includeIntegrations) {
              if (includeGeneralIntegration && pdfPaths.integrations && pdfPaths.integrations !== "") {
                console.log('Adding general integration:', pdfPaths.integrations)
                additionalPdfs.push(pdfPaths.integrations)
              }
              if (includeMercuryGateIntegration && pdfPaths.mercuryGate && pdfPaths.mercuryGate !== "") {
                console.log('Adding Mercury Gate integration:', pdfPaths.mercuryGate)
                additionalPdfs.push(pdfPaths.mercuryGate)
              }
              if (includeCapacityLinkIntegration && pdfPaths.capacityLink && pdfPaths.capacityLink !== "") {
                console.log('Adding Capacity Link integration:', pdfPaths.capacityLink)
                additionalPdfs.push(pdfPaths.capacityLink)
              }
            }
          } else {
            // Docs mode - use original logic
            if (includeIntro && pdfPaths.intro && pdfPaths.intro !== "") {
              console.log('Adding docs intro:', pdfPaths.intro)
              additionalPdfs.push(pdfPaths.intro)
            }
            if (includeRFP && pdfPaths.rfp && pdfPaths.rfp !== "") {
              console.log('Adding docs RFP:', pdfPaths.rfp)
              additionalPdfs.push(pdfPaths.rfp)
            }
            if (includeSpot && pdfPaths.spot && pdfPaths.spot !== "") {
              console.log('Adding docs spot:', pdfPaths.spot)
              additionalPdfs.push(pdfPaths.spot)
            }
          }
          
          console.log('Additional PDFs to combine:', additionalPdfs)
          console.log('Pricing PDF URL:', pdfUrl)
                     const hasPricingSheets = includePricingSheet
  console.log('Include pricing sheets:', { includePricingSheet, pricingSheetType, hasPricingSheets })
         
         const pdfPromise = hasPricingSheets 
            ? combinePricingWithAdditionalPDFs(pdfUrl, additionalPdfs, "procureos-pricing-combined.pdf")
            : (async () => {
                // Fetch all PDFs as ArrayBuffers
                const pdfBuffers = await Promise.all(
                  additionalPdfs.map(url => fetch(url).then(res => res.arrayBuffer()))
                )
                return combinePDFs(pdfBuffers, "procureos-combined.pdf")
              })()
          
          pdfPromise
            .then((blob: Blob) => {
              clearTimeout(timeoutId)
              console.log('PDF combination successful, creating blob URL...')
              const url = URL.createObjectURL(blob)
              setCombinedPdfUrl(url)
              setPdfUpdateCounter(prev => prev + 1)
              setIsLoadingCombined(false)
            })
            .catch((error: any) => {
              clearTimeout(timeoutId)
              console.error('Error creating combined PDF preview:', error)
              setIsLoadingCombined(false)
              // Fallback to showing just the pricing PDF
              setCombinedPdfUrl("")
            })
        } else {
          console.log('No PDF URL available for combination')
          setIsLoadingCombined(false)
        }
      } else {
        // Clean up the blob URL when not needed
        if (combinedPdfUrl) {
          console.log('Cleaning up combined PDF URL')
          URL.revokeObjectURL(combinedPdfUrl)
          setCombinedPdfUrl("")
        }
        setIsLoadingCombined(false)
        console.log('=== PDF COMBINATION EFFECT: No additional PDFs or not in pricing phase ===')
      }
    }

         // Call the async function
     generatePDF()
       }, [phase, includeTitle, includeIntro, includeProblemSolution, includeContractOverview, includeSpotOverview, includeEmergeInsights, includeRFPFeatureGrid, includeSpotFeatureGrid, includeSpotQuoteCreation, includeSpotRateCollection, includeSpotBenchmarking, includeSpotTracking, includeSpotReporting, includeSpotVendorEngagement, includeSpotEmergeMarketplace, includeContractReporting, includeContractBenchmarking, includeContractEmergeMarketplace, includeContractVendorEngagement, includeContractSpendOptimization, includeContractEventManagement, includeIntegrations, includeGeneralIntegration, includeMercuryGateIntegration, includeCapacityLinkIntegration, documentType, annualSpend, volume, spendUnit, frequency, includeRFP, includeSpot, includePricingSheet, pricingSheetType, billingCadence, customPricing])

  const formatCurrency = (value: string) => {
    // Remove all non-numeric characters except decimal
    const numericValue = value.replace(/[^0-9.]/g, "")
    
    // If empty, return empty string
    if (!numericValue) return ""
    
    // Convert to number and format with commas
    const number = parseFloat(numericValue)
    if (isNaN(number)) return ""
    
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = formatCurrency(value)
    setAnnualSpend(formattedValue)
    if (error) setError("")
  }



  const calculateAnnualVolume = (volumeValue: number, freq: string) => {
    switch (freq) {
      case "yearly":
        return volumeValue
      case "quarterly":
        return volumeValue * 4
      case "monthly":
        return volumeValue * 12
      case "weekly":
        return volumeValue * 52
      case "daily":
        return volumeValue * 365
      default:
        return volumeValue
    }
  }

  const convertSpendToDollars = (spendValue: number, unit: string) => {
    switch (unit) {
      case "thousands":
        return spendValue * 1000
      case "millions":
        return spendValue * 1000000
      case "billions":
        return spendValue * 1000000000
      default:
        return spendValue
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers
    const numericValue = value.replace(/[^0-9.]/g, "")
    setVolume(numericValue)
    if (error) setError("")
  }

  const handleNext = () => {
    if (inputType === "spend") {
      const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, ""))
      const hasSpend = annualSpend.trim() && !isNaN(spendValue) && spendValue > 0

      if (!hasSpend) {
        setError("Please enter annual freight spend")
        return
      }

      const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
      if (spendInDollars < 250000) {
        setError("")
        setPhase("too-low")
        return
      }
    } else {
      const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, ""))
      const hasVolume = volume.trim() && !isNaN(volumeValue) && volumeValue > 0

      if (!hasVolume) {
        setError("Please enter volume")
        return
      }

      const annualVolume = calculateAnnualVolume(volumeValue, frequency)
      if (annualVolume < 139) {
        setError("")
        setPhase("too-low")
        return
      }
    }

    setError("")
    setPhase("pricing")
  }

  const handleBack = () => {
    setPhase("welcome")
    setError("")
    setCustomPricing({
      marketplacePro: "",
      saasCore: "",
      saasPro: "",
      marketplaceTarget: "",
      marketplaceTargetUnit: "thousands"
    })
  }

  const getPdfUrl = (spendValue: number) => {
    const basePath = documentType === "docs" ? "/PDF/Docs/Pricing Sheet" : "/PDF/Decks/Pricing Sheet"
    
    if (spendValue >= 250000 && spendValue < 10000000) {
      return `${basePath}/$250,000.pdf`
    } else if (spendValue >= 10000000 && spendValue < 25000000) {
      return `${basePath}/$10,000,000.pdf`
    } else if (spendValue >= 25000000 && spendValue < 50000000) {
      return `${basePath}/$25,000,000.pdf`
    } else if (spendValue >= 50000000 && spendValue < 75000000) {
      return `${basePath}/$50,000,000.pdf`
    } else if (spendValue >= 75000000 && spendValue < 100000000) {
      return `${basePath}/$75,000,000.pdf`
    } else if (spendValue >= 100000000 && spendValue < 250000000) {
      return `${basePath}/$100,000,000.pdf`
    } else if (spendValue >= 250000000 && spendValue < 500000000) {
      return `${basePath}/$250,000,000.pdf`
    } else if (spendValue >= 500000000 && spendValue < 750000000) {
      return `${basePath}/$500,000,000.pdf`
    } else if (spendValue >= 750000000 && spendValue < 1000000000) {
      return `${basePath}/$750,000,000.pdf`
    } else if (spendValue >= 1000000000 && spendValue < 2000000000) {
      return `${basePath}/$1,000,000,000.pdf`
    } else if (spendValue >= 2000000000) {
      return `${basePath}/$2,000,000,000.pdf`
    } else {
      return `${basePath}/$250,000.pdf` // fallback
    }
  }

  const getPdfUrlByVolume = (annualVolume: number) => {
    const basePath = documentType === "docs" ? "/PDF/Docs/Pricing Sheet" : "/PDF/Decks/Pricing Sheet"
    
    if (annualVolume < 139) {
      return `${basePath}/$250,000.pdf` // Below minimum
    } else if (annualVolume >= 139 && annualVolume < 5556) {
      return `${basePath}/$250,000.pdf`
    } else if (annualVolume >= 5556 && annualVolume < 13889) {
      return `${basePath}/$10,000,000.pdf`
    } else if (annualVolume >= 13889 && annualVolume < 27778) {
      return `${basePath}/$25,000,000.pdf`
    } else if (annualVolume >= 27778 && annualVolume < 41667) {
      return `${basePath}/$50,000,000.pdf`
    } else if (annualVolume >= 41667 && annualVolume < 55556) {
      return `${basePath}/$75,000,000.pdf`
    } else if (annualVolume >= 55556 && annualVolume < 138889) {
      return `${basePath}/$100,000,000.pdf`
    } else if (annualVolume >= 138889 && annualVolume < 277778) {
      return `${basePath}/$250,000,000.pdf`
    } else if (annualVolume >= 277778 && annualVolume < 416667) {
      return `${basePath}/$500,000,000.pdf`
    } else if (annualVolume >= 416667 && annualVolume < 555556) {
      return `${basePath}/$750,000,000.pdf`
    } else if (annualVolume >= 555556 && annualVolume < 1111111) {
      return `${basePath}/$1,000,000,000.pdf`
    } else {
      return `${basePath}/$2,000,000,000.pdf`
    }
  }

  // New function to generate dynamic pricing PDFs based on calculated pricing
  const generateDynamicPricingPDFs = async (spendValue: number) => {
    try {
      console.log('Generating dynamic pricing PDFs for spend:', spendValue, 'cadence:', billingCadence)
      
      const pricingResult = calculatePricing(spendValue)
      if (!pricingResult.pricing) {
        console.error('No pricing result available')
        return []
      }
      
      const generatedPdfs: string[] = []
      
      // Determine template path based on cadence
      const templateBase = billingCadence === "year" ? "/yearly templates" : "/templates"
      
      // Generate pricing PDF based on selected type
      if (includePricingSheet) {
        if (pricingSheetType === "marketplace") {
        // Check if marketplace pricing is available
        if (!isMarketplacePricingAvailable()) {
          console.log('❌ Marketplace pricing not available for this spend level, skipping marketplace PDF generation')
          return []
        }
        
        console.log('Generating marketplace pricing PDF...')
        
        const marketplaceTemplatePath = billingCadence === "year"
          ? "/yearly templates/Yearly Pricing Tool_Generic Marketplace Pricing Sheet (v0.2).pdf"
          : "/templates/Pricing Tool_Generic Marketplace Pricing Sheet (v0.2).pdf"
        // Pass monthly price - PDF function will calculate yearly with discount
        let proMarketplaceFee: number
        if (pricingResult.pricing.marketplace.pro.price === "Custom") {
          const customValue = customPricing.marketplacePro ? Number(customPricing.marketplacePro) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          proMarketplaceFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          proMarketplaceFee = pricingResult.pricing.marketplace.pro.price as number
        }
        
        // Use custom marketplace target if provided, otherwise use the calculated target
        let targetAmount: number
        if (customPricing.marketplaceTarget) {
          targetAmount = convertMarketplaceTargetToDollars(customPricing.marketplaceTarget, customPricing.marketplaceTargetUnit)
        } else {
          targetAmount = pricingResult.pricing.marketplace.core.target
        }
        
        const marketplacePdf = await generateMarketplacePricingPDF(
          marketplaceTemplatePath,
          proMarketplaceFee,
          targetAmount,
          billingCadence
        )
        
        const marketplaceUrl = URL.createObjectURL(marketplacePdf)
        generatedPdfs.push(marketplaceUrl)
        console.log('✅ Marketplace pricing PDF generated')
        } else if (pricingSheetType === "saas") {
        console.log('Generating SaaS pricing PDF...')
        
        // Use SaaS-only template when marketplace pricing is not available
        const saasTemplatePath = !isMarketplacePricingAvailable() 
          ? (billingCadence === "year"
              ? "/yearly templates/Yearly Pricing Tool_Generic Pricing Sheet SaaS Only (v0.1).pdf"
              : "/templates/Pricing Tool_Generic Pricing Sheet SaaS Only (v0.1).pdf")
          : (billingCadence === "year"
              ? "/yearly templates/Yearly Pricing Tool_Generic Pricing Sheet (v0.1).pdf"
              : "/templates/Pricing Tool_Generic Pricing Sheet (v0.1).pdf")
        // Pass monthly prices - PDF function will calculate yearly with discount
        let coreSaaSFee: number
        let proSaaSFee: number
        
        if (pricingResult.pricing.saas.core.price === "Custom") {
          const customValue = customPricing.saasCore ? Number(customPricing.saasCore) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          coreSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          coreSaaSFee = pricingResult.pricing.saas.core.price as number
        }
        
        if (pricingResult.pricing.saas.pro.price === "Custom") {
          const customValue = customPricing.saasPro ? Number(customPricing.saasPro) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          proSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          proSaaSFee = pricingResult.pricing.saas.pro.price as number
        }
        
        const saasPdf = await generateSaaSPricingPDF(
          saasTemplatePath,
          coreSaaSFee,
          proSaaSFee,
          billingCadence
        )
        
        const saasUrl = URL.createObjectURL(saasPdf)
        generatedPdfs.push(saasUrl)
        console.log('✅ SaaS pricing PDF generated')
        } else if (pricingSheetType === "both") {
        console.log('Generating both marketplace and SaaS pricing PDFs...')
        
        // Check if marketplace pricing is available
        if (!isMarketplacePricingAvailable()) {
          console.log('❌ Marketplace pricing not available for this spend level, generating SaaS only')
          // Fall back to SaaS only - use SaaS-only template since marketplace is not available
          const saasTemplatePath = billingCadence === "year"
            ? "/yearly templates/Yearly Pricing Tool_Generic Pricing Sheet SaaS Only (v0.1).pdf"
            : "/templates/Pricing Tool_Generic Pricing Sheet SaaS Only (v0.1).pdf"
          let coreSaaSFee: number
          let proSaaSFee: number
          
          if (pricingResult.pricing.saas.core.price === "Custom") {
            const customValue = customPricing.saasCore ? Number(customPricing.saasCore) : -1
            coreSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue * 12 : customValue
          } else {
            const monthlyPrice = pricingResult.pricing.saas.core.price as number
            coreSaaSFee = billingCadence === "year" ? monthlyPrice * 12 : monthlyPrice
          }
          
          if (pricingResult.pricing.saas.pro.price === "Custom") {
            const customValue = customPricing.saasPro ? Number(customPricing.saasPro) : -1
            proSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue * 12 : customValue
          } else {
            const monthlyPrice = pricingResult.pricing.saas.pro.price as number
            proSaaSFee = billingCadence === "year" ? monthlyPrice * 12 : monthlyPrice
          }
          
          const saasPdf = await generateSaaSPricingPDF(
            saasTemplatePath,
            coreSaaSFee,
            proSaaSFee,
            billingCadence
          )
          
          const saasUrl = URL.createObjectURL(saasPdf)
          generatedPdfs.push(saasUrl)
          console.log('✅ SaaS pricing PDF generated (fallback from both)')
          return generatedPdfs
        }
        
        // Generate marketplace pricing PDF
        const marketplaceTemplatePath = billingCadence === "year"
          ? "/yearly templates/Yearly Pricing Tool_Generic Marketplace Pricing Sheet (v0.2).pdf"
          : "/templates/Pricing Tool_Generic Marketplace Pricing Sheet (v0.2).pdf"
        // Pass monthly price - PDF function will calculate yearly with discount
        let proMarketplaceFee: number
        if (pricingResult.pricing.marketplace.pro.price === "Custom") {
          const customValue = customPricing.marketplacePro ? Number(customPricing.marketplacePro) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          proMarketplaceFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          proMarketplaceFee = pricingResult.pricing.marketplace.pro.price as number
        }
        
        let targetAmount: number
        if (customPricing.marketplaceTarget) {
          targetAmount = convertMarketplaceTargetToDollars(customPricing.marketplaceTarget, customPricing.marketplaceTargetUnit)
        } else {
          targetAmount = pricingResult.pricing.marketplace.core.target
        }
        
        const marketplacePdf = await generateMarketplacePricingPDF(
          marketplaceTemplatePath,
          proMarketplaceFee,
          targetAmount,
          billingCadence
        )
        
        const marketplaceUrl = URL.createObjectURL(marketplacePdf)
        generatedPdfs.push(marketplaceUrl)
        console.log('✅ Marketplace pricing PDF generated')
        
        // Generate SaaS pricing PDF
        const saasTemplatePath = billingCadence === "year"
          ? "/yearly templates/Yearly Pricing Tool_Generic Pricing Sheet (v0.1).pdf"
          : "/templates/Pricing Tool_Generic Pricing Sheet (v0.1).pdf"
        // Pass monthly prices - PDF function will calculate yearly with discount
        let coreSaaSFee: number
        let proSaaSFee: number
        
        if (pricingResult.pricing.saas.core.price === "Custom") {
          const customValue = customPricing.saasCore ? Number(customPricing.saasCore) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          coreSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          coreSaaSFee = pricingResult.pricing.saas.core.price as number
        }
        
        if (pricingResult.pricing.saas.pro.price === "Custom") {
          const customValue = customPricing.saasPro ? Number(customPricing.saasPro) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          proSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          proSaaSFee = pricingResult.pricing.saas.pro.price as number
        }
        
        const saasPdf = await generateSaaSPricingPDF(
          saasTemplatePath,
          coreSaaSFee,
          proSaaSFee,
          billingCadence
        )
        
        const saasUrl = URL.createObjectURL(saasPdf)
        generatedPdfs.push(saasUrl)
        console.log('✅ SaaS pricing PDF generated')
        } else if (pricingSheetType === "combined") {
        console.log('Generating combined pricing PDF...')
        
        // Check if marketplace pricing is available
        if (!isMarketplacePricingAvailable()) {
          console.log('❌ Marketplace pricing not available for this spend level, generating SaaS only')
          // Fall back to SaaS only - use SaaS-only template since marketplace is not available
          const saasTemplatePath = billingCadence === "year"
            ? "/yearly templates/Yearly Pricing Tool_Generic Pricing Sheet SaaS Only (v0.1).pdf"
            : "/templates/Pricing Tool_Generic Pricing Sheet SaaS Only (v0.1).pdf"
          let coreSaaSFee: number
          let proSaaSFee: number
          
          // Pass monthly prices - PDF function will calculate yearly with discount
          if (pricingResult.pricing.saas.core.price === "Custom") {
            const customValue = customPricing.saasCore ? Number(customPricing.saasCore) : -1
            // If yearly, user entered yearly price, convert back to monthly for calculation
            coreSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
          } else {
            coreSaaSFee = pricingResult.pricing.saas.core.price as number
          }
          
          if (pricingResult.pricing.saas.pro.price === "Custom") {
            const customValue = customPricing.saasPro ? Number(customPricing.saasPro) : -1
            // If yearly, user entered yearly price, convert back to monthly for calculation
            proSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
          } else {
            proSaaSFee = pricingResult.pricing.saas.pro.price as number
          }
          
          const saasPdf = await generateSaaSPricingPDF(
            saasTemplatePath,
            coreSaaSFee,
            proSaaSFee,
            billingCadence
          )
          
          const saasUrl = URL.createObjectURL(saasPdf)
          generatedPdfs.push(saasUrl)
          console.log('✅ SaaS pricing PDF generated (fallback from combined)')
          return generatedPdfs
        }
        
        // Generate combined pricing PDF
        const combinedTemplatePath = billingCadence === "year"
          ? "/yearly templates/Yearly Pricing Tool_Generic Combined Pricing Sheet (v0.2).pdf"
          : "/templates/Pricing Tool_Generic Combined Pricing Sheet (v0.2).pdf"
        // Pass monthly prices - PDF function will calculate yearly with discount
        let coreSaaSFee: number
        let proSaaSFee: number
        let proMarketplaceFee: number
        
        if (pricingResult.pricing.saas.core.price === "Custom") {
          const customValue = customPricing.saasCore ? Number(customPricing.saasCore) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          coreSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          coreSaaSFee = pricingResult.pricing.saas.core.price as number
        }
        
        if (pricingResult.pricing.saas.pro.price === "Custom") {
          const customValue = customPricing.saasPro ? Number(customPricing.saasPro) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          proSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          proSaaSFee = pricingResult.pricing.saas.pro.price as number
        }
        
        if (pricingResult.pricing.marketplace.pro.price === "Custom") {
          const customValue = customPricing.marketplacePro ? Number(customPricing.marketplacePro) : -1
          // If yearly, user entered yearly price, convert back to monthly for calculation
          proMarketplaceFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          proMarketplaceFee = pricingResult.pricing.marketplace.pro.price as number
        }
        
        let targetAmount: number
        if (customPricing.marketplaceTarget) {
          targetAmount = convertMarketplaceTargetToDollars(customPricing.marketplaceTarget, customPricing.marketplaceTargetUnit)
        } else {
          targetAmount = pricingResult.pricing.marketplace.core.target
        }
        
        const combinedPdf = await generateCombinedPricingPDF(
          combinedTemplatePath,
          coreSaaSFee,
          proSaaSFee,
          proMarketplaceFee,
          targetAmount,
          billingCadence
        )
        
        const combinedUrl = URL.createObjectURL(combinedPdf)
        generatedPdfs.push(combinedUrl)
        console.log('✅ Combined pricing PDF generated')
        } else if (pricingSheetType === "proOnly") {
        console.log('Generating ProcureOS Pro Pricing Only PDF...')
        const proOnlyTemplatePath =
          billingCadence === "year"
            ? "/yearly templates/Yearly Pricing Tool_Generic Pricing Sheet (v0.1)_Pro_Only.pdf"
            : "/templates/Pricing Tool_Generic Pricing Sheet (v0.1)_Pro_only.pdf"
        let proSaaSFee: number
        if (pricingResult.pricing.saas.pro.price === "Custom") {
          const customValue = customPricing.saasPro ? Number(customPricing.saasPro) : -1
          proSaaSFee = billingCadence === "year" && customValue !== -1 ? customValue / 12 : customValue
        } else {
          proSaaSFee = pricingResult.pricing.saas.pro.price as number
        }
        const proOnlyPdf = await generateProOnlyPricingPDF(proOnlyTemplatePath, proSaaSFee, billingCadence)
        const proOnlyUrl = URL.createObjectURL(proOnlyPdf)
        generatedPdfs.push(proOnlyUrl)
        console.log('✅ ProcureOS Pro Pricing Only PDF generated')
        }
      }
      
      console.log('Generated pricing PDFs:', generatedPdfs.length)
      return generatedPdfs
      
    } catch (error) {
      console.error('Error generating dynamic pricing PDFs:', error)
      return []
    }
  }

  const handleDownload = async () => {
    const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
    let pdfUrl = ""
    
    // Determine which method to use based on what was provided
    if (annualSpend.trim() && !isNaN(spendValue) && spendValue > 0) {
      const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
      pdfUrl = getPdfUrl(spendInDollars)
    } else if (volume.trim() && !isNaN(Number.parseFloat(volume)) && Number.parseFloat(volume) > 0) {
      const volumeValue = Number.parseFloat(volume)
      const annualVolume = calculateAnnualVolume(volumeValue, frequency)
      pdfUrl = getPdfUrlByVolume(annualVolume)
    }

    const hasAdditionalPdfs = includeIntro || includeRFP || includeSpot
    
    if (hasAdditionalPdfs) {
      try {
        // Build array of additional PDFs to include using dynamic paths
        const pdfPaths = getPdfPaths()
        const additionalPdfs: string[] = []
        if (includeIntro) additionalPdfs.push(pdfPaths.intro)
        if (includeRFP) additionalPdfs.push(pdfPaths.rfp)
        if (includeSpot) additionalPdfs.push(pdfPaths.spot)
        
        let combinedBlob: Blob
        let filename: string
        
        const hasPricingSheets = includePricingSheet
        if (hasPricingSheets) {
          // Combine additional PDFs with pricing sheet
          combinedBlob = await combinePricingWithAdditionalPDFs(
            pdfUrl, 
            additionalPdfs,
            "procureos-pricing-combined.pdf"
          )
          filename = "procureos-pricing-combined.pdf"
        } else {
          // Combine only the additional PDFs without pricing sheet
          const pdfBuffers = await Promise.all(
            additionalPdfs.map(url => fetch(url).then(res => res.arrayBuffer()))
          )
          combinedBlob = await combinePDFs(pdfBuffers, "procureos-combined.pdf")
          filename = "procureos-combined.pdf"
        }
        
        // Download the combined PDF
        downloadPDF(combinedBlob, filename)
      } catch (error) {
        console.error('Error combining PDFs:', error)
        // Fallback to opening PDFs separately
        const pdfPaths = getPdfPaths()
        const hasPricingSheets = includePricingSheet
        if (hasPricingSheets) window.open(pdfUrl, "_blank")
        if (includeIntro) window.open(pdfPaths.intro, "_blank")
        if (includeRFP) window.open(pdfPaths.rfp, "_blank")
        if (includeSpot) window.open(pdfPaths.spot, "_blank")
      }
    } else {
      // Open single PDF in new tab for download (only if pricing sheet is included)
      const hasPricingSheets = includePricingSheet
      if (hasPricingSheets) {
        window.open(pdfUrl, "_blank")
      }
    }
  }

  if (phase === "welcome") {
    return (
      <div className="flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-4">
            <MasterControls
              // Input state
              inputType={inputType}
              setInputType={setInputType}
              annualSpend={annualSpend}
              setAnnualSpend={setAnnualSpend}
              spendUnit={spendUnit}
              setSpendUnit={setSpendUnit}
              volume={volume}
              setVolume={setVolume}
              frequency={frequency}
              setFrequency={setFrequency}
              
              // Document type state
              documentType={documentType}
              setDocumentType={setDocumentType}
              
              // Checkbox states
              includeTitle={includeTitle}
              setIncludeTitle={setIncludeTitle}
              includeIntro={includeIntro}
              setIncludeIntro={setIncludeIntro}
              includeProblemSolution={includeProblemSolution}
              setIncludeProblemSolution={setIncludeProblemSolution}
              includeContractOverview={includeContractOverview}
              setIncludeContractOverview={setIncludeContractOverview}
              includeSpotOverview={includeSpotOverview}
              setIncludeSpotOverview={setIncludeSpotOverview}
              includeEmergeInsights={includeEmergeInsights}
              setIncludeEmergeInsights={setIncludeEmergeInsights}
              includeRFPFeatureGrid={includeRFPFeatureGrid}
              setIncludeRFPFeatureGrid={setIncludeRFPFeatureGrid}
              includeSpotFeatureGrid={includeSpotFeatureGrid}
              setIncludeSpotFeatureGrid={setIncludeSpotFeatureGrid}
              includeSpotQuoteCreation={includeSpotQuoteCreation}
              setIncludeSpotQuoteCreation={setIncludeSpotQuoteCreation}
              includeSpotRateCollection={includeSpotRateCollection}
              setIncludeSpotRateCollection={setIncludeSpotRateCollection}
              includeSpotBenchmarking={includeSpotBenchmarking}
              setIncludeSpotBenchmarking={setIncludeSpotBenchmarking}
              includeSpotTracking={includeSpotTracking}
              setIncludeSpotTracking={setIncludeSpotTracking}
              includeSpotReporting={includeSpotReporting}
              setIncludeSpotReporting={setIncludeSpotReporting}
              includeSpotVendorEngagement={includeSpotVendorEngagement}
              setIncludeSpotVendorEngagement={setIncludeSpotVendorEngagement}
              includeSpotEmergeMarketplace={includeSpotEmergeMarketplace}
              setIncludeSpotEmergeMarketplace={setIncludeSpotEmergeMarketplace}
              includeContractReporting={includeContractReporting}
              setIncludeContractReporting={setIncludeContractReporting}
              includeContractBenchmarking={includeContractBenchmarking}
              setIncludeContractBenchmarking={setIncludeContractBenchmarking}
              includeContractEmergeMarketplace={includeContractEmergeMarketplace}
              setIncludeContractEmergeMarketplace={setIncludeContractEmergeMarketplace}
              includeContractVendorEngagement={includeContractVendorEngagement}
              setIncludeContractVendorEngagement={setIncludeContractVendorEngagement}
              includeContractSpendOptimization={includeContractSpendOptimization}
              setIncludeContractSpendOptimization={setIncludeContractSpendOptimization}
              includeContractEventManagement={includeContractEventManagement}
              setIncludeContractEventManagement={setIncludeContractEventManagement}
              includeIntegrations={includeIntegrations}
              setIncludeIntegrations={setIncludeIntegrations}
              includeGeneralIntegration={includeGeneralIntegration}
              setIncludeGeneralIntegration={setIncludeGeneralIntegration}
              includeMercuryGateIntegration={includeMercuryGateIntegration}
              setIncludeMercuryGateIntegration={setIncludeMercuryGateIntegration}
              includeCapacityLinkIntegration={includeCapacityLinkIntegration}
              setIncludeCapacityLinkIntegration={setIncludeCapacityLinkIntegration}
              
              // Pricing sheet state
              includePricingSheet={includePricingSheet}
              setIncludePricingSheet={setIncludePricingSheet}
              pricingSheetType={pricingSheetType}
              setPricingSheetType={setPricingSheetType}
              billingCadence={billingCadence}
              setBillingCadence={setBillingCadence}
              isMarketplacePricingAvailable={isMarketplacePricingAvailable()}
              
              // Custom pricing state
              customPricing={customPricing}
              setCustomPricing={setCustomPricing}
              
              // Utility functions
              error={error}
              handleInputChange={handleInputChange}
              handleVolumeChange={handleVolumeChange}
              convertSpendToDollars={convertSpendToDollars}
              calculateAnnualVolume={calculateAnnualVolume}
              calculatePricing={calculatePricing}
              
              // UI state
              isContractDetailsExpanded={isContractDetailsExpanded}
              setIsContractDetailsExpanded={setIsContractDetailsExpanded}
              isSpotDetailsExpanded={isSpotDetailsExpanded}
              setIsSpotDetailsExpanded={setIsSpotDetailsExpanded}
              isIntegrationsExpanded={isIntegrationsExpanded}
              setIsIntegrationsExpanded={setIsIntegrationsExpanded}
              
              // Variant
              variant="welcome"
            />

            <Button onClick={handleNext} className="w-full bg-[#000000] hover:bg-[#18181b] text-white">
              Next →
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "too-low") {
    const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
    const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0
    
    const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
    const isSpendTooLow = spendValue > 0 && spendInDollars < 250000
    const isVolumeTooLow = volumeValue > 0 && calculateAnnualVolume(volumeValue, frequency) < 139
    
    return (
      <div className="flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">Minimum Requirements Not Met</h1>
            {isSpendTooLow && (
              <div>
                <p className="text-sm text-[#4c5967]">
                  ProcureOS requires a minimum annual freight spend of $250,000 to qualify for our services.
                </p>
                <p className="text-sm text-[#4c5967]">
                  Your entered spend: <span className="font-semibold">${spendInDollars.toLocaleString()}</span>
                </p>
              </div>
            )}
            {isVolumeTooLow && (
              <div>
                <p className="text-sm text-[#4c5967]">
                  ProcureOS requires a minimum annual volume of 139 truckloads to qualify for our services.
                </p>
                <p className="text-sm text-[#4c5967]">
                  Your calculated annual volume: <span className="font-semibold">{calculateAnnualVolume(volumeValue, frequency).toLocaleString()} truckloads</span>
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button onClick={handleBack} className="w-full bg-[#000000] hover:bg-[#18181b] text-white">
              ← Back
            </Button>
            <Button 
              onClick={() => setPhase("pricing")} 
              className="w-full bg-primary text-foreground hover:bg-primary/90"
            >
              Show minimum pricing info
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Download handler for pricing phase
  const handlePricingDownload = async () => {
    const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
    const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0
    
    let pdfUrl = ""
    
    // Determine which method to use based on what was provided
    if (annualSpend.trim() && !isNaN(spendValue) && spendValue > 0) {
      const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
      // Use dynamic pricing generation instead of static PDFs
      const dynamicPricingPdfs = await generateDynamicPricingPDFs(Number(spendInDollars))
      if (dynamicPricingPdfs.length > 0) {
        // If we have multiple pricing PDFs, combine them first
        if (dynamicPricingPdfs.length > 1) {
          // Convert blob URLs back to ArrayBuffers for combination
          const pricingBuffers = await Promise.all(
            dynamicPricingPdfs.map(url => fetch(url).then(res => res.arrayBuffer()))
          )
          const combinedPricingBlob = await combinePDFs(pricingBuffers, "combined-pricing.pdf")
          pdfUrl = URL.createObjectURL(combinedPricingBlob)
        } else {
          pdfUrl = dynamicPricingPdfs[0] // Use single generated PDF for download
        }
      } else {
        pdfUrl = getPdfUrl(spendInDollars) // Fallback to static PDF
      }
    } else if (volume.trim() && !isNaN(volumeValue) && volumeValue > 0) {
      const annualVolume = calculateAnnualVolume(volumeValue, frequency)
      // For volume-based calculations, convert to spend equivalent and use dynamic pricing
      const estimatedSpend = annualVolume * 1700 // Rough estimate: $1700 per truckload
      const dynamicPricingPdfs = await generateDynamicPricingPDFs(Number(estimatedSpend))
      if (dynamicPricingPdfs.length > 0) {
        // If we have multiple pricing PDFs, combine them first
        if (dynamicPricingPdfs.length > 1) {
          // Convert blob URLs back to ArrayBuffers for combination
          const pricingBuffers = await Promise.all(
            dynamicPricingPdfs.map(url => fetch(url).then(res => res.arrayBuffer()))
          )
          const combinedPricingBlob = await combinePDFs(pricingBuffers, "combined-pricing.pdf")
          pdfUrl = URL.createObjectURL(combinedPricingBlob)
        } else {
          pdfUrl = dynamicPricingPdfs[0] // Use single generated PDF for download
        }
      } else {
        pdfUrl = getPdfUrlByVolume(annualVolume) // Fallback to static PDF
      }
    }

    const hasAdditionalPdfs = includeTitle || includeIntro || includeProblemSolution || includeContractOverview || includeSpotOverview || includeEmergeInsights || includeRFPFeatureGrid || includeSpotFeatureGrid || includeSpotQuoteCreation || includeSpotRateCollection || includeSpotBenchmarking || includeSpotTracking || includeSpotReporting || includeSpotVendorEngagement || includeSpotEmergeMarketplace || includeContractReporting || includeContractBenchmarking || includeContractEmergeMarketplace || includeContractVendorEngagement || includeContractSpendOptimization || includeContractEventManagement || includeIntegrations || includeRFP || includeSpot || includePricingSheet
    
    if (hasAdditionalPdfs) {
      try {
        // If we have a combined PDF URL, use it
        if (combinedPdfUrl) {
          // Convert blob URL back to blob for download
          const response = await fetch(combinedPdfUrl)
          const blob = await response.blob()
          downloadPDF(blob, "procureos-pricing-combined.pdf")
        } else {
          // Fallback to combining PDFs
          const pdfPaths = getPdfPaths()
          const additionalPdfs: string[] = []
          
          if (documentType === "decks") {
            // Add main deck files in order
            if (includeTitle && pdfPaths.title && pdfPaths.title !== "") additionalPdfs.push(pdfPaths.title)
            if (includeIntro && pdfPaths.intro && pdfPaths.intro !== "") additionalPdfs.push(pdfPaths.intro)
            if (includeProblemSolution && pdfPaths.problemSolution && pdfPaths.problemSolution !== "") additionalPdfs.push(pdfPaths.problemSolution)
            if (includeContractOverview && pdfPaths.contractOverview && pdfPaths.contractOverview !== "") additionalPdfs.push(pdfPaths.contractOverview)
            
            // Add contract detail files after contract overview
            if (includeContractReporting && pdfPaths.contractReporting && pdfPaths.contractReporting !== "") additionalPdfs.push(pdfPaths.contractReporting)
            if (includeContractBenchmarking && pdfPaths.contractBenchmarking && pdfPaths.contractBenchmarking !== "") additionalPdfs.push(pdfPaths.contractBenchmarking)
            if (includeContractEmergeMarketplace && pdfPaths.contractEmergeMarketplace && pdfPaths.contractEmergeMarketplace !== "") additionalPdfs.push(pdfPaths.contractEmergeMarketplace)
            if (includeContractVendorEngagement && pdfPaths.contractVendorEngagement && pdfPaths.contractVendorEngagement !== "") additionalPdfs.push(pdfPaths.contractVendorEngagement)
            if (includeContractSpendOptimization && pdfPaths.contractSpendOptimization && pdfPaths.contractSpendOptimization !== "") additionalPdfs.push(pdfPaths.contractSpendOptimization)
            if (includeContractEventManagement && pdfPaths.contractEventManagement && pdfPaths.contractEventManagement !== "") additionalPdfs.push(pdfPaths.contractEventManagement)
            
            if (includeSpotOverview && pdfPaths.spotOverview && pdfPaths.spotOverview !== "") additionalPdfs.push(pdfPaths.spotOverview)
            
            // Add spot detail files after spot overview
            if (includeSpotQuoteCreation && pdfPaths.spotQuoteCreation && pdfPaths.spotQuoteCreation !== "") additionalPdfs.push(pdfPaths.spotQuoteCreation)
            if (includeSpotRateCollection && pdfPaths.spotRateCollection && pdfPaths.spotRateCollection !== "") additionalPdfs.push(pdfPaths.spotRateCollection)
            if (includeSpotBenchmarking && pdfPaths.spotBenchmarking && pdfPaths.spotBenchmarking !== "") additionalPdfs.push(pdfPaths.spotBenchmarking)
            if (includeSpotTracking && pdfPaths.spotTracking && pdfPaths.spotTracking !== "") additionalPdfs.push(pdfPaths.spotTracking)
            if (includeSpotReporting && pdfPaths.spotReporting && pdfPaths.spotReporting !== "") additionalPdfs.push(pdfPaths.spotReporting)
            if (includeSpotVendorEngagement && pdfPaths.spotVendorEngagement && pdfPaths.spotVendorEngagement !== "") additionalPdfs.push(pdfPaths.spotVendorEngagement)
            if (includeSpotEmergeMarketplace && pdfPaths.spotEmergeMarketplace && pdfPaths.spotEmergeMarketplace !== "") additionalPdfs.push(pdfPaths.spotEmergeMarketplace)
            
            // Add emerge insights at the end
            if (includeEmergeInsights && pdfPaths.emergeInsights && pdfPaths.emergeInsights !== "") additionalPdfs.push(pdfPaths.emergeInsights)
            
            // Add feature grids after emerge insights
            if (includeRFPFeatureGrid && pdfPaths.rfpFeatureGrid && pdfPaths.rfpFeatureGrid !== "") additionalPdfs.push(pdfPaths.rfpFeatureGrid)
            if (includeSpotFeatureGrid && pdfPaths.spotFeatureGrid && pdfPaths.spotFeatureGrid !== "") additionalPdfs.push(pdfPaths.spotFeatureGrid)
            
            // Add integrations at the end
            if (includeIntegrations) {
              if (includeGeneralIntegration && pdfPaths.integrations && pdfPaths.integrations !== "") {
                additionalPdfs.push(pdfPaths.integrations)
              }
              if (includeMercuryGateIntegration && pdfPaths.mercuryGate && pdfPaths.mercuryGate !== "") {
                additionalPdfs.push(pdfPaths.mercuryGate)
              }
              if (includeCapacityLinkIntegration && pdfPaths.capacityLink && pdfPaths.capacityLink !== "") {
                additionalPdfs.push(pdfPaths.capacityLink)
              }
            }
          } else {
            // Docs mode - use original logic
            if (includeIntro && pdfPaths.intro && pdfPaths.intro !== "") additionalPdfs.push(pdfPaths.intro)
            if (includeRFP && pdfPaths.rfp && pdfPaths.rfp !== "") additionalPdfs.push(pdfPaths.rfp)
            if (includeSpot && pdfPaths.spot && pdfPaths.spot !== "") additionalPdfs.push(pdfPaths.spot)
          }
          
          let combinedBlob: Blob
          let filename: string
          
          const hasPricingSheets = includePricingSheet
          if (hasPricingSheets) {
            // Combine additional PDFs with pricing sheet
            combinedBlob = await combinePricingWithAdditionalPDFs(
              pdfUrl, 
              additionalPdfs,
              "procureos-pricing-combined.pdf"
            )
            filename = "procureos-pricing-combined.pdf"
          } else {
            // Combine only the additional PDFs without pricing sheet
            const pdfBuffers = await Promise.all(
              additionalPdfs.map(url => fetch(url).then(res => res.arrayBuffer()))
            )
            combinedBlob = await combinePDFs(pdfBuffers, "procureos-combined.pdf")
            filename = "procureos-combined.pdf"
          }
          
          downloadPDF(combinedBlob, filename)
        }
      } catch (error) {
        console.error('Error combining PDFs:', error)
        // Fallback to opening PDFs separately
        const pdfPaths = getPdfPaths()
        const hasPricingSheets = includePricingSheet
        if (hasPricingSheets) window.open(pdfUrl, "_blank")
        if (includeIntro && pdfPaths.intro && pdfPaths.intro !== "") window.open(pdfPaths.intro, "_blank")
        if (includeRFP && pdfPaths.rfp && pdfPaths.rfp !== "") window.open(pdfPaths.rfp, "_blank")
        if (includeSpot && pdfPaths.spot && pdfPaths.spot !== "") window.open(pdfPaths.spot, "_blank")
      }
    } else {
      // Open single PDF in new tab for download (only if pricing sheet is included)
      const hasPricingSheets = includePricingSheet
      if (hasPricingSheets) {
        window.open(pdfUrl, "_blank")
      }
    }
  }

  if (phase === "pricing") {
    const spendValue = Number.parseFloat(annualSpend.replace(/[^0-9.]/g, "")) || 0
    const volumeValue = Number.parseFloat(volume.replace(/[^0-9.]/g, "")) || 0
    
    let pdfUrl = ""
    
    // For the preview, we'll use the combined PDF URL if available, otherwise fallback to static PDFs
    if (combinedPdfUrl) {
      pdfUrl = combinedPdfUrl
    } else {
      // Determine which method to use based on what was provided
      if (annualSpend.trim() && !isNaN(spendValue) && spendValue > 0) {
        const spendInDollars = convertSpendToDollars(spendValue, spendUnit)
        pdfUrl = getPdfUrl(spendInDollars) // Fallback to static PDF for preview
      } else if (volume.trim() && !isNaN(volumeValue) && volumeValue > 0) {
        const annualVolume = calculateAnnualVolume(volumeValue, frequency)
        pdfUrl = getPdfUrlByVolume(annualVolume) // Fallback to static PDF for preview
      }
    }

    // Determine which PDF to show in the preview
    const previewUrl = combinedPdfUrl || pdfUrl

    return (
      <>
        {/* Controls Panel - Positioned relative to the toolbar header */}
        {isControlsOpen && (
          <div className="fixed top-32 left-6 z-50">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[300px] max-h-[80vh] overflow-y-auto">
              <MasterControls
                // Input state
                inputType={inputType}
                setInputType={setInputType}
                annualSpend={annualSpend}
                setAnnualSpend={setAnnualSpend}
                spendUnit={spendUnit}
                setSpendUnit={setSpendUnit}
                volume={volume}
                setVolume={setVolume}
                frequency={frequency}
                setFrequency={setFrequency}
                
                // Document type state
                documentType={documentType}
                setDocumentType={setDocumentType}
                
                // Checkbox states
                includeTitle={includeTitle}
                setIncludeTitle={setIncludeTitle}
                includeIntro={includeIntro}
                setIncludeIntro={setIncludeIntro}
                includeProblemSolution={includeProblemSolution}
                setIncludeProblemSolution={setIncludeProblemSolution}
                includeContractOverview={includeContractOverview}
                setIncludeContractOverview={setIncludeContractOverview}
                includeSpotOverview={includeSpotOverview}
                setIncludeSpotOverview={setIncludeSpotOverview}
                includeEmergeInsights={includeEmergeInsights}
                setIncludeEmergeInsights={setIncludeEmergeInsights}
                includeRFPFeatureGrid={includeRFPFeatureGrid}
                setIncludeRFPFeatureGrid={setIncludeRFPFeatureGrid}
                includeSpotFeatureGrid={includeSpotFeatureGrid}
                setIncludeSpotFeatureGrid={setIncludeSpotFeatureGrid}
                includeSpotQuoteCreation={includeSpotQuoteCreation}
                setIncludeSpotQuoteCreation={setIncludeSpotQuoteCreation}
                includeSpotRateCollection={includeSpotRateCollection}
                setIncludeSpotRateCollection={setIncludeSpotRateCollection}
                includeSpotBenchmarking={includeSpotBenchmarking}
                setIncludeSpotBenchmarking={setIncludeSpotBenchmarking}
                includeSpotTracking={includeSpotTracking}
                setIncludeSpotTracking={setIncludeSpotTracking}
                includeSpotReporting={includeSpotReporting}
                setIncludeSpotReporting={setIncludeSpotReporting}
                includeSpotVendorEngagement={includeSpotVendorEngagement}
                setIncludeSpotVendorEngagement={setIncludeSpotVendorEngagement}
                includeSpotEmergeMarketplace={includeSpotEmergeMarketplace}
                setIncludeSpotEmergeMarketplace={setIncludeSpotEmergeMarketplace}
                includeContractReporting={includeContractReporting}
                setIncludeContractReporting={setIncludeContractReporting}
                includeContractBenchmarking={includeContractBenchmarking}
                setIncludeContractBenchmarking={setIncludeContractBenchmarking}
                includeContractEmergeMarketplace={includeContractEmergeMarketplace}
                setIncludeContractEmergeMarketplace={setIncludeContractEmergeMarketplace}
                includeContractVendorEngagement={includeContractVendorEngagement}
                setIncludeContractVendorEngagement={setIncludeContractVendorEngagement}
                includeContractSpendOptimization={includeContractSpendOptimization}
                setIncludeContractSpendOptimization={setIncludeContractSpendOptimization}
                includeContractEventManagement={includeContractEventManagement}
                setIncludeContractEventManagement={setIncludeContractEventManagement}
                includeIntegrations={includeIntegrations}
                setIncludeIntegrations={setIncludeIntegrations}
                includeGeneralIntegration={includeGeneralIntegration}
                setIncludeGeneralIntegration={setIncludeGeneralIntegration}
                includeMercuryGateIntegration={includeMercuryGateIntegration}
                setIncludeMercuryGateIntegration={setIncludeMercuryGateIntegration}
                includeCapacityLinkIntegration={includeCapacityLinkIntegration}
                setIncludeCapacityLinkIntegration={setIncludeCapacityLinkIntegration}
                
                // Pricing sheet state
                includePricingSheet={includePricingSheet}
                setIncludePricingSheet={setIncludePricingSheet}
                pricingSheetType={pricingSheetType}
                setPricingSheetType={setPricingSheetType}
                billingCadence={billingCadence}
                setBillingCadence={setBillingCadence}
                isMarketplacePricingAvailable={isMarketplacePricingAvailable()}
                
                // Custom pricing state
                customPricing={customPricing}
                setCustomPricing={setCustomPricing}
                
                // Utility functions
                error={error}
                handleInputChange={handleInputChange}
                handleVolumeChange={handleVolumeChange}
                convertSpendToDollars={convertSpendToDollars}
                calculateAnnualVolume={calculateAnnualVolume}
                calculatePricing={calculatePricing}
                
                // UI state
                isContractDetailsExpanded={isContractDetailsExpanded}
                setIsContractDetailsExpanded={setIsContractDetailsExpanded}
                isSpotDetailsExpanded={isSpotDetailsExpanded}
                setIsSpotDetailsExpanded={setIsSpotDetailsExpanded}
                isIntegrationsExpanded={isIntegrationsExpanded}
                setIsIntegrationsExpanded={setIsIntegrationsExpanded}
                
                // Variant
                variant="preview"
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-[#000000] min-h-screen flex flex-col">
          <div className="flex-1 p-4 relative">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* PDF Viewer */}
              <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                {isLoadingCombined ? (
                  <div className="w-full h-[85vh] flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading combined PDF preview...</p>
                      <button 
                        onClick={() => {
                          setIsLoadingCombined(false)
                          setCombinedPdfUrl("")
                        }}
                        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Cancel & Show Original
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[85vh] overflow-hidden">
                    <iframe
                      key={`pdf-${pdfUpdateCounter}`}
                      src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitW&zoom=page-width`}
                      className="w-full h-full border-0"
                      title="ProcureOS Pricing PDF"
                      style={{ 
                        width: "100%",
                        height: "100%",
                        transform: "scale(1)",
                        transformOrigin: "top left"
                      }}
                    />
                  </div>
                )}
              </div>


            </div>
          </div>
        </div>
      </>
    )
  }
}
