import type { Course } from '@/data/courses';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Clock, BarChart, Tag, User } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {course.imageUrl && (
        <div className="relative w-full h-48">
          <Image 
            src={course.imageUrl} 
            alt={course.title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={`${course.category} art`}
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-1">
          <Badge variant="secondary" className="text-xs">{course.category}</Badge>
          <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'outline' : 'destructive'} className="capitalize">
            {course.level}
          </Badge>
        </div>
        <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </CardTitle>
        <CardDescription className="text-xs flex items-center gap-1 text-muted-foreground">
          <User className="w-3 h-3" /> {course.instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{course.duration}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3">
        <div className="flex flex-wrap gap-1">
            {course.tags?.slice(0, 2).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs capitalize py-0.5 px-1.5">{tag}</Badge>
            ))}
        </div>
        <Button asChild size="sm" variant="default">
          <Link href={`/courses/${course.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
