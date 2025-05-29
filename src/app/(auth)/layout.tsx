import type { Metadata } from 'next';
import '../globals.css'; // Ensure global styles are available for this layout segment

// Fonts are globally defined in src/app/layout.tsx, no need to redefine or reapply their variable classes here.
// The Toaster is also globally available from src/app/layout.tsx.

export const metadata: Metadata = {
  title: 'Login - Atelier Hub',
  description: 'Login to Atelier Hub.',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the styling previously on the <body> tag to this wrapper div.
    // Font variables (--font-geist-sans, etc.) are already on the main <body> from the root layout.
    <div className="antialiased bg-background text-foreground flex min-h-screen flex-col">
      {children}
      {/* Toaster removed as it's already present in the root layout (src/app/layout.tsx) */}
    </div>
  );
}
