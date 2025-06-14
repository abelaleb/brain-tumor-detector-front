"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { models, ModelType } from "@/lib/data";

interface SelectedModelInfoProps {
  model: (typeof models)[ModelType];
}
export function SelectedModelInfo({ model }: SelectedModelInfoProps) {
  const ModelIcon = model.icon;
  return (
    <>
      <Card className="mb-8 md:mb-12 bg-white/5 backdrop-blur-sm border-white/10">
        <CardContent className="p-4 md:p-8">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div
              className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${model.bgColor} flex items-center justify-center`}
            >
              <ModelIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-white">
                {model.name}
              </h2>
              <p className="text-gray-300 text-sm md:text-base mt-1 md:mt-2">
                {model.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {model.classes.map((className) => (
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
    </>
  );
}
