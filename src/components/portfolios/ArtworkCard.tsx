import type { Artwork } from '@/data/students';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Maximize2, CalendarDays, Brush } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Card className="overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer">
            <AspectRatio ratio={4 / 3}>
              <Image 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                layout="fill" 
                objectFit="cover" 
                className="transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={`${artwork.medium} student art`}
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 className="h-12 w-12 text-white" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{artwork.title}</DialogTitle>
            <DialogDescription>{artwork.description}</DialogDescription>
          </DialogHeader>
          <div className="relative w-full aspect-[4/3]">
            <Image 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                layout="fill" 
                objectFit="contain" 
                className="rounded-t-lg"
                data-ai-hint={`${artwork.medium} student art detail`}
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">{artwork.title}</h3>
            <p className="text-sm text-muted-foreground mb-1 flex items-center"><Brush size={16} className="mr-2"/> {artwork.medium}</p>
            {artwork.dimensions && <p className="text-sm text-muted-foreground mb-1">Dimensions: {artwork.dimensions}</p>}
            <p className="text-sm text-muted-foreground mb-4 flex items-center"><CalendarDays size={16} className="mr-2"/> Submitted: {new Date(artwork.submissionDate).toLocaleDateString()}</p>
            <p className="text-foreground leading-relaxed">{artwork.description}</p>
          </div>
        </DialogContent>
      </Dialog>
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg truncate">{artwork.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3 pt-0">
        <p className="text-xs text-muted-foreground flex items-center"><Brush size={12} className="mr-1.5"/> {artwork.medium}</p>
        <p className="text-xs text-muted-foreground flex items-center mt-1"><CalendarDays size={12} className="mr-1.5"/> {new Date(artwork.submissionDate).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  );
}
