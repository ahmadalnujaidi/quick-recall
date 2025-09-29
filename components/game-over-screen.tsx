"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skull, RotateCcw, Home, Target } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

interface GameOverScreenProps {
  currentRound: number
  correctAnswers: number
  onPlayAgain: () => void
}

export function GameOverScreen({ currentRound, correctAnswers, onPlayAgain }: GameOverScreenProps) {
  const [showAnimation, setShowAnimation] = useState(false)
  const { t, isRTL } = useLanguage()

  const getPerformanceLevel = () => {
    if (currentRound >= 20) return { level: t("game.performanceLevel.legendary"), color: "text-yellow-500", message: t("game.performanceMessage.legendary") }
    if (currentRound >= 15) return { level: t("game.performanceLevel.expert"), color: "text-purple-500", message: t("game.performanceMessage.expert") }
    if (currentRound >= 10) return { level: t("game.performanceLevel.advanced"), color: "text-blue-500", message: t("game.performanceMessage.advanced") }
    if (currentRound >= 5) return { level: t("game.performanceLevel.good"), color: "text-green-500", message: t("game.performanceMessage.good") }
    return { level: t("game.performanceLevel.gettingStarted"), color: "text-gray-500", message: t("game.performanceMessage.gettingStarted") }
  }

  const performance = getPerformanceLevel()

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center mx-auto px-4">
      {/* Game Over animation */}
      <div className={`transition-all duration-700 ${showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
        <div className="flex flex-col items-center space-y-6">
          <div className="p-8 bg-destructive/10 rounded-full animate-pulse">
            <Skull className="w-24 h-24 text-destructive" />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-destructive">{t("game.gameOver")}!</h1>
            <p className="text-2xl text-muted-foreground">{t("game.oneWrongAnswer")}</p>
          </div>
        </div>
      </div>

      {/* Performance summary */}
      <Card className="p-8 w-full bg-card border-2">
        <div className="space-y-6">
          {/* Round reached */}
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-3">
              Round {currentRound}
            </div>
            <div className="text-xl text-muted-foreground">{t("game.highestRoundReached")}</div>
          </div>

          {/* Performance level */}
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className={`text-2xl font-bold ${performance.color} mb-2`}>
              {performance.level}
            </div>
            <div className="text-lg text-muted-foreground">
              {performance.message}
            </div>
          </div>

          {/* Stats breakdown */}
          <div className="space-y-3">
            <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="text-lg text-muted-foreground flex items-center gap-3">
                <Target className="w-6 h-6" />
                {t("game.correctAnswers")}
              </span>
              <span className="font-bold text-success text-xl">{correctAnswers}</span>
            </div>
            <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="text-lg text-muted-foreground flex items-center gap-3">
                <Target className="w-6 h-6" />
                {t("game.difficultyLevel")}
              </span>
              <span className="font-bold text-secondary text-xl">{Math.min(Math.floor(currentRound / 2) + 1, 10)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-col gap-4 w-full">
        <Button
          onClick={onPlayAgain}
          size="lg"
          className="flex items-center justify-center space-x-3 text-2xl px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <RotateCcw className="w-7 h-7" />
          <span>{t("game.tryAgain")}</span>
        </Button>

        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          size="lg"
          className="flex items-center justify-center space-x-3 text-2xl px-10 py-6 font-bold rounded-xl transition-all duration-200 hover:scale-105"
        >
          <Home className="w-7 h-7" />
          <span>{t("game.exit")}</span>
        </Button>
      </div>

      {/* Encouragement message */}
      <div className="text-lg text-muted-foreground">
        <p className="font-medium mb-2">💡 {t("game.proTip")}</p>
        <p>{t("game.memoryImproves")}</p>
      </div>
    </div>
  )
}
