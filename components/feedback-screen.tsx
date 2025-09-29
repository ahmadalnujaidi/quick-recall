"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowRight, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

interface FeedbackScreenProps {
  isCorrect: boolean;
  correctSequence: number[];
  userInput: number[];
  onNext: () => void;
  round: number;
  totalRounds: number;
}

export function FeedbackScreen({
  isCorrect,
  correctSequence,
  userInput,
  onNext,
  round,
  totalRounds,
}: FeedbackScreenProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-12 text-center px-4 max-w-[900px] w-full gap-8">
      {/* Header */}
      <div
        className={`flex items-center justify-center w-full ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex items-center space-x-3 ${
            isRTL ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <Target className="w-12 h-12 text-primary" />
          <span className="text-xl font-medium text-muted-foreground">
            {t("game.round")} {round}
          </span>
        </div>
      </div>

      {/* Result animation */}
      <div
        className={`transition-all duration-500 ${
          showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        {isCorrect ? (
          <div className="flex flex-col items-center space-y-6">
            <div className="p-8 bg-success/10 rounded-full animate-bounce">
              <CheckCircle className="w-30 h-30 text-success" />
            </div>
            <div className="space-y-3">
              <h2 className="text-5xl font-bold text-success">
                {t("game.correct")}
              </h2>
              <p className="text-2xl text-success/80">
                {t("game.performance.good")}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="p-8 bg-destructive/10 rounded-full animate-pulse">
              <XCircle className="w-30 h-30 text-destructive" />
            </div>
            <div className="space-y-3">
              <h2 className="text-5xl font-bold text-destructive">
                {t("game.incorrect")}
              </h2>
              <p className="text-2xl text-destructive/80">
                {t("game.performance.poor")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sequence comparison */}
      <div className="space-y-6 w-full">
        <div className="text-xl font-medium text-muted-foreground">
          {t("game.sequenceComparison")}
        </div>

        {/* Correct sequence */}
        <Card className="p-6 bg-success/5 border-success/20">
          <div
            className={`flex items-center justify-between mb-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-lg font-medium text-success">
              {t("game.correctSequence")}
            </span>
          </div>
          <div className="flex justify-center gap-3" dir="ltr">
            {correctSequence.map((digit, index) => (
              <div
                key={index}
                className="w-30 h-30 bg-success text-success-foreground rounded-lg flex items-center justify-center text-3xl font-bold"
              >
                {digit}
              </div>
            ))}
          </div>
        </Card>

        {/* User input */}
        <Card
          className={`p-6 ${
            isCorrect
              ? "bg-success/5 border-success/20"
              : "bg-destructive/5 border-destructive/20"
          }`}
        >
          <div
            className={`flex items-center justify-between mb-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span
              className={`text-lg font-medium ${
                isCorrect ? "text-success" : "text-destructive"
              }`}
            >
              {t("game.yourAnswer")}
            </span>
          </div>
          <div className="flex justify-center gap-3" dir="ltr">
            {userInput.map((digit, index) => {
              const isDigitCorrect = digit === correctSequence[index];
              return (
                <div
                  key={index}
                  className={`w-30 h-30 rounded-lg flex items-center justify-center text-3xl font-bold ${
                    isDigitCorrect
                      ? "bg-success text-success-foreground"
                      : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {digit}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Next button */}
      <Button
        onClick={onNext}
        size="lg"
        className="flex items-center space-x-3 text-3xl px-30 py-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 w-full"
      >
        <span>{isCorrect ? t("game.nextRound") : t("game.gameOver")}</span>
        <ArrowRight className="w-30 h-30" />
      </Button>

      {/* Encouragement message */}
      <div className="text-xl text-muted-foreground">
        {isCorrect ? (
          <p>{t("game.performance.good")}</p>
        ) : (
          <p>{t("game.performance.poor")}</p>
        )}
      </div>
    </div>
  );
}
