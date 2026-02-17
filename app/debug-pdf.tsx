"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { fetchPDFAsArrayBuffer } from "@/lib/pdf-utils"
import { PDFDocument } from 'pdf-lib'

export default function DebugPDF() {
  const [isLoading, setIsLoading] = useState(false)
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const [pdfInfo, setPdfInfo] = useState<any>(null)
  const [error, setError] = useState<string>("")

  const analyzePDF = async () => {
    setIsLoading(true)
    setError("")
    setFieldNames([])
    setPdfInfo(null)
    
    try {
      console.log('Analyzing PDF template...')
      
      const templatePath = "/templates/test-generated-pricing (2).pdf"
      const templateBytes = await fetchPDFAsArrayBuffer(templatePath)
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(templateBytes)
      
      // Get basic PDF info
      const pageCount = pdfDoc.getPageCount()
      const pages = pdfDoc.getPages()
      
      const info = {
        pageCount,
        pageSizes: pages.map((page, index) => ({
          pageNumber: index + 1,
          width: page.getWidth(),
          height: page.getHeight()
        }))
      }
      
      setPdfInfo(info)
      console.log('PDF Info:', info)
      
      // Get the form from the PDF
      const form = pdfDoc.getForm()
      
      // Get all form fields
      const fields = form.getFields()
      const names = fields.map(field => field.getName())
      
      console.log('Found form fields:', names)
      console.log('Total fields:', fields.length)
      
      setFieldNames(names)
      
      // Also log field types
      fields.forEach(field => {
        console.log(`Field: "${field.getName()}" - Type: ${field.constructor.name}`)
      })
      
      if (fields.length === 0) {
        console.log('⚠️ No form fields found! This PDF likely contains static text only.')
        console.log('You may need to create a new PDF template with actual form fields.')
      }
      
    } catch (error) {
      console.error('Error analyzing PDF:', error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">PDF Form Field Debugger</h1>
      
      <div className="space-y-6">
        <Button 
          onClick={analyzePDF} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Analyzing PDF..." : "Analyze PDF Template"}
        </Button>
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 font-medium">Error:</p>
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {pdfInfo && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">PDF Information:</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><strong>Page Count:</strong> {pdfInfo.pageCount}</p>
              {pdfInfo.pageSizes.map((page: any, index: number) => (
                <p key={index}>
                  <strong>Page {page.pageNumber}:</strong> {page.width.toFixed(0)} × {page.height.toFixed(0)} points
                </p>
              ))}
            </div>
          </div>
        )}
        
        {fieldNames.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Found Form Fields ({fieldNames.length}):</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <ul className="space-y-2">
                {fieldNames.map((name, index) => (
                  <li key={index} className="font-mono text-sm bg-white p-2 rounded border">
                    "{name}"
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
              <ol className="text-blue-700 space-y-1 text-sm">
                <li>1. Look for fields that contain "price", "monthly", or "procureos"</li>
                <li>2. Copy the exact field names (including quotes)</li>
                <li>3. Update the code to use these exact field names</li>
              </ol>
            </div>
          </div>
        ) : fieldNames.length === 0 && !isLoading && !error ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">No Form Fields Found</h2>
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Issue Detected:</h3>
              <p className="text-yellow-700 mb-3">
                Your PDF template doesn't contain any form fields. The text you see like "ProcureOS Monthly Price /mo" 
                is likely static text that cannot be programmatically filled.
              </p>
              <h4 className="font-semibold text-yellow-800 mb-2">Solutions:</h4>
              <ol className="text-yellow-700 space-y-1 text-sm">
                <li>1. <strong>Create a new PDF template</strong> with actual form fields using Adobe Acrobat or similar tools</li>
                <li>2. <strong>Use text replacement</strong> - we can modify the approach to replace text directly in the PDF</li>
                <li>3. <strong>Use a different template format</strong> like HTML that gets converted to PDF</li>
              </ol>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
} 