"use client";
import { Brain } from "lucide-react";

export function Header() {
  return (
    <div className="text-center mb-8 md:mb-16">
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
