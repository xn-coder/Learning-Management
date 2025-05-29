import { courses, type Course } from '@/data/courses';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, BarChart, User, List, AlertTriangle, BookCheck, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id,
  }));
}

interface CourseDetailsPageProps {
  params: { courseId: string };
}

export default function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const course = courses.find((c) => c.id === params.courseId);

  if (!course) {
    return (
        <div className="container mx-auto py-12 px-4 text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
            <h1 className="text-3xl font-bold mb-2">Course Not Found</h1>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the course you're looking for.</p>
            <Button asChild>
            <Link href="/courses">Back to Course Catalog</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="overflow-hidden shadow-xl">
            {course.imageUrl && (
              <div className="relative w-full h-64 md:h-96">
                <Image 
                    src={course.imageUrl} 
                    alt={course.title} 
                    layout="fill" 
                    objectFit="cover" 
                    priority 
                    data-ai-hint={`${course.category} learning`}
                />
              </div>
            )}
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'outline' : 'destructive'} className="capitalize">
                    {course.level}
                </Badge>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold">{course.title}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground pt-1">
                Taught by <span className="font-semibold text-primary">{course.instructor}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{course.description}</p>
            </CardContent>
          </Card>

          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCheck className="h-6 w-6 text-primary" /> Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" /> 
                        <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {course.lessons && course.lessons.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><List className="h-6 w-6 text-primary" /> Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-md bg-muted/30">
                      <span className="font-medium">{index + 1}. {lesson.title}</span>
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-5 w-5"/> Duration:</span>
                <span className="font-semibold">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><BarChart className="h-5 w-5"/> Level:</span>
                <span className="font-semibold">{course.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><User className="h-5 w-5"/> Instructor:</span>
                <span className="font-semibold">{course.instructor}</span>
              </div>
               <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Users className="h-5 w-5"/> Enrolled:</span>
                <span className="font-semibold">123 Students</span> {/* Placeholder */}
              </div>
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div>
                    <h4 className="text-muted-foreground font-medium mt-3 mb-1">Prerequisites:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {course.prerequisites.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                </div>
              )}
               <div className="pt-4">
                 <Button size="lg" className="w-full">Enroll Now</Button>
               </div>
            </CardContent>
          </Card>
          
          {course.tags && course.tags.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {course.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                    ))}
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
