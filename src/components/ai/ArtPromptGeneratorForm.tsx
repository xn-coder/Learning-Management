"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateArtPrompt, type GenerateArtPromptInput, type GenerateArtPromptOutput } from "@/ai/flows/generate-art-prompt";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Copy } from "lucide-react";

const artPromptSchema = z.object({
  style: z.string().min(1, { message: "Please select a style." }),
  medium: z.string().min(1, { message: "Please select a medium." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
});

type ArtPromptFormValues = z.infer<typeof artPromptSchema>;

const styles = ["Abstract", "Impressionism", "Pop Art", "Surrealism", "Realism", "Fantasy", "Sci-Fi", "Minimalist", "Cyberpunk"];
const mediums = ["Oil on canvas", "Watercolor", "Digital painting", "Sculpture", "Pencil Sketch", "Ink Drawing", "3D Render", "Photography"];
const subjects = ["Portrait", "Landscape", "Still life", "Animals", "Architecture", "Mythology", "Dreams", "Emotions", "Technology"];

export default function ArtPromptGeneratorForm() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ArtPromptFormValues>({
    resolver: zodResolver(artPromptSchema),
    defaultValues: {
      style: "",
      medium: "",
      subject: "",
    },
  });

  async function onSubmit(data: ArtPromptFormValues) {
    setIsLoading(true);
    setGeneratedPrompt(null);
    try {
      const result: GenerateArtPromptOutput = await generateArtPrompt(data as GenerateArtPromptInput);
      setGeneratedPrompt(result.prompt);
      toast({
        title: "Prompt Generated!",
        description: "Your unique art prompt is ready.",
      });
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      toast({
        title: "Copied to clipboard!",
        description: "Prompt copied successfully.",
      });
    }
  };


  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Art Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {styles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medium</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a medium" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mediums.map(medium => <SelectItem key={medium} value={medium}>{medium}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Matter</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map(subject => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Prompt
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-6 p-6 border rounded-lg bg-muted/50 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-muted-foreground">Generating your creative prompt...</p>
        </div>
      )}

      {generatedPrompt && !isLoading && (
        <div className="mt-8 p-6 border-2 border-dashed border-primary/50 rounded-lg bg-primary/5 relative">
          <h3 className="text-xl font-semibold mb-3 text-primary">Your Generated Prompt:</h3>
          <Textarea
            value={generatedPrompt}
            readOnly
            className="min-h-[100px] text-base bg-background focus:ring-0 focus:border-primary"
            rows={4}
          />
          <Button onClick={copyToClipboard} variant="outline" size="sm" className="absolute top-4 right-4">
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
        </div>
      )}
    </div>
  );
}
