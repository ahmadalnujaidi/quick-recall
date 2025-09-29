"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Keyboard, Delete, RotateCcw, Send } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface InputScreenProps {
  sequence: number[];
  userInput: number[];
  onAddDigit: (digit: number) => void;
  onRemoveDigit: () => void;
  onClearInput: () => void;
  onSubmit: () => void;
  round: number;
  totalRounds: number;
}

export function InputScreen({
  sequence,
  userInput,
  onAddDigit,
  onRemoveDigit,
  onClearInput,
  onSubmit,
  round,
  totalRounds,
}: InputScreenProps) {
  const { t, isRTL } = useLanguage();
  const isComplete = userInput.length === sequence.length;
  const canSubmit = isComplete;

  return (
    <div className="flex flex-col gap-8 items-center justify-center space-y-12 text-center px-4 max-w-[900px] w-full">
      {/* Header */}
      <div
        className={`flex items-center justify-between w-full ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex items-center space-x-3 ${
            isRTL ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <Keyboard className="w-8 h-8 text-primary" />
          <span className="text-xl font-medium text-muted-foreground">
            {t("game.round")} {round}
          </span>
        </div>
        <div className="text-xl font-medium text-muted-foreground">
          {userInput.length} / {sequence.length}
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-foreground">
          {t("game.enterSequence")}
        </h2>
        <p className="text-2xl text-muted-foreground">{t("game.yourInput")}</p>
      </div>

      {/* Input display */}
      <Card className="p-8 min-h-[180px] flex items-center justify-center bg-card border-2 w-full">
        <div className="flex flex-wrap justify-center gap-4" dir="ltr">
          {sequence.map((_, index) => (
            <div
              key={index}
              className={`w-30 h-30 rounded-lg border-2 flex items-center justify-center text-3xl font-bold transition-all duration-200 ${
                index < userInput.length
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-muted border-muted-foreground/20 text-muted-foreground"
              }`}
            >
              {index < userInput.length ? userInput[index] : ""}
            </div>
          ))}
        </div>
      </Card>

      {/* Number keypad */}
      <div className="grid grid-cols-5 gap-5 w-full" dir="ltr">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
          <Button
            key={digit}
            onClick={() => onAddDigit(digit)}
            disabled={!isComplete && userInput.length >= sequence.length}
            variant="outline"
            size="lg"
            className="h-30 w-30 text-3xl font-bold hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            {digit}
          </Button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4">
          <Button
            onClick={onRemoveDigit}
            disabled={userInput.length === 0}
            variant="outline"
            size="lg"
            className="flex items-center justify-center space-x-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive bg-transparent flex-1 h-16 text-xl touch-manipulation"
          >
            <Delete className="w-6 h-6" />
            <span>{t("game.delete")}</span>
          </Button>

          <Button
            onClick={onClearInput}
            disabled={userInput.length === 0}
            variant="outline"
            size="lg"
            className="flex items-center justify-center space-x-3 hover:bg-muted hover:text-muted-foreground bg-transparent flex-1 h-16 text-xl touch-manipulation"
          >
            <RotateCcw className="w-6 h-6" />
            <span>{t("game.clear")}</span>
          </Button>
        </div>

        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          size="lg"
          className="flex items-center justify-center space-x-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-18 text-2xl touch-manipulation"
        >
          <Send className="w-6 h-6" />
          <span>{t("game.submit")}</span>
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="text-lg text-muted-foreground">
        {!isComplete &&
          `${t("game.enterMoreDigits")}: ${sequence.length - userInput.length}`}
        {isComplete && t("game.readyToSubmit")}
      </div>
    </div>
  );
}
