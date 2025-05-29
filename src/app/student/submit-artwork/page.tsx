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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const artworkSubmissionSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500),
  medium: z.string().min(2, { message: "Please specify the medium." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }).optional().or(z.literal('')), // Mocking file upload with URL
  tags: z.string().optional(),
  courseId: z.string().optional(), // Optional: if submitting for a specific course
});

type ArtworkSubmissionFormValues = z.infer<typeof artworkSubmissionSchema>;

// Mock course data for selection
const mockCourses = [
  { id: "course1", name: "Introduction to Digital Painting" },
  { id: "course2", name: "Character Design Fundamentals" },
  { id: "course3", name: "Advanced 3D Modeling" },
];

export default function SubmitArtworkPage() {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<ArtworkSubmissionFormValues>({
    resolver: zodResolver(artworkSubmissionSchema),
    defaultValues: {
      title: "",
      description: "",
      medium: "",
      imageUrl: "",
      tags: "",
    },
  });

  function onSubmit(data: ArtworkSubmissionFormValues) {
    console.log(data); // In a real app, this would call an API
    toast({
      title: "Artwork Submitted!",
      description: `"${data.title}" has been successfully submitted for review.`,
      variant: "default",
    });
    form.reset();
    setPreviewUrl(null);
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("imageUrl", event.target.value); // Update RHF state
    if (artworkSubmissionSchema.shape.imageUrl.safeParse(event.target.value).success) {
      setPreviewUrl(event.target.value);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <FileUp className="h-10 w-10 text-primary" />
            <CardTitle className="text-3xl">Submit Your Artwork</CardTitle>
          </div>
          <CardDescription>Share your latest creation with the community and for review. Fill out the details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artwork Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sunset Over the Peaks" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your artwork, your inspiration, techniques used, etc."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="medium"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Medium</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., Digital Painting, Oil on Canvas" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Associate with Course (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockCourses.map(course => (
                            <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => ( // field is passed but onChange is handled by handleUrlChange
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <ImagePlus className="h-5 w-5 text-muted-foreground"/>
                        <Input 
                          placeholder="https://example.com/your-artwork.png" 
                          value={field.value} // Controlled component
                          onChange={handleUrlChange} // Custom handler for preview
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      For now, please provide a direct URL to your hosted image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {previewUrl && (
                <div className="mt-4 border rounded-md p-4">
                  <FormLabel>Image Preview</FormLabel>
                  <div className="mt-2 aspect-video relative bg-muted rounded overflow-hidden">
                    <img src={previewUrl} alt="Artwork preview" className="object-contain w-full h-full" />
                  </div>
                </div>
              )}
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., landscape, fantasy, character, abstract (comma-separated)" {...field} />
                    </FormControl>
                     <FormDescription>
                      Help others discover your work. Separate tags with commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full md:w-auto">
                <FileUp className="mr-2 h-5 w-5" /> Submit Artwork
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
