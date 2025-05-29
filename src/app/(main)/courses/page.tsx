import CourseCard from '@/components/courses/CourseCard';
import { courses, type Course } from '@/data/courses';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, ListFilter } from 'lucide-react';

// This would typically be a server component fetching data, or client component with useEffect.
// For this example, we'll treat it as if data is readily available.

export default function CourseCatalogPage() {
  // Placeholder for filtering logic
  const displayedCourses: Course[] = courses;
  const categories = Array.from(new Set(courses.map(c => c.category)));
  const levels = Array.from(new Set(courses.map(c => c.level)));


  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Course Catalog</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover your next creative endeavor. Browse our wide range of courses designed for all skill levels.
        </p>
      </header>

      <div className="mb-8 p-6 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search Courses</label>
            <div className="relative">
              <Input id="search" placeholder="e.g., Digital Painting, Blender..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">Category</label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-foreground mb-1">Skill Level</label>
            <Select>
              <SelectTrigger id="level">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(lvl => <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {/* <Button className="w-full lg:w-auto lg:self-end flex items-center gap-2">
            <ListFilter className="h-4 w-4" /> Filter
          </Button> */}
        </div>
      </div>

      {displayedCourses.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No Courses Found</h2>
          <p className="text-muted-foreground">Try adjusting your filters or check back later for new offerings.</p>
        </div>
      )}
    </div>
  );
}
