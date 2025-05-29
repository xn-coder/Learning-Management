import type { ReactNode } from 'react';
import AppLayout from '@/components/layout/AppLayout';

// This layout wraps all routes within the (main) group
export default function MainAppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
