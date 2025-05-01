"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { analyzeMriImage } from "@/lib/analyze-mri"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TumorInfoCards from "@/components/tumor-info-cards"
import { Upload, ImagePlus, FileWarning, RefreshCw, Info, AlertTriangle } from "lucide-react"

type AnalysisResult = {
  prediction: "Glioma" | "Meningioma" | "No Tumor" | "Pituitary"
  confidence: number
  heatmapUrl?: string
}

export default function MriAnalyzer() {
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState<string>("original")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string)
        setResult(null)
        analyzeImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true)

    try {
      // In a real application, this would call your ML model API
      const result = await analyzeMriImage(imageData)
      setResult(result)
      setActiveTab("original")
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setImage(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!image ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
            isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-700",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upload Brain MRI Scan</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Drag and drop your MRI image here, or click to select a file
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button onClick={triggerFileInput} className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4" />
                Select Image
              </Button>
            </div>
            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Info className="h-3 w-3 mr-1" />
              Supported formats: JPG, PNG, WEBP
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <Card className="overflow-hidden">
                <div className="p-4 border-b dark:border-gray-700">
                  <h3 className="font-medium">MRI Scan</h3>
                </div>
                <div className="p-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="original">Original</TabsTrigger>
                      {result?.heatmapUrl && <TabsTrigger value="heatmap">Heatmap</TabsTrigger>}
                    </TabsList>
                    <TabsContent value="original" className="m-0">
                      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt="Uploaded MRI scan"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </TabsContent>
                    {result?.heatmapUrl && (
                      <TabsContent value="heatmap" className="m-0">
                        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={result.heatmapUrl || "/placeholder.svg"}
                            alt="Analysis heatmap"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </div>
              </Card>
            </div>

            <div className="flex-1">
              <Card className="h-full">
                <div className="p-4 border-b dark:border-gray-700">
                  <h3 className="font-medium">Analysis Results</h3>
                </div>
                <div className="p-4">
                  {isAnalyzing ? (
                    <div className="space-y-4 py-8">
                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">Analyzing MRI scan...</p>
                        <Progress value={45} className="w-full h-2" />
                      </div>
                    </div>
                  ) : result ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Prediction</h4>
                        <div className="flex items-center">
                          <span
                            className={cn(
                              "text-2xl font-bold",
                              result.prediction === "No Tumor"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400",
                            )}
                          >
                            {result.prediction}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Confidence</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{result.confidence}%</span>
                          </div>
                          <Progress
                            value={result.confidence} 
                            className={cn(
                                "h-2",
                                result.confidence > 80
                                  ? "bg-green-600"
                                  : result.confidence > 50
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              )}
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 mb-2">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span>Medical disclaimer</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          This analysis is for informational purposes only and should not be considered a medical
                          diagnosis. Please consult with a healthcare professional for proper evaluation.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                      <FileWarning className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                      <p>Waiting for analysis to complete...</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={resetAnalysis}
              className="flex items-center gap-2"
              disabled={isAnalyzing}
            >
              <RefreshCw className="h-4 w-4" />
              Try Another Image
            </Button>
          </div>

          {result && <TumorInfoCards activeTumor={result.prediction} />}
        </div>
      )}
    </div>
  )
}
