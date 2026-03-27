"use client";

// Import icons
import { Trophy, CheckCircle2, XCircle } from "lucide-react";

// Import UI components
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


// Quiz Result Component
export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {

  // If no result is passed, return nothing
  if (!result) return null;

  return (
    <div className="mx-auto">

      {/* Title Section */}
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">

        {/* ===== Score Overview ===== */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">
            {result.quizScore.toFixed(1)}%
          </h3>

          {/* Progress bar showing score */}
          <Progress value={result.quizScore} className="w-full" />
        </div>


        {/* ===== Improvement Tip (if exists) ===== */}
        {result.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">
              {result.improvementTip}
            </p>
          </div>
        )}


        {/* ===== Question Review Section ===== */}
        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>

          {/* Loop through all questions */}
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-2"
            >

              {/* Question + Correct/Wrong Icon */}
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>

                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>

              {/* User Answer + Correct Answer */}
              <div className="text-sm text-muted-foreground">
                <p>Your answer: {q.userAnswer}</p>

                {!q.isCorrect && (
                  <p>Correct answer: {q.answer}</p>
                )}
              </div>

              {/* Explanation */}
              <div className="text-sm bg-muted p-2 rounded">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>

            </div>
          ))}
        </div>

      </CardContent>


      {/* ===== Start New Quiz Button ===== */}
      {!hideStartNew && (
        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}

    </div>
  );
}