"use client";
import { Card, CardContent } from "@/components/ui/card";
import { models, ModelType } from "@/lib/data";

interface ModelSelectorProps {
  selectedModel: ModelType;
  setSelectedModel: (model: ModelType) => void;
}
export function ModelSelector({
  selectedModel,
  setSelectedModel,
}: ModelSelectorProps) {
  return (
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
  );
}
