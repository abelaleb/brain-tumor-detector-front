"use client";
import { Header } from "@/components/Header";
import { ModelSelector } from "@/components/ModelSelector";
import { SelectedModelInfo } from "@/components/SelectedModelInfo";
import { useState } from "react";
import { models } from "@/lib/data";
import { diseaseInfo } from "@/lib/data";
import { ImageUploader } from "@/components/ImageUploader";
import { AnalysisResults } from "@/components/AnalysisResults";
import { DiseaseInfo } from "@/components/DiseaseInfo";

import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";

type ModelType = "brain-tumor" | "stroke" | "parkinson" | "hemorrhagic";
interface AnalysisResult {
  prediction: string;
  confidence: number;
  timestamp: Date;
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<ModelType>("brain-tumor");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysisResult(null);
        setFeedback(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const modelClasses = models[selectedModel].classes;
      const randomClass =
        modelClasses[Math.floor(Math.random() * modelClasses.length)];
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-100% confidence

      setAnalysisResult({
        prediction: randomClass,
        confidence,
        timestamp: new Date(),
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleFeedback = (isCorrect: boolean) => {
    setFeedback(isCorrect ? "correct" : "incorrect");
    console.log("Feedback submitted:", {
      isCorrect,
      model: selectedModel,
      result: analysisResult,
    });
  };

  const handleSendForTraining = () => {
    console.log("Image sent for training:", {
      model: selectedModel,
      image: uploadedImage,
      feedback,
      result: analysisResult,
    });
    alert("Image sent successfully for future model training!");
  };

  const currentModel = models[selectedModel];
  const ModelIcon = currentModel.icon;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl">
        <Header />
        <ModelSelector
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <SelectedModelInfo model={currentModel} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <ImageUploader
            modelName={currentModel.name}
            uploadedImage={uploadedImage}
            isAnalyzing={isAnalyzing}
            onImageUpload={handleImageUpload}
            onAnalyze={handleAnalyze}
          />
          <AnalysisResults
            isAnalyzing={isAnalyzing}
            analysisResult={analysisResult}
            feedback={feedback}
            onFeedback={handleFeedback}
            onSendForTraining={handleSendForTraining}
            model={currentModel}
          />
        </div>
        <DiseaseInfo model={currentModel} diseaseInfo={diseaseInfo} />
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
