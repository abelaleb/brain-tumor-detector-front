"use client";

import { useState } from "react";
import {
  Upload,
  Brain,
  Activity,
  Zap,
  Target,
  CheckCircle,
  XCircle,
  Send,
  Info,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

type ModelType = "brain-tumor" | "stroke" | "parkinson" | "hemorrhagic";

interface AnalysisResult {
  prediction: string;
  confidence: number;
  timestamp: Date;
}

const models = {
  "brain-tumor": {
    name: "Brain Tumor Detection",
    subtitle: "Neurological",
    icon: Brain,
    classes: ["Glioma", "Meningioma", "Pituitary Tumor", "No Tumor"],
    description:
      "Advanced AI model for detecting and classifying brain tumors from MRI scans",
    color: "from-pink-500 to-purple-600",
    bgColor: "bg-pink-500",
  },
  stroke: {
    name: "Stroke Analysis",
    subtitle: "Vascular",
    icon: Activity,
    classes: ["Bleeding", "Ischemia", "Normal"],
    description: "Rapid stroke classification for emergency diagnosis",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500",
  },
  parkinson: {
    name: "Parkinson's Detection",
    subtitle: "Movement Disorders",
    icon: Zap,
    classes: ["Parkinson's", "Normal"],
    description: "Early detection of Parkinson's disease markers",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500",
  },
  hemorrhagic: {
    name: "Hemorrhagic Detection",
    subtitle: "Emergency",
    icon: Target,
    classes: ["Hemorrhagic", "Normal"],
    description: "Detection of hemorrhagic conditions",
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-500",
  },
};

const diseaseInfo = {
  Glioma: {
    description:
      "A type of brain tumor that originates from glial cells. Gliomas can be benign or malignant and are classified by grade.",
    symptoms: ["Headaches", "Seizures", "Cognitive changes", "Motor weakness"],
    treatment:
      "Treatment may include surgery, radiation therapy, chemotherapy, or targeted therapy depending on the grade and location.",
  },
  Meningioma: {
    description:
      "A tumor that forms on membranes covering the brain and spinal cord. Most meningiomas are benign.",
    symptoms: ["Headaches", "Vision problems", "Hearing loss", "Memory loss"],
    treatment:
      "Treatment options include observation, surgery, or radiation therapy depending on size and symptoms.",
  },
  "Pituitary Tumor": {
    description:
      "Tumors that form in the pituitary gland, which can affect hormone production.",
    symptoms: ["Hormone imbalances", "Vision problems", "Headaches", "Fatigue"],
    treatment:
      "Treatment may involve medication, surgery, or radiation therapy based on tumor type and size.",
  },
  "No Tumor": {
    description: "Normal brain tissue without any detectable tumor formations.",
    symptoms: ["No pathological symptoms"],
    treatment: "No treatment required. Regular monitoring may be recommended.",
  },
  Bleeding: {
    description:
      "Hemorrhagic stroke occurs when a blood vessel in the brain ruptures, causing bleeding.",
    symptoms: [
      "Sudden severe headache",
      "Weakness",
      "Confusion",
      "Loss of consciousness",
    ],
    treatment:
      "Emergency treatment focuses on controlling bleeding and reducing brain pressure.",
  },
  Ischemia: {
    description:
      "Ischemic stroke occurs when blood flow to the brain is blocked by a clot.",
    symptoms: [
      "Sudden weakness",
      "Speech difficulties",
      "Vision loss",
      "Coordination problems",
    ],
    treatment:
      "Treatment includes clot-busting medications and mechanical thrombectomy when appropriate.",
  },
  "Parkinson's": {
    description:
      "A progressive neurological disorder affecting movement, caused by dopamine-producing cell loss.",
    symptoms: ["Tremor", "Rigidity", "Bradykinesia", "Postural instability"],
    treatment:
      "Treatment includes medications, physical therapy, and in some cases, deep brain stimulation.",
  },
  Hemorrhagic: {
    description:
      "Bleeding within or around the brain, which can be life-threatening.",
    symptoms: [
      "Sudden severe headache",
      "Nausea",
      "Vomiting",
      "Altered consciousness",
    ],
    treatment:
      "Emergency treatment to control bleeding and reduce intracranial pressure.",
  },
  Normal: {
    description: "No pathological findings detected in the medical imaging.",
    symptoms: ["No pathological symptoms"],
    treatment: "No treatment required. Continue regular health monitoring.",
  },
};

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
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              MedAI Diagnostics
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Advanced AI-powered medical imaging analysis for rapid and accurate
            diagnosis
          </p>
        </div>

        {/* Model Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {Object.entries(models).map(([key, model]) => {
            const Icon = model.icon;
            const isSelected = selectedModel === key;

            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 backdrop-blur-sm ${
                  isSelected
                    ? "border-white/30 bg-white/10 shadow-2xl"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
                onClick={() => setSelectedModel(key as ModelType)}
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl ${model.bgColor} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-white text-sm md:text-lg font-semibold mb-1 md:mb-2">
                    {model.name}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm">
                    {model.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selected Model Info */}
        <Card className="mb-8 md:mb-12 bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-4 md:p-8">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div
                className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${currentModel.bgColor} flex items-center justify-center`}
              >
                <ModelIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-white">
                  {currentModel.name}
                </h2>
                <p className="text-gray-300 text-sm md:text-base mt-1 md:mt-2">
                  {currentModel.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {currentModel.classes.map((className) => (
                <Badge
                  key={className}
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 text-xs md:text-sm px-2 md:px-3 py-1"
                >
                  {className}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Analysis Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Upload Section */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-lg md:text-xl">
                Medical Image Input
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm md:text-base">
                Upload medical imaging data for {currentModel.name} analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 md:p-12 text-center hover:border-purple-500/50 transition-colors bg-purple-500/5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
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
                          Supports DICOM, JPG, PNG up to 50MB
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!uploadedImage || isAnalyzing}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 md:py-3 text-sm md:text-base"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-lg md:text-xl">
                Diagnostic Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="space-y-4 md:space-y-6">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-300 text-sm md:text-base">
                      AI analysis in progress...
                    </p>
                  </div>
                  <Progress value={33} className="w-full" />
                </div>
              )}

              {analysisResult && (
                <div className="space-y-4 md:space-y-6">
                  <div className="text-center">
                    <Badge
                      variant="secondary"
                      className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3 mb-4 md:mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0"
                    >
                      {analysisResult.prediction}
                    </Badge>
                    <div className="space-y-2 md:space-y-3">
                      <p className="text-gray-300 text-sm md:text-base">
                        Confidence Level
                      </p>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Progress
                          value={analysisResult.confidence}
                          className="flex-1"
                        />
                        <span className="text-white font-semibold text-sm md:text-base">
                          {analysisResult.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  {/* Feedback Section */}
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-gray-300 text-center text-sm md:text-base">
                      Was this prediction accurate?
                    </p>
                    <div className="flex gap-3 md:gap-4 justify-center">
                      <Button
                        variant={feedback === "correct" ? "default" : "outline"}
                        onClick={() => handleFeedback(true)}
                        className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2"
                      >
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                        Correct
                      </Button>
                      <Button
                        variant={
                          feedback === "incorrect" ? "destructive" : "outline"
                        }
                        onClick={() => handleFeedback(false)}
                        className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2"
                      >
                        <XCircle className="w-3 h-3 md:w-4 md:h-4" />
                        Incorrect
                      </Button>
                    </div>

                    {feedback && (
                      <div className="text-center">
                        <Button
                          onClick={handleSendForTraining}
                          variant="secondary"
                          className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2"
                        >
                          <Send className="w-3 h-3 md:w-4 md:h-4" />
                          Send for Training
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!analysisResult && !isAnalyzing && (
                <div className="text-center text-gray-400 py-6 md:py-12">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Eye className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                  </div>
                  <p className="text-sm md:text-base mb-1">
                    Upload medical imaging data
                  </p>
                  <p className="text-xs md:text-sm opacity-70">
                    AI analysis will appear here
                  </p>
                </div>
              )}
              {!analysisResult && !isAnalyzing && (
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Getting Started
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Follow these steps to analyze your medical images
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-8 h-8 bg-gradient-to-r ${currentModel.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}
                        >
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            Select AI Model
                          </h4>
                          <p className="text-sm text-gray-400">
                            Choose the appropriate model using the tabs above
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-8 h-8 bg-gradient-to-r ${currentModel.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}
                        >
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            Upload Medical Image
                          </h4>
                          <p className="text-sm text-gray-400">
                            Upload a clear medical scan (MRI, CT, X-ray, etc.)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-8 h-8 bg-gradient-to-r ${currentModel.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}
                        >
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            Get AI Analysis
                          </h4>
                          <p className="text-sm text-gray-400">
                            Receive detailed analysis with confidence scores and
                            disease information
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Disease Information */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg md:text-2xl">
              Medical Information
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm md:text-base">
              Comprehensive information about conditions detected by{" "}
              {currentModel.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={currentModel.classes[0]} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-4 md:mb-6 bg-white/10">
                {currentModel.classes.map((condition) => (
                  <TabsTrigger
                    key={condition}
                    value={condition}
                    className="text-xs md:text-sm data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-300"
                  >
                    {condition}
                  </TabsTrigger>
                ))}
              </TabsList>

              {currentModel.classes.map((condition) => {
                const info = diseaseInfo[condition as keyof typeof diseaseInfo];
                if (!info) return null;

                return (
                  <TabsContent
                    key={condition}
                    value={condition}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <Card className="bg-white/5 border-white/10">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-base md:text-lg">
                            Description
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {info.description}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/5 border-white/10">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-base md:text-lg">
                            Symptoms
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-gray-300 space-y-2">
                            {info.symptoms.map((symptom, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-sm md:text-base"
                              >
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/5 border-white/10">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-base md:text-lg">
                            Treatment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {info.treatment}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Alert className="mt-6 md:mt-8 bg-amber-900/20 border-amber-600/30 backdrop-blur-sm">
          <Info className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200 text-xs md:text-sm">
            <strong>Medical Disclaimer:</strong> This AI diagnostic tool is for
            educational and research purposes only. Always consult with
            qualified healthcare professionals for medical diagnosis and
            treatment decisions.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
