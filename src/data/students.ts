export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  medium: string;
  submissionDate: string;
  dimensions?: string; // e.g., "24x36 inches"
}

export interface Student {
  id: string;
  name: string;
  profileImageUrl: string;
  bio: string;
  major: string;
  year: number; // e.g., 1, 2, 3, 4
  artworks: Artwork[];
  socialLinks?: { platform: string; url: string }[];
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Alice Wonderland',
    profileImageUrl: 'https://placehold.co/400x400.png',
    bio: 'A passionate digital artist exploring surreal landscapes and dreamlike characters. Loves experimenting with vibrant colors and textures.',
    major: 'Digital Illustration',
    year: 2,
    artworks: [
      {
        id: 'art001',
        title: 'Floating Islands',
        imageUrl: 'https://placehold.co/600x450.png',
        description: 'A concept piece exploring gravity-defying landmasses in a fantasy world.',
        medium: 'Digital Painting (Photoshop)',
        submissionDate: '2023-09-15',
        dimensions: "1920x1080px"
      },
      {
        id: 'art002',
        title: 'Forest Spirit',
        imageUrl: 'https://placehold.co/600x450.png',
        description: 'An ethereal creature encountered in an ancient, glowing forest.',
        medium: 'Digital Painting (Procreate)',
        submissionDate: '2023-10-05',
      },
      {
        id: 'art003',
        title: 'City of Tomorrow',
        imageUrl: 'https://placehold.co/600x450.png',
        description: 'Futuristic cityscape concept.',
        medium: '3D Render (Blender) & Photoshop',
        submissionDate: '2023-08-20',
        dimensions: "3840x2160px"
      },
    ],
    socialLinks: [
        { platform: "ArtStation", url: "#"},
        { platform: "Instagram", url: "#"}
    ]
  },
  {
    id: '2',
    name: 'Bob The Builder',
    profileImageUrl: 'https://placehold.co/400x400.png',
    bio: 'Focused on character design and animation. Bringing stories to life one frame at a time. Currently working on a short animated film.',
    major: 'Animation',
    year: 3,
    artworks: [
      {
        id: 'art004',
        title: 'Knight Character Sheet',
        imageUrl: 'https://placehold.co/600x450.png',
        description: 'Full turnaround and expression sheet for a fantasy knight character.',
        medium: 'Digital Drawing (Clip Studio Paint)',
        submissionDate: '2023-09-28',
      },
      {
        id: 'art005',
        title: 'Walk Cycle Study',
        imageUrl: 'https://placehold.co/600x450.png', // Ideally a GIF or video thumbnail
        description: 'A 12-frame walk cycle animation for a quadruped creature.',
        medium: '2D Animation (Toon Boom Harmony)',
        submissionDate: '2023-10-10',
      },
    ],
  },
];
