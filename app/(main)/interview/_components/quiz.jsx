"use client";

// React hooks
import { useState, useEffect } from "react";

// Toast notifications
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Server actions
import { generateQuiz, saveQuizResult } from "@/actions/interview";

// Result component
import QuizResult from "./quiz-result";

// Custom fetch hook
import useFetch from "@/hooks/use-fetch";

// Loader
import { HashLoader } from "react-spinners";


export default function Quiz() {

  // Current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Store selected answers
  const [answers, setAnswers] = useState([]);

  // Show explanation toggle
  const [showExplanation, setShowExplanation] = useState(false);


  // ===== Generate Quiz Hook =====
  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);


  // ===== Save Result Hook =====
  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);


  // When quiz is generated, create empty answers array
  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);


  // Handle selecting an answer
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };


  // Move to next question or finish quiz
  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };


  // Calculate total score percentage
  const calculateScore = () => {
    let correct = 0;

    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });

    return (correct / quizData.length) * 100;
  };


  // Finish quiz and save result
  const finishQuiz = async () => {
    const score = calculateScore();

    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };


  // Start new quiz
  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };


  // ===== Loading State (Generating Quiz) =====
  if (generatingQuiz) {
    return<div className="flex justify-center items-center min-h-screen">
  <HashLoader size={80} color="#6366f1" />
</div>;
  }


  // ===== Show Results After Completion =====
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }


  // ===== Initial State (Before Quiz Starts) =====
  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>

        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }


  // Get current question
  const question = quizData[currentQuestion];


  // ===== Quiz Question UI =====
  return (
    <Card className="mx-2">

      {/* Question Header */}
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>


      {/* Question Content */}
      <CardContent className="space-y-4">

        {/* Question Text */}
        <p className="text-lg font-medium">
          {question.question}
        </p>


        {/* Answer Options */}
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>


        {/* Explanation (optional) */}
        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">
              {question.explanation}
            </p>
          </div>
        )}

      </CardContent>


      {/* Footer Buttons */}
      <CardFooter className="flex justify-between">

        {/* Show Explanation Button */}
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}

        {/* Next / Finish Button */}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult && (
            <HashLoader width={100} color="gray" />
          )}

          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>

      </CardFooter>
    </Card>
  );
}