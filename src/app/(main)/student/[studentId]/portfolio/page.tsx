import { students, type Student } from '@/data/students';
import ArtworkCard from '@/components/portfolios/ArtworkCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ExternalLink, Edit, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


// This component is for the route /student/my-portfolio
// For actual /student/[studentId]/portfolio, you would fetch student by studentId param
// For this example, we'll hardcode to student with id '1' for "My Portfolio"

export default function StudentPortfolioPage({ params }: { params?: { studentId?: string } }) {
  // If params.studentId is present, use it. Otherwise, default to '1' for "My Portfolio"
  const studentIdToShow = params?.studentId || '1';
  const student = students.find((s) => s.id === studentIdToShow);

  if (!student) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold mb-2">Student Not Found</h1>
        <p className="text-muted-foreground">Sorry, we couldn't find a portfolio for this student.</p>
      </div>
    );
  }

  const isOwnPortfolio = studentIdToShow === '1'; // Example logic for "My Portfolio"

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-10 shadow-xl overflow-hidden">
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary via-accent to-secondary">
           {/* Optional: Could be a banner image specific to student */}
           <Image src="https://placehold.co/1200x300.png" alt={`${student.name}'s banner`} layout="fill" objectFit="cover" data-ai-hint="abstract colorful banner" />
           <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="p-6 md:p-8 relative -mt-20 md:-mt-24">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-card shadow-lg">
              <AvatarImage src={student.profileImageUrl} alt={student.name} data-ai-hint="artist portrait" />
              <AvatarFallback className="text-4xl">{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold text-card-foreground">{student.name}</h1>
              <p className="text-lg text-primary font-medium">{student.major}</p>
              <p className="text-sm text-muted-foreground">Year {student.year}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Contact</Button>
              {isOwnPortfolio && (
                 <Button variant="default"><Edit className="mr-2 h-4 w-4" /> Edit Portfolio</Button>
              )}
            </div>
          </div>
          <p className="mt-6 text-muted-foreground max-w-3xl mx-auto md:mx-0">{student.bio}</p>
          {student.socialLinks && student.socialLinks.length > 0 && (
            <div className="mt-4 flex gap-4 justify-center md:justify-start">
              {student.socialLinks.map(link => (
                <Button key={link.platform} variant="ghost" size="sm" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> {link.platform}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>

      <h2 className="text-3xl font-semibold mb-8 text-center md:text-left">Artwork Gallery</h2>
      {student.artworks.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {student.artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold">No Artwork Yet</h3>
          <p className="text-muted-foreground">This artist hasn't added any artwork to their portfolio.</p>
          {isOwnPortfolio && (
            <Button asChild className="mt-4">
              <Link href="/student/submit-artwork">Add Your First Piece</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
