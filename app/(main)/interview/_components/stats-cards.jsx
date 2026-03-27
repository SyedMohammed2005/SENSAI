import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {

  // Calculate the average quiz score across all assessments
  const getAverageScore = () => {
    // If no assessments exist, return 0
    if (!assessments?.length) return 0;

    // Sum all quiz scores
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );

    // Return average with 1 decimal point
    return (total / assessments.length).toFixed(1);
  };

  // Get the most recent assessment (assuming latest is first in array)
  const getLatestAssessment = () => {
    // If no assessments exist, return null
    if (!assessments?.length) return null;

    // Return first item (latest quiz)
    return assessments[0];
  };

  // Calculate total number of questions practiced
  const getTotalQuestions = () => {
    // If no assessments exist, return 0
    if (!assessments?.length) return 0;

    // Add up question count from each assessment
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">

      {/* Average Score Card */}
      <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Score
          </CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* Display calculated average score */}
          <div className="text-2xl font-bold">
            {getAverageScore()}%
          </div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      {/* Total Questions Practiced Card */}
      <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* Display total questions practiced */}
          <div className="text-2xl font-bold">
            {getTotalQuestions()}
          </div>
          <p className="text-xs text-muted-foreground">
            Total questions
          </p>
        </CardContent>
      </Card>

      {/* Latest Quiz Score Card */}
      <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Latest Score
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* Display latest quiz score (if exists), otherwise 0 */}
          <div className="text-2xl font-bold">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            Most recent quiz
          </p>
        </CardContent>
      </Card>

    </div>
  );
}