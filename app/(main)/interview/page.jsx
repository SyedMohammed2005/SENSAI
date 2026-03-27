import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";

export default async function InterviewPrepPage() {

  // Fetch all assessment data (server-side)
  const assessments = await getAssessments();

  return (
    <div>

      {/* Page Header Section */}
      <div className="flex items-center justify-between mb-5">
        {/* Main page title */}
        <h1 className="text-6xl font-bold gradient-title">
          Interview Preparation
        </h1>
      </div>

      {/* Main content section with vertical spacing */}
      <div className="space-y-6">

        {/* Statistics summary cards (average score, total questions, etc.) */}
        <StatsCards assessments={assessments} />

        {/* Performance visualization chart */}
        <PerformanceChart assessments={assessments} />

        {/* List of past quizzes with detailed results */}
        <QuizList assessments={assessments} />

      </div>
    </div>
  );
}