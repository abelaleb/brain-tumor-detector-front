import { Suspense } from "react"
import MriAnalyzer from "@/components/mri-analyzer"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Brain tumor detector</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload a brain MRI scan to analyze and detect potential conditions including Glioma, Meningioma, and
            Pituitary tumors.
          </p>
        </header>

        <Suspense fallback={<div className="text-center">Loading analyzer...</div>}>
          <MriAnalyzer />
        </Suspense>

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This tool is not a substitute for professional medical diagnosis. Always
            consult with a qualified healthcare provider for medical advice.
          </p>
          <p>
            © {new Date().getFullYear()} Brain MRI Analyzer. All uploaded images are processed locally and not stored.
          </p>
        </footer>
      </div>
      <Toaster />
    </main>
  )
}
