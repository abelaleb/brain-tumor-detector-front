# 🧠 Brain Tumor Detector Frontend

This is the **frontend React app** built with **Next.js**, allowing users to upload Brain MRI images and receive AI-driven predictions for tumor types.

## 🚀 Features

- Drag-and-drop or click to upload MRI scans
- Real-time analysis results with prediction & confidence
- Heatmap visualization (optional)
- Responsive UI using TailwindCSS and shadcn/ui
- Supports formats: JPG, PNG, WEBP (max size 10MB)

## 📦 Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mri-analyzer-frontend.git
cd mri-analyzer-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a .env.local file and set your API endpoint:

```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run the development server

```bash
npm run dev
```

App will run at: http://localhost:3000

### Test Prediction

- Upload a valid MRI scan (JPG/PNG).
- Wait for the analysis result.
- See prediction, confidence, and optional heatmap.
