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
import CommentForm from "./CommentForm";

interface AnalysisResultsProps {
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  feedback: "correct" | "incorrect" | null;
  onFeedback: (isCorrect: boolean) => void;
  onSendForTraining: () => void;
}

export function AnalysisResults({
  isAnalyzing,
  analysisResult,
  feedback,
  onFeedback,
  onSendForTraining,
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
                  className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2 cursor-pointer"
                >
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4" /> Correct
                </Button>
                <Button
                  variant={feedback === "incorrect" ? "destructive" : "outline"}
                  onClick={() => onFeedback(false)}
                  className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2 cursor-pointer"
                >
                  <XCircle className="w-3 h-3 md:w-4 md:h-4" /> Incorrect
                </Button>
              </div>

               {feedback && feedback=="incorrect" &&  (
                <div className="text-center text-white">
                  <div
                    className="flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-2 cursor-pointer"
                  >
                    <Send className="w-3 h-3 md:w-4 md:h-4" /> Send for Training
                  </div>
                  <CommentForm/>
                </div>
              )}
              {
                feedback && feedback === "correct" && (
                  <div className="text-center text-green-500">
                    <p className="text-sm md:text-base">
                      Thank you for your feedback!
                    </p>
                  </div>
                )
              }
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
