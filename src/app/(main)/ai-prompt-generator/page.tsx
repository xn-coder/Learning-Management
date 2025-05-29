import ArtPromptGeneratorForm from "@/components/ai/ArtPromptGeneratorForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function AIPromptGeneratorPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
           <Lightbulb className="mx-auto h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-4xl font-bold">AI Art Prompt Generator</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2 max-w-2xl mx-auto">
            Unleash your creativity! Select your preferred style, medium, and subject,
            and let our AI craft a unique art prompt to inspire your next masterpiece.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <ArtPromptGeneratorForm />
        </CardContent>
      </Card>

      <Card className="mt-10 bg-secondary/30">
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>1. <span className="font-semibold text-foreground">Choose Your Criteria:</span> Select from diverse options for art style, medium, and subject matter.</p>
          <p>2. <span className="font-semibold text-foreground">Generate:</span> Click the "Generate Prompt" button.</p>
          <p>3. <span className="font-semibold text-foreground">Get Inspired:</span> Our AI will instantly provide you with a creative and detailed art prompt.</p>
          <p>4. <span className="font-semibold text-foreground">Create:</span> Use the prompt as a starting point for your artwork. Feel free to interpret it uniquely!</p>
        </CardContent>
      </Card>
    </div>
  );
}
