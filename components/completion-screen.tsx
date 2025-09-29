"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RotateCcw, Home, Star, Target, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

interface CompletionScreenProps {
  correctAnswers: number;
  totalRounds: number;
  onPlayAgain: () => void;
}

export function CompletionScreen({
  correctAnswers,
  totalRounds,
  onPlayAgain,
}: CompletionScreenProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const { t, isRTL } = useLanguage();
  const percentage = Math.round((correctAnswers / totalRounds) * 100);

  const getPerformanceLevel = () => {
    if (percentage >= 80)
      return {
        level: t("game.excellent"),
        color: "text-success",
        icon: Trophy,
      };
    if (percentage >= 60)
      return { level: t("game.good"), color: "text-secondary", icon: Star };
    if (percentage >= 40)
      return { level: t("game.fair"), color: "text-accent", icon: Target };
    return {
      level: t("game.keepPracticing"),
      color: "text-primary",
      icon: Brain,
    };
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

  const getPerformanceMessage = () => {
    if (percentage >= 80) return t("game.performance.excellent");
    if (percentage >= 60) return t("game.performance.good");
    if (percentage >= 40) return t("game.performance.fair");
    return t("game.performance.poor");
  };

  const getFunFact = () => {
    if (percentage >= 80) return t("game.fact.excellent");
    if (percentage >= 60) return t("game.fact.good");
    if (percentage >= 40) return t("game.fact.fair");
    return t("game.fact.poor");
  };

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center justify-center space-y-12 text-center px-4 max-w-[900px] w-full">
      {/* Celebration animation */}
      <div
        className={`transition-all duration-700 ${
          showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="p-12 bg-primary/10 rounded-full animate-bounce">
            <PerformanceIcon className={`w-32 h-32 ${performance.color}`} />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-foreground">
              {t("game.youDidIt")}
            </h1>
            <p className={`text-3xl font-semibold ${performance.color}`}>
              {performance.level}
            </p>
          </div>
        </div>
      </div>

      {/* Score summary */}
      <Card className="p-10 w-full bg-card border-2">
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-7xl font-bold text-primary mb-3">
              {correctAnswers}/{totalRounds}
            </div>
            <div className="text-2xl text-muted-foreground">
              {t("game.sequencesRecalled")}
            </div>
          </div>

          {/* Performance breakdown */}
          <div className="space-y-4">
            <div
              className={`flex justify-between items-center ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <span className="text-xl text-muted-foreground">
                {t("game.accuracy")}
              </span>
              <span className={`font-bold text-2xl ${performance.color}`}>
                {percentage}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-5">
              <div
                className={`h-5 rounded-full transition-all duration-1000 ${
                  percentage >= 80
                    ? "bg-success"
                    : percentage >= 60
                    ? "bg-secondary"
                    : percentage >= 40
                    ? "bg-accent"
                    : "bg-primary"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Performance message */}
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <p className="text-xl text-muted-foreground">
              {getPerformanceMessage()}
            </p>
          </div>
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <Button
          onClick={onPlayAgain}
          size="lg"
          className="flex items-center justify-center space-x-3 text-2xl px-10 py-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex-1"
        >
          <RotateCcw className="w-7 h-7" />
          <span>{t("game.playAgain")}</span>
        </Button>

        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          size="lg"
          className="flex items-center justify-center space-x-3 text-2xl px-10 py-8 font-bold rounded-xl transition-all duration-200 hover:scale-105 flex-1"
        >
          <Home className="w-7 h-7" />
          <span>{t("game.exit")}</span>
        </Button>
      </div>

      {/* Fun facts */}
      <div className="text-lg text-muted-foreground space-y-3">
        <p className="font-medium">{t("game.didYouKnow")}</p>
        <p>{getFunFact()}</p>
      </div>
    </div>
  );
}
