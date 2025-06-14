"use client";

import { CheckCircle, XCircle, Send, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AnalysisResult, ModelType, models } from "@/lib/data";

interface AnalysisResultsProps {
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  feedback: "correct" | "incorrect" | null;
  onFeedback: (isCorrect: boolean) => void;
  onSendForTraining: () => void;
  model: (typeof models)[ModelType];
}

export function AnalysisResults({
  isAnalyzing,
  analysisResult,
  feedback,
  onFeedback,
  onSendForTraining,
  model,
}: AnalysisResultsProps) {
  return (
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

        {analysisResult && !isAnalyzing && (
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

            <div className="space-y-3 md:space-y-4">
              <p className="text-gray-300 text-center text-sm md:text-base">
                Was this prediction accurate?
              </p>
              <div className="flex gap-3 md:gap-4 justify-center">
                <Button
                  variant={feedback === "correct" ? "default" : "outline"}
                  onClick={() => onFeedback(true)}
                  className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2"
                >
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4" /> Correct
                </Button>
                <Button
                  variant={feedback === "incorrect" ? "destructive" : "outline"}
                  onClick={() => onFeedback(false)}
                  className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2"
                >
                  <XCircle className="w-3 h-3 md:w-4 md:h-4" /> Incorrect
                </Button>
              </div>

              {feedback && (
                <div className="text-center">
                  <Button
                    onClick={onSendForTraining}
                    variant="secondary"
                    className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2"
                  >
                    <Send className="w-3 h-3 md:w-4 md:h-4" /> Send for Training
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {!analysisResult && !isAnalyzing && (
          <>
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
            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Getting Started</CardTitle>
                <CardDescription className="text-gray-400">
                  Follow these steps to analyze your medical images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${model.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}
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
                      className={`w-8 h-8 bg-gradient-to-r ${model.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}
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
                      className={`w-8 h-8 bg-gradient-to-r ${model.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
