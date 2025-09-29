"use client";

import { Button } from "@/components/ui/button";
import { Brain, Trophy, Target } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface HighScoreData {
  score: number;
  playerName: string;
  date: string;
}

interface StartScreenProps {
  onStart: () => void;
  highScore: HighScoreData;
}

export function StartScreen({ onStart, highScore }: StartScreenProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fade-in px-4 gap-8">
      {/* Header with icon */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="p-8 bg-primary/10 rounded-full">
          <Brain className="w-33 h-33 text-primary" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-4xl md:text-8xl font-bold text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight max-w-160">
          {t("game.title")}
        </h1>
        <p className="text-3xl text-muted-foreground max-w-sm mx-auto text-pretty">
          {t("game.subtitle")}
        </p>
        {/* <p className="text-md text-primary font-semibold">{t("game.endlessChallenge")}</p> */}
      </div>

      {/* Start button */}
      <Button
        onClick={onStart}
        size="lg"
        className="text-3xl px-22 py-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 w-full"
      >
        {t("game.start")}
      </Button>

      {/* Instructions */}
      <div className="text-2xl text-muted-foreground mx-auto space-y-3 flex flex-col gap-5">
        <p className="font-medium mb-3">{t("game.howToPlay")}</p>
        <div className={`flex gap-4 text-xl mb-4 ${isRTL ? "rtl" : "ltr"}`}>
          <div
            className={`flex items-center space-x-3 ${
              isRTL ? "flex-row space-x-3" : ""
            }`}
          >
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-md">
              1
            </div>
            <span>{t("game.step1")}</span>
          </div>
          <div
            className={`flex items-center space-x-3 ${
              isRTL ? "flex-row space-x-3" : ""
            }`}
          >
            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold text-md">
              2
            </div>
            <span>{t("game.step2")}</span>
          </div>
          <div
            className={`flex items-center space-x-3 ${
              isRTL ? "flex-row space-x-3" : ""
            }`}
          >
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-md">
              3
            </div>
            <span>{t("game.step3")}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-muted m-4">
          <p className="text-2xl text-primary">{t("game.challengeYourself")}</p>
          <p className="text-xl text-muted-foreground mt-1">
            {t("game.oneMistake")}
          </p>
        </div>
      </div>

      {/* High Score Display */}
      {highScore.score > 0 && (
        <div className="w-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20 m-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-bold text-yellow-600">
              {t("game.currentHighScore")}
            </span>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-primary">
              {t("game.round")} {highScore.score}
            </div>
            <div className="text-lg text-muted-foreground">
              {t("game.heldBy")}{" "}
              <span className="font-semibold text-foreground">
                {highScore.playerName || t("game.anonymous")}
              </span>
            </div>
            <div className="flex items-center justify-center space-x-1 text-lg text-muted-foreground">
              <Target className="w-6 h-6" />
              <span>{t("game.beatThisScore")}</span>
            </div>
          </div>
        </div>
      )}

      {highScore.score === 0 && (
        <div className="text-center p-4 bg-muted/30 rounded-lg border border-muted">
          <p className="text-lg text-muted-foreground">
            {t("game.noHighScore")}
          </p>
          <p className="text-xl text-primary mt-1">{t("game.firstRecord")}</p>
        </div>
      )}
    </div>
  );
}
