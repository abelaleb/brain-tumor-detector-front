import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TumorType = "Glioma" | "Meningioma" | "No Tumor" | "Pituitary"

interface TumorInfoCardsProps {
  activeTumor: TumorType
}

export default function TumorInfoCards({ activeTumor }: TumorInfoCardsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tumor Information</h2>

      <Tabs defaultValue={activeTumor.toLowerCase().replace(" ", "-")}>
        <TabsList className="mb-4">
          <TabsTrigger value="glioma">Glioma</TabsTrigger>
          <TabsTrigger value="meningioma">Meningioma</TabsTrigger>
          <TabsTrigger value="no-tumor">No Tumor</TabsTrigger>
          <TabsTrigger value="pituitary">Pituitary</TabsTrigger>
        </TabsList>

        <TabsContent value="glioma">
          <Card>
            <CardHeader>
              <CardTitle>Glioma</CardTitle>
              <CardDescription>Brain tumor that originates in glial cells</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Gliomas are tumors that arise from glial cells, which support and nourish neurons in the brain. They
                  are the most common type of primary brain tumor, accounting for about 30% of all brain and central
                  nervous system tumors.
                </p>
                <div>
                  <h4 className="font-medium mb-1">Key characteristics:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Can occur in different parts of the brain and spinal cord</li>
                    <li>Vary in aggressiveness, from slow-growing to highly malignant</li>
                    <li>May cause headaches, seizures, and neurological symptoms</li>
                    <li>Treatment typically involves surgery, radiation, and chemotherapy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meningioma">
          <Card>
            <CardHeader>
              <CardTitle>Meningioma</CardTitle>
              <CardDescription>Tumor that forms on membranes covering the brain and spinal cord</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Meningiomas develop from the meninges, the membranes that surround the brain and spinal cord. They are
                  the most common type of primary brain tumor, making up about 37% of all primary brain tumors.
                </p>
                <div>
                  <h4 className="font-medium mb-1">Key characteristics:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Usually slow-growing and often benign (non-cancerous)</li>
                    <li>More common in women than men</li>
                    <li>May cause no symptoms if small and grow slowly</li>
                    <li>Treatment options include observation, surgery, and radiation therapy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="no-tumor">
          <Card>
            <CardHeader>
              <CardTitle>No Tumor</CardTitle>
              <CardDescription>Normal brain tissue without tumor presence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  A "No Tumor" result indicates that no evidence of a brain tumor was detected in the MRI scan. This is
                  a positive finding, though it's important to note that this analysis should be confirmed by a medical
                  professional.
                </p>
                <div>
                  <h4 className="font-medium mb-1">Important notes:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Even with no tumor detected, other neurological conditions may be present</li>
                    <li>Regular check-ups are recommended if symptoms persist</li>
                    <li>MRI scans have limitations and small abnormalities may not be detected</li>
                    <li>Always consult with a healthcare provider for a complete evaluation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pituitary">
          <Card>
            <CardHeader>
              <CardTitle>Pituitary Tumor</CardTitle>
              <CardDescription>Tumor that forms in the pituitary gland</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Pituitary tumors develop in the pituitary gland at the base of the brain. This pea-sized gland
                  produces hormones that control many vital body functions.
                </p>
                <div>
                  <h4 className="font-medium mb-1">Key characteristics:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Most are benign adenomas (non-cancerous)</li>
                    <li>Can cause hormonal imbalances affecting growth, reproduction, and metabolism</li>
                    <li>May cause vision problems due to pressure on the optic nerves</li>
                    <li>Treatment options include medication, surgery, and radiation therapy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
