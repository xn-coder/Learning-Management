export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl?: string;
  category: string;
  tags: string[];
  lessons?: { title: string; duration: string }[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  syllabus?: string; // Could be markdown or link
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Digital Painting',
    instructor: 'Dr. Anya Sharma',
    description: 'Learn the fundamentals of digital painting using popular software. Covers brushes, layers, color theory, and basic composition.',
    duration: '8 Weeks',
    level: 'Beginner',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Digital Art',
    tags: ['photoshop', 'krita', 'beginner', 'painting'],
    lessons: [
        { title: "Software Overview & Setup", duration: "1hr"},
        { title: "Understanding Brushes", duration: "1.5hr"},
        { title: "Layers and Blending Modes", duration: "2hr"},
        { title: "Basic Color Theory", duration: "1.5hr"},
        { title: "Composition Essentials", duration: "1hr"},
        { title: "Still Life Painting", duration: "2.5hr"},
        { title: "Simple Character Painting", duration: "2.5hr"},
        { title: "Final Project: Your First Scene", duration: "3hr"},
    ],
    prerequisites: ['Basic computer literacy'],
    learningOutcomes: [
        'Navigate digital painting software confidently.',
        'Understand and apply basic color theory.',
        'Create simple digital paintings from observation and imagination.',
        'Utilize layers and blending modes effectively.'
    ],
    syllabus: `Week 1: Introduction to Digital Painting Software\nWeek 2: Brushes and Strokes\nWeek 3: Layers and Masks\n...`
  },
  {
    id: '2',
    title: 'Character Design Fundamentals',
    instructor: 'Prof. Ben Carter',
    description: 'Explore the core principles of character design, from initial sketches to polished concepts. Focus on anatomy, expression, and storytelling.',
    duration: '10 Weeks',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Illustration',
    tags: ['character design', 'drawing', 'anatomy', 'concept art'],
    lessons: [
        { title: "What Makes a Good Character?", duration: "1hr"},
        { title: "Basic Anatomy for Artists", duration: "2hr"},
        { title: "Facial Expressions and Emotions", duration: "1.5hr"},
        { title: "Poses and Gestures", duration: "2hr"},
        { title: "Shape Language and Silhouettes", duration: "1.5hr"},
        { title: "Costume and Prop Design", duration: "2hr"},
        { title: "Developing a Character Sheet", duration: "2.5hr"},
        { title: "Storytelling through Design", duration: "1.5hr"},
        { title: "Color Palettes for Characters", duration: "2hr"},
        { title: "Final Project: Original Character Portfolio", duration: "3hr"},
    ],
    prerequisites: ['Basic drawing skills', 'Familiarity with any drawing medium (digital or traditional)'],
    learningOutcomes: [
        'Apply anatomical knowledge to create believable characters.',
        'Design characters with distinct personalities and visual appeal.',
        'Understand the role of shape language and silhouette in character design.',
        'Develop comprehensive character sheets for various applications.'
    ]
  },
  {
    id: '3',
    title: 'Advanced 3D Modeling with Blender',
    instructor: 'Ms. Chloe Davis',
    description: 'Dive deep into advanced 3D modeling techniques using Blender. Topics include hard surface modeling, organic sculpting, texturing, and rendering.',
    duration: '12 Weeks',
    level: 'Advanced',
    imageUrl: 'https://placehold.co/600x400.png',
    category: '3D Art',
    tags: ['blender', '3d modeling', 'sculpting', 'texturing', 'rendering'],
    learningOutcomes: [
        'Master advanced modeling tools and workflows in Blender.',
        'Create complex hard-surface and organic models.',
        'Develop realistic textures and materials.',
        'Produce high-quality renders of 3D scenes.'
    ]
  },
  {
    id: '4',
    title: 'Traditional Oil Painting Techniques',
    instructor: 'Mr. David Lee',
    description: 'Master the art of oil painting, from preparing your canvas and mixing colors to applying various brushwork techniques and glazing.',
    duration: '8 Weeks',
    level: 'Intermediate',
    imageUrl: 'https://placehold.co/600x400.png',
    category: 'Traditional Art',
    tags: ['oil painting', 'traditional', 'canvas', 'color mixing'],
     learningOutcomes: [
        'Understand the properties of oil paints and mediums.',
        'Prepare canvases and other surfaces for oil painting.',
        'Mix a wide range of colors accurately.',
        'Apply various brushwork techniques for different effects.'
    ]
  },
];
