import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, BookOpen, Users, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center mb-16">
        <Palette className="mx-auto h-24 w-24 text-primary mb-6" />
        <h1 className="text-5xl font-bold mb-4">Welcome to Atelier Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Nurturing creativity and artistic talent. Explore courses, showcase your portfolio, and connect with a vibrant community of artists.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/ai-prompt-generator">Get Inspired</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<BookOpen className="h-12 w-12 text-accent" />}
          title="Diverse Course Catalog"
          description="From digital illustration to classical sculpting, find the perfect course to hone your skills."
          link="/courses"
          linkText="Browse Courses"
        />
        <FeatureCard
          icon={<Users className="h-12 w-12 text-accent" />}
          title="Vibrant Community"
          description="Connect with fellow students, experienced teachers, and supportive parents in our creative ecosystem."
          link="/student/dashboard" // Placeholder link, could be a community page
          linkText="Join Now"
        />
        <FeatureCard
          icon={<Lightbulb className="h-12 w-12 text-accent" />}
          title="AI-Powered Inspiration"
          description="Stuck on an idea? Our AI Prompt Generator helps spark your next masterpiece."
          link="/ai-prompt-generator"
          linkText="Try the Generator"
        />
      </section>
      
      <section className="mb-16">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Featured Artwork</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-md aspect-square">
              <Image src="https://placehold.co/600x600.png" alt="Featured Art 1" width={600} height={600} className="object-cover w-full h-full" data-ai-hint="abstract painting" />
            </div>
             <div className="rounded-lg overflow-hidden shadow-md aspect-square">
              <Image src="https://placehold.co/600x600.png" alt="Featured Art 2" width={600} height={600} className="object-cover w-full h-full" data-ai-hint="digital landscape" />
            </div>
             <div className="rounded-lg overflow-hidden shadow-md aspect-square">
              <Image src="https://placehold.co/600x600.png" alt="Featured Art 3" width={600} height={600} className="object-cover w-full h-full" data-ai-hint="portrait sketch" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-12 bg-secondary/30 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Ready to Unleash Your Creativity?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Join Atelier Hub today and start your artistic journey.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/student/dashboard">Get Started</Link> 
          {/* Placeholder: should go to signup or role selection if not logged in */}
        </Button>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        <div className="p-4 bg-accent/10 rounded-full mb-4">
          {icon}
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button asChild variant="link" className="text-accent text-lg p-0 h-auto">
          <Link href={link}>{linkText} &rarr;</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
