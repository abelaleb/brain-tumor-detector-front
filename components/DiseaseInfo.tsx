// components/medical-ai/DiseaseInfo.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelType, models, diseaseInfo } from "@/lib/data";

interface DiseaseInfoProps {
  model: (typeof models)[ModelType];
  diseaseInfo: typeof diseaseInfo;
}

export function DiseaseInfo({ model, diseaseInfo }: DiseaseInfoProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-lg md:text-2xl">
          Medical Information
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm md:text-base">
          Comprehensive information about conditions detected by {model.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={model.types[0]} className="w-full">
          <TabsList className="w-full flex justify-around mb-4 md:mb-6 bg-white/10">
            {model.types.map((condition) => (
              <TabsTrigger
                key={condition}
                value={condition}
                className="text-xs md:text-sm data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-300 cursor-pointer "
              >
                {condition}
              </TabsTrigger>
            ))}
          </TabsList>

          {model.classes.map((condition) => {
            const info = diseaseInfo[condition as keyof typeof diseaseInfo];
            if (!info) return null;

            return (
              <TabsContent
                key={condition}
                value={condition}
                className="space-y-4 md:space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Description Card */}
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
                  {/* Symptoms Card */}
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
                  {/* Treatment Card */}
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
  );
}

