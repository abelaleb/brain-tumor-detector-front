"use client";
import { Brain, Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { models, ModelType } from "@/lib/data";
interface HeaderProps {
  model: (typeof models)[ModelType];
}
export function Header({ model }: HeaderProps) {
  return (
    <div className="relative text-center mb-8 md:mb-16">
      <div className="fixed top-5 right-5">
        <Dialog>
          <DialogTrigger className="text-white hover:text-gray-300 transition-colors duration-200 z-50">
            {/* <Button variant="ghost"> */}
            <Info className="w-6 h-6 text-white cursor-pointer" />
            {/* </Button> */}
          </DialogTrigger>

          <DialogContent className="p-0 m-0 border-0 max-w-lg w-full rounded-sm border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10  backdrop-blur-sm">
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 rounded-sm">
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
                        Upload a clear medical scan (MRI scan.)
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
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
          <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
          NeuroScopeAI
        </h1>
      </div>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
        Advanced AI-powered medical imaging analysis for rapid and accurate
        diagnosis
      </p>
    </div>
  );
}
