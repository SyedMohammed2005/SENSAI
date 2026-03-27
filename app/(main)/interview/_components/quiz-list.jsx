"use client";

// Import React state
import { useState } from "react";

// Import date formatter
import { format } from "date-fns";

// Import router for navigation
import { useRouter } from "next/navigation";

// Import UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import Quiz Result component (for modal view)
import QuizResult from "./quiz-result";


// Quiz List Component
export default function QuizList({ assessments }) {

  const router = useRouter();

  // Store selected quiz for modal popup
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      {/* ===== Main Card ===== */}
      <Card>

        {/* Header Section */}
        <CardHeader>
          <div className="flex items-center justify-between">

            {/* Title + Description */}
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription>
                Review your past quiz performance
              </CardDescription>
            </div>

            {/* Button to start new quiz */}
            <Button onClick={() => router.push("/interview/mock")}>
              Start New Quiz
            </Button>

          </div>
        </CardHeader>

        {/* Quiz List Content */}
        <CardContent>
          <div className="space-y-4">

            {/* Loop through all assessments */}
            {assessments?.map((assessment, i) => (

              <Card
                key={assessment.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"

                // When clicked, open modal with selected quiz
                onClick={() => setSelectedQuiz(assessment)}
              >

                <CardHeader>
                  {/* Quiz Title */}
                  <CardTitle className="gradient-title text-2xl">
                    Quiz {i + 1}
                  </CardTitle>

                  {/* Score + Date */}
                  <CardDescription className="flex justify-between w-full">

                    {/* Show score */}
                    <div>
                      Score: {assessment.quizScore.toFixed(1)}%
                    </div>

                    {/* Show formatted date */}
                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>

                  </CardDescription>
                </CardHeader>

                {/* Show improvement tip if available */}
                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}

              </Card>
            ))}

          </div>
        </CardContent>
      </Card>


      {/* ===== Dialog (Popup Modal) ===== */}
      <Dialog
        open={!!selectedQuiz} // Open if quiz is selected
        onOpenChange={() => setSelectedQuiz(null)} // Close modal
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">

          <DialogHeader>
            <DialogTitle>
              {/* Title intentionally empty */}
            </DialogTitle>
          </DialogHeader>

          {/* Show full quiz result inside modal */}
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />

        </DialogContent>
      </Dialog>
    </>
  );
}