"use client";

import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnalysisResult } from "@/app/page";
import { useState } from "react";

interface ImageUploaderProps {
  modelName: string;
  uploadedImage: string | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setAnalysisResult: React.Dispatch<
    React.SetStateAction<AnalysisResult | null>
  >;
  setFeedback: React.Dispatch<
    React.SetStateAction<"correct" | "incorrect" | null>
  >;
  isAnalyzing: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
}

export function ImageUploader({
  modelName,
  uploadedImage,
  setUploadedImage,
  isAnalyzing,
  onImageUpload,
  onAnalyze,
  setAnalysisResult,
  setFeedback,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setAnalysisResult(null);
        setFeedback(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setFeedback(null);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative rounded-xl transition-colors ${
        isDragging ? "border-2 border-purple-500 bg-purple-500/10" : ""
      }`}
    >
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg md:text-xl">
            Medical Image Input
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm md:text-base">
            Upload medical imaging data for {modelName} analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 md:p-12 text-center hover:border-purple-500/50 transition-colors bg-purple-500/5">
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="block cursor-pointer">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-w-full max-h-48 md:max-h-64 mx-auto rounded-lg"
                />
              ) : (
                <div className="space-y-3 md:space-y-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm md:text-lg mb-1 md:mb-2">
                      Drop your medical image here
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm">
                      Supports JPG and PNG
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>

          <Button
            onClick={onAnalyze}
            disabled={!uploadedImage || isAnalyzing}
            className="w-full bg-purple-700 text-white hover:bg-purple-800 font-medium py-2 md:py-3 text-sm md:text-base cursor-pointer"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Image"}
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemoveImage();
            }}
            className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white cursor-pointer opacity-75 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
