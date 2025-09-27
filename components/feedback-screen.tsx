"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle, ArrowRight, Target } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

interface FeedbackScreenProps {
  isCorrect: boolean
  correctSequence: number[]
  userInput: number[]
  onNext: () => void
  round: number
  totalRounds: number
}

export function FeedbackScreen({
  isCorrect,
  correctSequence,
  userInput,
  onNext,
  round,
  totalRounds,
}: FeedbackScreenProps) {
  const [showAnimation, setShowAnimation] = useState(false)
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center">
      {/* Header */}
      <div className={`flex items-center justify-center w-full max-w-md ${isRTL ? "flex-row-reverse" : ""}`}>
        <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
          <Target className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            {t("game.round")} {round}
          </span>
        </div>
      </div>

      {/* Result animation */}
      <div className={`transition-all duration-500 ${showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
        {isCorrect ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-6 bg-success/10 rounded-full animate-bounce">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-success">{t("game.correct")}</h2>
              <p className="text-lg text-success/80">{t("game.performance.good")}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-6 bg-destructive/10 rounded-full animate-pulse">
              <XCircle className="w-16 h-16 text-destructive" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-destructive">{t("game.incorrect")}</h2>
              <p className="text-lg text-destructive/80">{t("game.performance.poor")}</p>
            </div>
          </div>
        )}
      </div>

      {/* Sequence comparison */}
      <div className="space-y-4 w-full max-w-md">
        <div className="text-sm font-medium text-muted-foreground">{t("game.sequenceComparison")}</div>

        {/* Correct sequence */}
        <Card className="p-4 bg-success/5 border-success/20">
          <div className={`flex items-center justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="text-sm font-medium text-success">{t("game.correctSequence")}</span>
          </div>
          <div className="flex justify-center gap-2" dir="ltr">
            {correctSequence.map((digit, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-success text-success-foreground rounded-lg flex items-center justify-center text-lg font-bold"
              >
                {digit}
              </div>
            ))}
          </div>
        </Card>

        {/* User input */}
        <Card
          className={`p-4 ${isCorrect ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"}`}
        >
          <div className={`flex items-center justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={`text-sm font-medium ${isCorrect ? "text-success" : "text-destructive"}`}>
              {t("game.yourAnswer")}
            </span>
          </div>
          <div className="flex justify-center gap-2" dir="ltr">
            {userInput.map((digit, index) => {
              const isDigitCorrect = digit === correctSequence[index]
              return (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                    isDigitCorrect ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {digit}
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Next button */}
      <Button
        onClick={onNext}
        size="lg"
        className="flex items-center space-x-2 text-xl px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <span>{isCorrect ? t("game.nextRound") : t("game.gameOver")}</span>
        <ArrowRight className="w-5 h-5" />
      </Button>

      {/* Encouragement message */}
      <div className="text-sm text-muted-foreground max-w-md">
        {isCorrect ? <p>{t("game.performance.good")}</p> : <p>{t("game.performance.poor")}</p>}
      </div>
    </div>
  )
}
