
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
  // This return is technically necessary for a React component,
  // but it will not be rendered due to the redirect.
  return null;
}
