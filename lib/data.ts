// lib/data.ts

import { Brain, Activity, Zap, Target } from "lucide-react";
import { types } from "util";

export type ModelType = "brain-tumor" | "stroke" | "parkinson" | "hemorrhagic";

export interface AnalysisResult {
  prediction: string;
  confidence: number;
  timestamp: Date;
}

export const models = {
  "brain-tumor": {
    name: "Brain Tumor Detection",
    subtitle: "Neurological",
    icon: Brain,
    classes: ["Glioma", "Meningioma", "Pituitary Tumor", "No Tumor"],
    types: ["Glioma", "Meningioma", "Pituitary Tumor"],
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
    types : ["Bleeding", "Ischemia"],
    description: "Rapid stroke classification for emergency diagnosis",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500",
  },
  parkinson: {
    name: "Parkinson's Detection",
    subtitle: "Movement Disorders",
    icon: Zap,
    classes: ["Parkinson's", "Normal"],
    types: ["Parkinson's"],
    description: "Early detection of Parkinson's disease markers",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500",
  },
  hemorrhagic: {
    name: "Hemorrhagic Detection",
    subtitle: "Emergency",
    icon: Target,
    classes: ["Hemorrhagic", "Normal"],
    types: ["Hemorrhagic"],
    description: "Detection of hemorrhagic conditions",
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-500",
  },
};

export const diseaseInfo = {
  Glioma: {
    name: "Glioma",
    description:
      "A type of brain tumor that originates from glial cells, which support nerve cells in the brain.",
    symptoms: [
      "Headaches",
      "Seizures",
      "Memory problems",
      "Personality changes",
      "Vision problems",
    ],
    treatment:
      "Treatment typically involves surgery, radiation therapy, and chemotherapy depending on grade and location.",
    severity: "high",
  },
  Meningioma: {
    name: "Meningioma",
    description:
      "A tumor that arises from the meninges, the membranes that surround the brain and spinal cord.",
    symptoms: [
      "Headaches",
      "Vision changes",
      "Hearing loss",
      "Memory loss",
      "Seizures",
    ],
    treatment:
      "Often treated with surgical removal, radiation therapy may be used for inoperable cases.",
    severity: "medium",
  },
  "Pituitary Tumor": {
    name: "Pituitary Tumor",
    description:
      "A growth of abnormal cells in the pituitary gland, affecting hormone production.",
    symptoms: [
      "Vision problems",
      "Headaches",
      "Hormonal imbalances",
      "Fatigue",
      "Mood changes",
    ],
    treatment:
      "Treatment includes medication, surgery, or radiation therapy depending on tumor type and size.",
    severity: "medium",
  },
  Bleeding: {
    name: "Cerebral Hemorrhage",
    description:
      "Bleeding in the brain caused by the rupture of blood vessels, requiring immediate medical attention.",
    symptoms: [
      "Sudden severe headache",
      "Weakness",
      "Nausea",
      "Vision changes",
      "Loss of consciousness",
    ],
    treatment:
      "Emergency treatment to control bleeding, reduce pressure, and prevent complications.",
    severity: "high",
  },
  Ischemia: {
    name: "Cerebral Ischemia",
    description:
      "Reduced blood flow to the brain, potentially leading to stroke if not treated promptly.",
    symptoms: [
      "Sudden weakness",
      "Speech difficulties",
      "Vision loss",
      "Dizziness",
      "Confusion",
    ],
    treatment:
      "Immediate treatment with clot-busting drugs or mechanical thrombectomy within critical time window.",
    severity: "high",
  },
  "Parkinson's": {
    name: "Parkinson's Disease",
    description:
      "A progressive nervous system disorder affecting movement, caused by decreased dopamine production.",
    symptoms: [
      "Tremor",
      "Bradykinesia",
      "Muscle rigidity",
      "Postural instability",
      "Speech changes",
    ],
    treatment:
      "Managed with medications, physical therapy, and in some cases, deep brain stimulation.",
    severity: "medium",
  },
  Hemorrhagic: {
    name: "Hemorrhagic Condition",
    description:
      "Abnormal bleeding condition that may affect various organs and require immediate medical evaluation.",
    symptoms: [
      "Unexplained bleeding",
      "Easy bruising",
      "Fatigue",
      "Weakness",
      "Shortness of breath",
    ],
    treatment:
      "Treatment varies based on underlying cause and may include medications or surgical intervention.",
    severity: "high",
  },
};
