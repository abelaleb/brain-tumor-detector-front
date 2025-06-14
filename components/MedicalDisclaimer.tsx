"use client";

import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function MedicalDisclaimer() {
  return (
    <Alert className="mt-6 md:mt-8 bg-amber-900/20 border-amber-600/30 backdrop-blur-sm">
      <Info className="h-4 w-4 text-amber-400" />
      <AlertDescription className="text-amber-200 text-xs md:text-sm">
        <strong>Medical Disclaimer:</strong> This AI diagnostic tool is for
        educational and research purposes only. Always consult with qualified
        healthcare professionals for medical diagnosis and treatment decisions.
      </AlertDescription>
    </Alert>
  );
}