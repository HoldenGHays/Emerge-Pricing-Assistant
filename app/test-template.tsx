"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generatePricingPDFFromTemplate, generatePricingPDFWithTextReplacement, downloadPDF } from "@/lib/pdf-utils"

export default function TestTemplate() {
  const [monthlyPrice, setMonthlyPrice] = useState("1000")
  const [proMonthlyPrice, setProMonthlyPrice] = useState("2000")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string>("")
  const [method, setMethod] = useState<"form-fields" | "text-replacement">("text-replacement")

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      console.log('Testing template-based PDF generation...')
      
      // Use the new template with form fields
      const templatePath = "/templates/test-generated-pricing (2).pdf"
      const monthlyPriceNum = parseInt(monthlyPrice) || 0
      const proMonthlyPriceNum = parseInt(proMonthlyPrice) || 0
      
      let generatedPdf: Blob
      
      if (method === "form-fields") {
        generatedPdf = await generatePricingPDFFromTemplate(
          templatePath, 
          monthlyPriceNum, 
          proMonthlyPriceNum
        )
      } else {
        generatedPdf = await generatePricingPDFWithTextReplacement(
          templatePath, 
          monthlyPriceNum, 
          proMonthlyPriceNum
        )
      }
      
      console.log('Generated PDF blob:', generatedPdf)
      console.log('Blob size:', generatedPdf.size)
      console.log('Blob type:', generatedPdf.type)
      
      // Create a blob URL for preview
      const url = URL.createObjectURL(generatedPdf)
      console.log('Created blob URL:', url)
      
      setGeneratedPdfUrl(url)
      console.log('Set generatedPdfUrl state to:', url)
      
      console.log('PDF generated successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Check console for details.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (generatedPdfUrl) {
      // Convert blob URL back to blob for download
      fetch(generatedPdfUrl)
        .then(res => res.blob())
        .then(blob => {
          downloadPDF(blob, "test-generated-pricing.pdf")
        })
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Template PDF Generation Test</h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="monthly-price">Monthly Price ($)</Label>
          <Input
            id="monthly-price"
            type="number"
            value={monthlyPrice}
            onChange={(e) => setMonthlyPrice(e.target.value)}
            placeholder="1000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pro-monthly-price">Pro Monthly Price ($)</Label>
          <Input
            id="pro-monthly-price"
            type="number"
            value={proMonthlyPrice}
            onChange={(e) => setProMonthlyPrice(e.target.value)}
            placeholder="2000"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Generation Method</Label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="form-fields"
                checked={method === "form-fields"}
                onChange={(e) => setMethod(e.target.value as "form-fields" | "text-replacement")}
                className="w-4 h-4"
              />
              <span>Form Fields (if available)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="text-replacement"
                checked={method === "text-replacement"}
                onChange={(e) => setMethod(e.target.value as "form-fields" | "text-replacement")}
                className="w-4 h-4"
              />
              <span>Text Replacement</span>
            </label>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button 
            onClick={handleGeneratePDF} 
            disabled={isGenerating}
            className="flex-1"
          >
            {isGenerating ? "Generating..." : "Generate PDF"}
          </Button>
          
          {generatedPdfUrl && (
            <Button onClick={handleDownload} variant="outline">
              Download PDF
            </Button>
          )}
        </div>
        
        {generatedPdfUrl && (
          <div className="space-y-2">
            <Label>Generated PDF Preview:</Label>
            <div className="text-sm text-gray-600 mb-2">
              Debug: PDF URL = {generatedPdfUrl}
            </div>
            <iframe
              src={generatedPdfUrl}
              className="w-full h-96 border border-gray-300 rounded"
              title="Generated PDF Preview"
              onLoad={() => console.log('PDF iframe loaded successfully')}
              onError={(e) => console.error('PDF iframe error:', e)}
            />
          </div>
        )}
      </div>
    </div>
  )
} 