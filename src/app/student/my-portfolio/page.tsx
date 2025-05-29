// This page simply re-uses the dynamic portfolio page logic,
// hardcoding it for student ID '1' (or the currently logged-in student in a real app).
import StudentPortfolioPage from '../[studentId]/portfolio/page';

export default function MyPortfolioPage() {
  // In a real app, you'd fetch the logged-in student's ID.
  // For this example, we assume student '1' is "my" portfolio.
  return <StudentPortfolioPage params={{ studentId: '1' }} />;
}
