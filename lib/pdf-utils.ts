import { PDFDocument, rgb, PDFForm, PDFName } from 'pdf-lib'

/**
 * Combines multiple PDF files into a single PDF
 * @param {File[] | ArrayBuffer[]} pdfFiles - Array of PDF files or ArrayBuffers
 * @param {string} filename - Optional filename for the combined PDF
 * @returns {Promise<Blob>} - Combined PDF as a Blob
 */
export async function combinePDFs(pdfFiles: (File | ArrayBuffer)[], filename = 'combined-document.pdf'): Promise<Blob> {
  try {
    // Create a new PDF document
    const combinedPdf = await PDFDocument.create()
    
    // Process each PDF file
    for (const pdfFile of pdfFiles) {
      let pdfArrayBuffer: ArrayBuffer
      
      // Handle both File objects and ArrayBuffers
      if (pdfFile instanceof File) {
        pdfArrayBuffer = await pdfFile.arrayBuffer()
      } else if (pdfFile instanceof ArrayBuffer) {
        pdfArrayBuffer = pdfFile
      } else {
        throw new Error('Invalid file type. Expected File or ArrayBuffer.')
      }
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer)
      
      // Copy all pages from this PDF
      const pageIndices = pdfDoc.getPageIndices()
      const pages = await combinedPdf.copyPages(pdfDoc, pageIndices)
      
      // Add pages to the combined document
      pages.forEach(page => combinedPdf.addPage(page))
    }
    
    // Save and return as Blob
    const combinedPdfBytes = await combinedPdf.save()
    return new Blob([combinedPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' })
    
  } catch (error) {
    throw new Error(`Failed to combine PDFs: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Downloads a PDF Blob to the user's device
 * @param {Blob} pdfBlob - The PDF Blob to download
 * @param {string} filename - The filename for the download
 */
export function downloadPDF(pdfBlob: Blob, filename = 'combined-document.pdf'): void {
  const url = URL.createObjectURL(pdfBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Fetches a PDF from a URL and returns it as an ArrayBuffer
 * @param {string} url - The URL of the PDF to fetch
 * @returns {Promise<ArrayBuffer>} - The PDF as an ArrayBuffer
 */
export async function fetchPDFAsArrayBuffer(url: string): Promise<ArrayBuffer> {
  console.log('Fetching PDF from:', url)
  const response = await fetch(url)
  if (!response.ok) {
    console.error('Failed to fetch PDF:', url, response.status, response.statusText)
    throw new Error(`Failed to fetch PDF from ${url}: ${response.statusText}`)
  }
  console.log('PDF fetched successfully:', url)
  return await response.arrayBuffer()
}

/**
 * Combines a pricing PDF with multiple additional PDFs
 * @param {string} pricingPdfUrl - URL of the pricing PDF
 * @param {string[]} additionalPdfUrls - Array of additional PDF URLs to combine
 * @param {string} filename - Optional filename for the combined PDF
 * @returns {Promise<Blob>} - Combined PDF as a Blob
 */
export async function combinePricingWithAdditionalPDFs(
  pricingPdfUrl: string, 
  additionalPdfUrls: string[], 
  filename = 'procureos-pricing-combined.pdf'
): Promise<Blob> {
  try {
    console.log('Starting PDF combination...', { pricingPdfUrl, additionalPdfUrls })
    
    // Fetch all PDFs as ArrayBuffers
    console.log('Fetching PDFs...')
    const allPdfUrls = [...additionalPdfUrls, pricingPdfUrl]
    const pdfBuffers = await Promise.all(
      allPdfUrls.map(url => fetchPDFAsArrayBuffer(url))
    )
    
    console.log('PDFs fetched successfully, combining...')
    // Combine the PDFs
    const combinedBlob = await combinePDFs(pdfBuffers, filename)
    console.log('PDF combination completed successfully')
    return combinedBlob
    
  } catch (error) {
    console.error('Error in combinePricingWithAdditionalPDFs:', error)
    throw new Error(`Failed to combine pricing with additional PDFs: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Generates a pricing PDF from a template by replacing text content
 * This approach works with PDFs that don't have form fields
 * @param {string} templatePath - Path to the template PDF
 * @param {number} monthlyPrice - The monthly price to fill in
 * @param {number} proMonthlyPrice - The pro monthly price to fill in
 * @returns {Promise<Blob>} - Generated PDF as a Blob
 */
export async function generatePricingPDFWithTextReplacement(
  templatePath: string,
  monthlyPrice: number,
  proMonthlyPrice: number
): Promise<Blob> {
  try {
    console.log('Generating pricing PDF with text replacement...', { templatePath, monthlyPrice, proMonthlyPrice })
    
    // Fetch the template PDF
    const templateBytes = await fetchPDFAsArrayBuffer(templatePath)
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes)
    
    // Get all pages
    const pages = pdfDoc.getPages()
    
    // For now, we'll create a simple approach that adds text overlays
    // This is a basic implementation - you might want to use a more sophisticated approach
    
    pages.forEach((page, pageIndex) => {
      console.log(`Processing page ${pageIndex + 1}`)
      
      // Get page dimensions
      const { width, height } = page.getSize()
      
      // Add text overlays for the pricing information
      // You'll need to adjust these coordinates based on your PDF layout
      
      // Add monthly price text
      page.drawText(`$${monthlyPrice.toLocaleString()}`, {
        x: width * 0.7, // Adjust these coordinates based on your PDF
        y: height * 0.6,
        size: 24,
        color: rgb(0, 0, 0)
      })
      
      // Add pro monthly price text
      page.drawText(`$${proMonthlyPrice.toLocaleString()}`, {
        x: width * 0.7, // Adjust these coordinates based on your PDF
        y: height * 0.4,
        size: 24,
        color: rgb(0, 0, 0)
      })
    })
    
    // Save the filled PDF
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' })
    
    console.log('✅ Successfully generated pricing PDF with text replacement')
    return blob
    
  } catch (error) {
    console.error('❌ Error generating pricing PDF with text replacement:', error)
    throw new Error(`Failed to generate pricing PDF with text replacement: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Generates a pricing PDF from a template by filling in form fields
 * @param {string} templatePath - Path to the template PDF
 * @param {number} monthlyPrice - The monthly price to fill in
 * @param {number} proMonthlyPrice - The pro monthly price to fill in
 * @returns {Promise<Blob>} - Generated PDF as a Blob
 */
export async function generatePricingPDFFromTemplate(
  templatePath: string,
  monthlyPrice: number,
  proMonthlyPrice: number
): Promise<Blob> {
  try {
    console.log('Generating pricing PDF from template...', { templatePath, monthlyPrice, proMonthlyPrice })
    
    // Fetch the template PDF
    const templateBytes = await fetchPDFAsArrayBuffer(templatePath)
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes)
    
    // Get the form from the PDF
    const form = pdfDoc.getForm()
    
    // Get all form fields to see what's available
    const fields = form.getFields()
    console.log('Available form fields:', fields.map(field => field.getName()))
    console.log('Total form fields found:', fields.length)
    
    // Try to fill in the pricing fields using the new field names
    let monthlyFieldFound = false
    let proFieldFound = false
    
    try {
      // Try the new field name: Text5
      const monthlyPriceField = form.getTextField('Text5')
      if (monthlyPriceField) {
        monthlyPriceField.setText(`$${monthlyPrice.toLocaleString()}`)
        
        // Lock down the field to prevent editing
        monthlyPriceField.enableReadOnly()
        monthlyPriceField.disableMultiline()
        
        console.log('✅ Filled and locked monthly price field: Text5')
        monthlyFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "Text5" field, trying alternative names...')
      // Try alternative field names
      const fields = form.getFields()
      const monthlyField = fields.find(field => 
        field.getName().toLowerCase().includes('monthly') && 
        field.getName().toLowerCase().includes('price') &&
        !field.getName().toLowerCase().includes('pro')
      )
      if (monthlyField && monthlyField.constructor.name === 'PDFTextField') {
        (monthlyField as any).setText(`$${monthlyPrice.toLocaleString()}`)
        // Lock down the field
        (monthlyField as any).enableReadOnly()
        (monthlyField as any).disableMultiline()
        console.log('✅ Filled and locked monthly price field with alternative name:', monthlyField.getName())
        monthlyFieldFound = true
      }
    }
    
    try {
      // Try the new field name: Text6
      const proMonthlyPriceField = form.getTextField('Text6')
      if (proMonthlyPriceField) {
        proMonthlyPriceField.setText(`$${proMonthlyPrice.toLocaleString()}`)
        
        // Lock down the field to prevent editing
        proMonthlyPriceField.enableReadOnly()
        proMonthlyPriceField.disableMultiline()
        
        console.log('✅ Filled and locked pro monthly price field: Text6')
        proFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "Text6" field, trying alternative names...')
      // Try alternative field names
      const fields = form.getFields()
      const proField = fields.find(field => 
        field.getName().toLowerCase().includes('pro') && 
        field.getName().toLowerCase().includes('monthly') && 
        field.getName().toLowerCase().includes('price')
      )
      if (proField && proField.constructor.name === 'PDFTextField') {
        (proField as any).setText(`$${proMonthlyPrice.toLocaleString()}`)
        // Lock down the field
        (proField as any).enableReadOnly()
        (proField as any).disableMultiline()
        console.log('✅ Filled and locked pro monthly price field with alternative name:', proField.getName())
        proFieldFound = true
      }
    }
    
    if (!monthlyFieldFound) {
      console.warn('⚠️ Could not find monthly price field in PDF template')
    }
    if (!proFieldFound) {
      console.warn('⚠️ Could not find pro monthly price field in PDF template')
    }
    
    // Flatten the form to convert all fields to static text
    // This makes fields completely uneditable and removes visual field indicators
    const pdfForm = pdfDoc.getForm()
    pdfForm.flatten()
    
    console.log('✅ Form flattened - fields converted to static text')
    
    // Save the filled and flattened PDF
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' })
    
    console.log('✅ Successfully generated pricing PDF from template with flattened fields')
    return blob
    
  } catch (error) {
    console.error('❌ Error generating pricing PDF from template:', error)
    throw new Error(`Failed to generate pricing PDF from template: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Combines a pricing PDF with an intro PDF (legacy function for backward compatibility)
 * @param {string} pricingPdfUrl - URL of the pricing PDF
 * @param {string} introPdfUrl - URL of the intro PDF
 * @param {string} filename - Optional filename for the combined PDF
 * @returns {Promise<Blob>} - Combined PDF as a Blob
 */
export async function combinePricingWithIntro(
  pricingPdfUrl: string, 
  introPdfUrl: string, 
  filename = 'procureos-pricing-with-intro.pdf'
): Promise<Blob> {
  return combinePricingWithAdditionalPDFs(pricingPdfUrl, [introPdfUrl], filename)
} 

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

/**
 * Generates a marketplace pricing PDF from template with specific marketplace fields
 * @param {string} templatePath - Path to the marketplace template PDF
 * @param {number} proMarketplaceFee - The pro marketplace add-on fee
 * @param {number} targetAmount - The required marketplace commitment amount in dollars
 * @returns {Promise<Blob>} - Generated PDF as a Blob
 */
export async function generateMarketplacePricingPDF(
  templatePath: string,
  proMarketplaceFee: number,
  targetAmount: number,
  cadence: "month" | "year" = "month"
): Promise<Blob> {
  try {
    console.log('Generating marketplace pricing PDF from template...', { 
      templatePath, 
      proMarketplaceFee, 
      targetAmount,
      cadence
    })
    
    // Fetch the template PDF
    const templateBytes = await fetchPDFAsArrayBuffer(templatePath)
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes)
    
    // Get the form from the PDF
    const form = pdfDoc.getForm()
    
    // Get all form fields to see what's available
    const fields = form.getFields()
    console.log('Available form fields:', fields.map(field => field.getName()))
    console.log('Total form fields found:', fields.length)
    
    // Log available methods on the first field to see what we can do
    if (fields.length > 0) {
      const firstField = fields[0]
      console.log('Field type:', firstField.constructor.name)
      console.log('Field methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(firstField)))
      
      // Try to get the field's appearance stream to see if we can modify it
      try {
        const fieldDict = (firstField as any).dict
        console.log('Field dictionary keys:', fieldDict ? Object.keys(fieldDict) : 'No dict')
      } catch (e) {
        console.log('Could not access field dictionary')
      }
    }
    
    // Fill in the marketplace-specific fields
    let coreFeeFieldFound = false
    let proFeeFieldFound = false
    let proFeeOriginalFieldFound = false
    let targetPercentageFieldFound = false
    
    // Helper function to round down to nearest 99
    const roundDownToNearest99 = (price: number): number => {
      return Math.floor(price / 100) * 100 - 1
    }
    
    // Calculate prices for yearly (with 12.5% discount)
    let proOriginalYearly = 0
    let proDiscountedYearly = 0
    
    if (cadence === "year" && proMarketplaceFee !== -1) {
      proOriginalYearly = proMarketplaceFee * 12
      const discounted = proOriginalYearly * 0.875 // 12.5% discount
      proDiscountedYearly = roundDownToNearest99(discounted)
      console.log('Marketplace pricing calculation:', {
        monthlyFee: proMarketplaceFee,
        originalYearly: proOriginalYearly,
        discountedYearly: proDiscountedYearly
      })
    }
    
    // 1. coreMarketplace.fee (always Free)
    try {
      const coreFeeField = form.getTextField('coreMarketplace.fee')
      if (coreFeeField) {
        coreFeeField.setText('Free')
        coreFeeField.enableReadOnly()
        coreFeeField.disableMultiline()
        console.log('✅ Filled core marketplace fee field: Free')
        coreFeeFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "coreMarketplace.fee" field')
    }
    
    // 2. proMarketplace.feeOriginal (for yearly templates) - primary field name
    // Also try proMarketplace.saasAddOnFeeOriginal as fallback
    if (cadence === "year") {
      try {
        // Try proMarketplace.feeOriginal first (confirmed field name)
        let proFeeOriginalField = null
        try {
          proFeeOriginalField = form.getTextField('proMarketplace.feeOriginal')
          console.log('✅ Found proMarketplace.feeOriginal field')
        } catch (e) {
          // Try alternative field name as fallback
          try {
            proFeeOriginalField = form.getTextField('proMarketplace.saasAddOnFeeOriginal')
            console.log('✅ Found proMarketplace.saasAddOnFeeOriginal field (fallback)')
          } catch (e2) {
            console.log('ℹ️ Neither proMarketplace.feeOriginal nor proMarketplace.saasAddOnFeeOriginal found')
          }
        }
        
        if (proFeeOriginalField) {
          if (proMarketplaceFee === -1) {
            proFeeOriginalField.setText('Custom')
            console.log('✅ Filled pro marketplace fee original field: Custom')
          } else {
            const originalPrice = Math.round(proOriginalYearly)
            const feeText = `$${originalPrice.toLocaleString()}/year`
            proFeeOriginalField.setText(feeText)
            console.log('✅ Filled pro marketplace fee original field:', feeText, '(calculated from monthly:', proMarketplaceFee, ')')
          }
          proFeeOriginalField.enableReadOnly()
          proFeeOriginalField.disableMultiline()
          proFeeOriginalFieldFound = true
        } else {
          console.log('⚠️ proFeeOriginalField is null - field not found in PDF template')
          console.log('Available fields in marketplace template:', fields.map(field => field.getName()))
        }
      } catch (error) {
        console.log('❌ Error trying to fill pro marketplace fee original field:', error)
      }
    }
    
    // 3. proMarketplace.saasAddOnFee (discounted price for yearly, regular price for monthly)
    try {
      const proFeeField = form.getTextField('proMarketplace.saasAddOnFee')
      if (proFeeField) {
        let feeText: string
        if (proMarketplaceFee === -1) {
          feeText = 'Custom'
        } else if (cadence === "year") {
          feeText = `$${proDiscountedYearly.toLocaleString()}/year`
        } else {
          feeText = `$${proMarketplaceFee.toLocaleString()}/month`
        }
        proFeeField.setText(feeText)
        proFeeField.enableReadOnly()
        proFeeField.disableMultiline()
        console.log('✅ Filled pro marketplace fee field:', feeText)
        proFeeFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "proMarketplace.saasAddOnFee" field')
    }
    
    // 4. coreMarketplace.targetPercentage (now using target amount)
    try {
      const targetPercentageField = form.getTextField('coreMarketplace.targetPercentage')
      if (targetPercentageField) {
        // Try to preserve the original field appearance before setting text
        console.log('ℹ️ Attempting to preserve original field styling...')
        
        // Format the target amount as shortened currency
        const formattedTarget = formatShortenedCurrency(targetAmount)
        
        // Set the text first
        targetPercentageField.setText(formattedTarget)
        
        // Try to restore the original appearance
        try {
          // Get the field's appearance dictionary
          const fieldDict = (targetPercentageField as any).dict
          if (fieldDict && fieldDict.get(PDFName.of('AP'))) {
            console.log('ℹ️ Found appearance dictionary, attempting to preserve styling')
            // The appearance should already be set in the template
          }
        } catch (appearanceError) {
          console.log('⚠️ Could not access appearance dictionary:', appearanceError)
        }
        
        targetPercentageField.enableReadOnly()
        targetPercentageField.disableMultiline()
        
        // Note: Font setting is not available in this PDF library version
        
        console.log('✅ Filled target amount field:', formattedTarget)
        targetPercentageFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "coreMarketplace.targetPercentage" field')
    }
    
    // Log summary of what was found/filled
    console.log('Field fill summary:', {
      coreFeeFieldFound,
      proFeeFieldFound,
      proFeeOriginalFieldFound,
      targetPercentageFieldFound
    })
    
    // Try flattening the form to preserve styling
    try {
      form.flatten()
      console.log('✅ Form flattened to preserve original styling')
    } catch (flattenError) {
      console.log('⚠️ Could not flatten form:', flattenError)
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' })
    
    console.log('✅ Marketplace pricing PDF generated successfully')
    return blob
    
  } catch (error) {
    console.error('❌ Error generating marketplace pricing PDF:', error)
    throw new Error(`Failed to generate marketplace pricing PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
} 

/**
 * Generates a SaaS pricing PDF from template with specific SaaS fields
 * @param {string} templatePath - Path to the SaaS template PDF
 * @param {number} coreSaaSFee - The core SaaS fee
 * @param {number} proSaaSFee - The pro SaaS fee
 * @returns {Promise<Blob>} - Generated PDF as a Blob
 */
export async function generateSaaSPricingPDF(
  templatePath: string,
  coreSaaSFee: number,
  proSaaSFee: number,
  cadence: "month" | "year" = "month"
): Promise<Blob> {
  try {
    console.log('Generating SaaS pricing PDF from template...', { 
      templatePath, 
      coreSaaSFee, 
      proSaaSFee,
      cadence
    })
    
    // Fetch the template PDF
    const templateBytes = await fetchPDFAsArrayBuffer(templatePath)
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes)
    
    // Get the form from the PDF
    const form = pdfDoc.getForm()
    
    // Get all form fields to see what's available
    const fields = form.getFields()
    console.log('Available SaaS form fields:', fields.map(field => field.getName()))
    console.log('Total SaaS form fields found:', fields.length)
    
    // Fill in the SaaS-specific fields
    let coreFeeFieldFound = false
    let proFeeFieldFound = false
    let coreFeeOriginalFieldFound = false
    let proFeeOriginalFieldFound = false
    
    // Helper function to round down to nearest 99
    const roundDownToNearest99 = (price: number): number => {
      return Math.floor(price / 100) * 100 - 1
    }
    
    // Calculate prices for yearly (with 12.5% discount)
    let coreOriginalYearly = 0
    let coreDiscountedYearly = 0
    let proOriginalYearly = 0
    let proDiscountedYearly = 0
    
    if (cadence === "year" && coreSaaSFee !== -1) {
      coreOriginalYearly = coreSaaSFee * 12
      const discounted = coreOriginalYearly * 0.875 // 12.5% discount
      coreDiscountedYearly = roundDownToNearest99(discounted)
    }
    
    if (cadence === "year" && proSaaSFee !== -1) {
      proOriginalYearly = proSaaSFee * 12
      const discounted = proOriginalYearly * 0.875 // 12.5% discount
      proDiscountedYearly = roundDownToNearest99(discounted)
    }
    
    // 1. coreSaaS.feeOriginal (for yearly templates)
    if (cadence === "year") {
      try {
        const coreFeeOriginalField = form.getTextField('coreSaaS.feeOriginal')
        if (coreFeeOriginalField) {
          const feeText = coreSaaSFee === -1 ? 'Custom' : `$${Math.round(coreOriginalYearly).toLocaleString()}/year`
          coreFeeOriginalField.setText(feeText)
          coreFeeOriginalField.enableReadOnly()
          coreFeeOriginalField.disableMultiline()
          console.log('✅ Filled core SaaS fee original field:', feeText)
          coreFeeOriginalFieldFound = true
        }
      } catch (error) {
        console.log('ℹ️ Could not find "coreSaaS.feeOriginal" field (may not exist in this template)')
      }
    }
    
    // 2. coreSaaS.fee (discounted price for yearly, regular price for monthly)
    try {
      const coreFeeField = form.getTextField('coreSaaS.fee')
      if (coreFeeField) {
        let feeText: string
        if (coreSaaSFee === -1) {
          feeText = 'Custom'
        } else if (cadence === "year") {
          feeText = `$${coreDiscountedYearly.toLocaleString()}/year`
        } else {
          feeText = `$${coreSaaSFee.toLocaleString()}/month`
        }
        coreFeeField.setText(feeText)
        coreFeeField.enableReadOnly()
        coreFeeField.disableMultiline()
        console.log('✅ Filled core SaaS fee field:', feeText)
        coreFeeFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "coreSaaS.fee" field')
    }
    
    // 3. proSaaS.feeOriginal (for yearly templates)
    if (cadence === "year") {
      try {
        const proFeeOriginalField = form.getTextField('proSaaS.feeOriginal')
        if (proFeeOriginalField) {
          const feeText = proSaaSFee === -1 ? 'Custom' : `$${Math.round(proOriginalYearly).toLocaleString()}/year`
          proFeeOriginalField.setText(feeText)
          proFeeOriginalField.enableReadOnly()
          proFeeOriginalField.disableMultiline()
          console.log('✅ Filled pro SaaS fee original field:', feeText)
          proFeeOriginalFieldFound = true
        }
      } catch (error) {
        console.log('ℹ️ Could not find "proSaaS.feeOriginal" field (may not exist in this template)')
      }
    }
    
    // 4. proSaaS.fee (discounted price for yearly, regular price for monthly)
    try {
      const proFeeField = form.getTextField('proSaaS.fee')
      if (proFeeField) {
        let feeText: string
        if (proSaaSFee === -1) {
          feeText = 'Custom'
        } else if (cadence === "year") {
          feeText = `$${proDiscountedYearly.toLocaleString()}/year`
        } else {
          feeText = `$${proSaaSFee.toLocaleString()}/month`
        }
        proFeeField.setText(feeText)
        proFeeField.enableReadOnly()
        proFeeField.disableMultiline()
        console.log('✅ Filled pro SaaS fee field:', feeText)
        proFeeFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "proSaaS.fee" field')
    }
    
    // Log summary of what was found/filled
    console.log('SaaS field fill summary:', {
      coreFeeFieldFound,
      proFeeFieldFound,
      coreFeeOriginalFieldFound,
      proFeeOriginalFieldFound
    })
    
    // Try flattening the form to preserve styling
    try {
      form.flatten()
      console.log('✅ SaaS form flattened to preserve original styling')
    } catch (flattenError) {
      console.log('⚠️ Could not flatten SaaS form:', flattenError)
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' })
    
    console.log('✅ SaaS pricing PDF generated successfully')
    return blob
    
  } catch (error) {
    console.error('❌ Error generating SaaS pricing PDF:', error)
    throw new Error(`Failed to generate SaaS pricing PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Generates a Pro-only pricing PDF from template (no Core field; template has Core removed).
 * Used for "ProcureOS Pro Pricing Only" sales flow. Supports monthly and yearly cadence.
 * @param {string} templatePath - Path to the Pro-only template PDF
 * @param {number} proSaaSFee - The pro SaaS fee (monthly)
 * @param {string} cadence - "month" or "year"
 * @returns {Promise<Blob>} - Generated PDF as a Blob
 */
export async function generateProOnlyPricingPDF(
  templatePath: string,
  proSaaSFee: number,
  cadence: "month" | "year" = "month"
): Promise<Blob> {
  try {
    console.log('Generating Pro-only pricing PDF from template...', { templatePath, proSaaSFee, cadence })

    const templateBytes = await fetchPDFAsArrayBuffer(templatePath)
    const pdfDoc = await PDFDocument.load(templateBytes)
    const form = pdfDoc.getForm()

    const fields = form.getFields()
    console.log('Pro-only template form fields:', fields.map((f) => f.getName()))

    const roundDownToNearest99 = (price: number): number => Math.floor(price / 100) * 100 - 1

    // Always compute original full yearly cost when yearly (required for yearly PDF)
    let proOriginalYearly = 0
    let proDiscountedYearly = 0
    if (cadence === "year" && proSaaSFee !== -1) {
      proOriginalYearly = proSaaSFee * 12
      proDiscountedYearly = roundDownToNearest99(proOriginalYearly * 0.875)
    }
    const originalFullCostText = proSaaSFee === -1 ? 'Custom' : `$${Math.round(proOriginalYearly).toLocaleString()}/year`

    if (cadence === "year") {
      const trySetFeeOriginal = (fieldName: string): boolean => {
        try {
          const field = form.getTextField(fieldName)
          if (field) {
            field.setText(originalFullCostText)
            field.enableReadOnly()
            field.disableMultiline()
            console.log('Set Pro-only feeOriginal:', fieldName, originalFullCostText)
            return true
          }
        } catch {
          // field not found
        }
        return false
      }
      trySetFeeOriginal('proSaaS.feeOriginal') ||
        trySetFeeOriginal('proSaaS.fee_original') ||
        trySetFeeOriginal('Pro SaaS.feeOriginal')
    }

    try {
      const proFeeField = form.getTextField('proSaaS.fee')
      if (proFeeField) {
        const feeText = proSaaSFee === -1
          ? 'Custom'
          : cadence === "year"
            ? `$${proDiscountedYearly.toLocaleString()}/year`
            : `$${proSaaSFee.toLocaleString()}/month`
        proFeeField.setText(feeText)
        proFeeField.enableReadOnly()
        proFeeField.disableMultiline()
      }
    } catch (error) {
      console.log('Could not find proSaaS.fee field in Pro-only template:', error)
    }

    try {
      form.flatten()
    } catch {
      // optional
    }

    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' })
  } catch (error) {
    console.error('Error generating Pro-only pricing PDF:', error)
    throw new Error(`Failed to generate Pro-only pricing PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Generates a combined pricing PDF from template with both marketplace and SaaS pricing
 * @param {string} templatePath - Path to the combined template PDF
 * @param {number} coreSaaSFee - The core SaaS fee
 * @param {number} proSaaSFee - The pro SaaS fee
 * @param {number} proMarketplaceFee - The pro marketplace add-on fee
 * @param {number} targetAmount - The required marketplace commitment amount in dollars
 * @returns {Promise<Blob>} - Generated PDF as a Blob
 */
export async function generateCombinedPricingPDF(
  templatePath: string,
  coreSaaSFee: number,
  proSaaSFee: number,
  proMarketplaceFee: number,
  targetAmount: number,
  cadence: "month" | "year" = "month"
): Promise<Blob> {
  try {
    console.log('Generating combined pricing PDF from template...', { 
      templatePath, 
      coreSaaSFee, 
      proSaaSFee,
      proMarketplaceFee,
      targetAmount
    })
    
    // Fetch the template PDF
    const templateBytes = await fetchPDFAsArrayBuffer(templatePath)
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes)
    
    // Get the form from the PDF
    const form = pdfDoc.getForm()
    
    // Get all form fields to see what's available
    const fields = form.getFields()
    console.log('Available combined form fields:', fields.map(field => field.getName()))
    console.log('Total combined form fields found:', fields.length)
    
    // Fill in all the combined pricing fields
    let coreSaaSFeeFieldFound = false
    let proSaaSFeeFieldFound = false
    let coreSaaSFeeOriginalFieldFound = false
    let proSaaSFeeOriginalFieldFound = false
    let proMarketplaceFeeFieldFound = false
    let proMarketplaceFeeOriginalFieldFound = false
    let coreMarketplaceFeeFieldFound = false
    let targetAmountFieldFound = false
    
    // Helper function to round down to nearest 99
    const roundDownToNearest99 = (price: number): number => {
      return Math.floor(price / 100) * 100 - 1
    }
    
    // Calculate prices for yearly (with 12.5% discount)
    let coreOriginalYearly = 0
    let coreDiscountedYearly = 0
    let proOriginalYearly = 0
    let proDiscountedYearly = 0
    let proMarketplaceOriginalYearly = 0
    let proMarketplaceDiscountedYearly = 0
    
    if (cadence === "year" && coreSaaSFee !== -1) {
      coreOriginalYearly = coreSaaSFee * 12
      const discounted = coreOriginalYearly * 0.875 // 12.5% discount
      coreDiscountedYearly = roundDownToNearest99(discounted)
    }
    
    if (cadence === "year" && proSaaSFee !== -1) {
      proOriginalYearly = proSaaSFee * 12
      const discounted = proOriginalYearly * 0.875 // 12.5% discount
      proDiscountedYearly = roundDownToNearest99(discounted)
    }
    
    if (cadence === "year" && proMarketplaceFee !== -1) {
      proMarketplaceOriginalYearly = proMarketplaceFee * 12
      const discounted = proMarketplaceOriginalYearly * 0.875 // 12.5% discount
      proMarketplaceDiscountedYearly = roundDownToNearest99(discounted)
    }
    
    // 1. coreMarketplace.fee (always Free)
    try {
      const coreMarketplaceFeeField = form.getTextField('coreMarketplace.fee')
      if (coreMarketplaceFeeField) {
        coreMarketplaceFeeField.setText('Free')
        coreMarketplaceFeeField.enableReadOnly()
        coreMarketplaceFeeField.disableMultiline()
        console.log('✅ Filled core marketplace fee field: Free')
        coreMarketplaceFeeFieldFound = true
      }
    } catch (error) {
      console.log('ℹ️ Could not find "coreMarketplace.fee" field (may not exist in this template)')
    }
    
    // 2. coreSaaS.feeOriginal (for yearly templates)
    if (cadence === "year") {
      try {
        const coreFeeOriginalField = form.getTextField('coreSaaS.feeOriginal')
        if (coreFeeOriginalField) {
          const feeText = coreSaaSFee === -1 ? 'Custom' : `$${Math.round(coreOriginalYearly).toLocaleString()}/year`
          coreFeeOriginalField.setText(feeText)
          coreFeeOriginalField.enableReadOnly()
          coreFeeOriginalField.disableMultiline()
          console.log('✅ Filled core SaaS fee original field:', feeText)
          coreSaaSFeeOriginalFieldFound = true
        }
      } catch (error) {
        console.log('ℹ️ Could not find "coreSaaS.feeOriginal" field (may not exist in this template)')
      }
    }
    
    // 3. coreSaaS.fee (discounted price for yearly, regular price for monthly)
    try {
      const coreFeeField = form.getTextField('coreSaaS.fee')
      if (coreFeeField) {
        let feeText: string
        if (coreSaaSFee === -1) {
          feeText = 'Custom'
        } else if (cadence === "year") {
          feeText = `$${coreDiscountedYearly.toLocaleString()}/year`
        } else {
          feeText = `$${coreSaaSFee.toLocaleString()}/month`
        }
        coreFeeField.setText(feeText)
        coreFeeField.enableReadOnly()
        coreFeeField.disableMultiline()
        console.log('✅ Filled core SaaS fee field:', feeText)
        coreSaaSFeeFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "coreSaaS.fee" field')
    }
    
    // 4. proSaaS.feeOriginal (for yearly templates)
    if (cadence === "year") {
      try {
        const proFeeOriginalField = form.getTextField('proSaaS.feeOriginal')
        if (proFeeOriginalField) {
          const feeText = proSaaSFee === -1 ? 'Custom' : `$${Math.round(proOriginalYearly).toLocaleString()}/year`
          proFeeOriginalField.setText(feeText)
          proFeeOriginalField.enableReadOnly()
          proFeeOriginalField.disableMultiline()
          console.log('✅ Filled pro SaaS fee original field:', feeText)
          proSaaSFeeOriginalFieldFound = true
        }
      } catch (error) {
        console.log('ℹ️ Could not find "proSaaS.feeOriginal" field (may not exist in this template)')
      }
    }
    
    // 5. proSaaS.fee (discounted price for yearly, regular price for monthly)
    try {
      const proFeeField = form.getTextField('proSaaS.fee')
      if (proFeeField) {
        let feeText: string
        if (proSaaSFee === -1) {
          feeText = 'Custom'
        } else if (cadence === "year") {
          feeText = `$${proDiscountedYearly.toLocaleString()}/year`
        } else {
          feeText = `$${proSaaSFee.toLocaleString()}/month`
        }
        proFeeField.setText(feeText)
        proFeeField.enableReadOnly()
        proFeeField.disableMultiline()
        console.log('✅ Filled pro SaaS fee field:', feeText)
        proSaaSFeeFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "proSaaS.fee" field')
    }
    
    // 6. proMarketplace.feeOriginal (for yearly templates) - primary field name
    // Also try proMarketplace.saasAddOnFeeOriginal as fallback
    if (cadence === "year") {
      try {
        // Try proMarketplace.feeOriginal first (confirmed field name)
        let proMarketplaceFeeOriginalField = null
        try {
          proMarketplaceFeeOriginalField = form.getTextField('proMarketplace.feeOriginal')
          console.log('✅ Found proMarketplace.feeOriginal field in combined template')
        } catch (e) {
          // Try alternative field name as fallback
          try {
            proMarketplaceFeeOriginalField = form.getTextField('proMarketplace.saasAddOnFeeOriginal')
            console.log('✅ Found proMarketplace.saasAddOnFeeOriginal field in combined template (fallback)')
          } catch (e2) {
            console.log('ℹ️ Neither proMarketplace.feeOriginal nor proMarketplace.saasAddOnFeeOriginal found in combined template')
          }
        }
        
        if (proMarketplaceFeeOriginalField) {
          const feeText = proMarketplaceFee === -1 ? 'Custom' : `$${Math.round(proMarketplaceOriginalYearly).toLocaleString()}/year`
          proMarketplaceFeeOriginalField.setText(feeText)
          proMarketplaceFeeOriginalField.enableReadOnly()
          proMarketplaceFeeOriginalField.disableMultiline()
          console.log('✅ Filled pro marketplace fee original field in combined template:', feeText)
          proMarketplaceFeeOriginalFieldFound = true
        } else {
          console.log('⚠️ proMarketplaceFeeOriginalField is null - field not found in combined PDF template')
        }
      } catch (error) {
        console.log('❌ Error trying to fill pro marketplace fee original field in combined template:', error)
      }
    }
    
    // 7. proMarketplace.saasAddOnFee (discounted price for yearly, regular price for monthly)
    try {
      const proMarketplaceField = form.getTextField('proMarketplace.saasAddOnFee')
      if (proMarketplaceField) {
        let feeText: string
        if (proMarketplaceFee === -1) {
          feeText = 'Custom'
        } else if (cadence === "year") {
          feeText = `$${proMarketplaceDiscountedYearly.toLocaleString()}/year`
        } else {
          feeText = `$${proMarketplaceFee.toLocaleString()}/month`
        }
        proMarketplaceField.setText(feeText)
        proMarketplaceField.enableReadOnly()
        proMarketplaceField.disableMultiline()
        console.log('✅ Filled pro marketplace fee field:', feeText)
        proMarketplaceFeeFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "proMarketplace.saasAddOnFee" field')
    }
    
    // 8. coreMarketplace.targetPercentage (using target amount)
    try {
      const targetPercentageField = form.getTextField('coreMarketplace.targetPercentage')
      if (targetPercentageField) {
        // Format the target amount as shortened currency
        const formattedTarget = formatShortenedCurrency(targetAmount)
        
        // Set the text
        targetPercentageField.setText(formattedTarget)
        targetPercentageField.enableReadOnly()
        targetPercentageField.disableMultiline()
        
        // Note: Font setting is not available in this PDF library version
        
        console.log('✅ Filled target amount field:', formattedTarget)
        targetAmountFieldFound = true
      }
    } catch (error) {
      console.log('❌ Could not find "coreMarketplace.targetPercentage" field')
    }
    
    // Log summary of what was found/filled
    console.log('Combined field fill summary:', {
      coreMarketplaceFeeFieldFound,
      coreSaaSFeeFieldFound,
      coreSaaSFeeOriginalFieldFound,
      proSaaSFeeFieldFound,
      proSaaSFeeOriginalFieldFound,
      proMarketplaceFeeFieldFound,
      proMarketplaceFeeOriginalFieldFound,
      targetAmountFieldFound
    })
    
    // Try flattening the form to preserve styling
    try {
      form.flatten()
      console.log('✅ Combined form flattened to preserve original styling')
    } catch (flattenError) {
      console.log('⚠️ Could not flatten combined form:', flattenError)
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' })
    
    console.log('✅ Combined pricing PDF generated successfully')
    return blob
    
  } catch (error) {
    console.error('❌ Error generating combined pricing PDF:', error)
    throw new Error(`Failed to generate combined pricing PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
} 