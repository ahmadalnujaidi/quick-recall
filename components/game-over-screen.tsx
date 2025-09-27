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
    <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-md mx-auto">
      {/* Game Over animation */}
      <div className={`transition-all duration-700 ${showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="p-6 bg-destructive/10 rounded-full animate-pulse">
            <Skull className="w-16 h-16 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-destructive">{t("game.gameOver")}!</h1>
            <p className="text-lg text-muted-foreground">{t("game.oneWrongAnswer")}</p>
          </div>
        </div>
      </div>

      {/* Performance summary */}
      <Card className="p-6 w-full bg-card border-2">
        <div className="space-y-4">
          {/* Round reached */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              Round {currentRound}
            </div>
            <div className="text-sm text-muted-foreground">{t("game.highestRoundReached")}</div>
          </div>

          {/* Performance level */}
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`text-lg font-bold ${performance.color} mb-1`}>
              {performance.level}
            </div>
            <div className="text-sm text-muted-foreground">
              {performance.message}
            </div>
          </div>

          {/* Stats breakdown */}
          <div className="space-y-2">
            <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                {t("game.correctAnswers")}
              </span>
              <span className="font-bold text-success">{correctAnswers}</span>
            </div>
            <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                {t("game.difficultyLevel")}
              </span>
              <span className="font-bold text-secondary">{Math.min(Math.floor(currentRound / 2) + 1, 10)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={onPlayAgain}
          size="lg"
          className="flex items-center justify-center space-x-2 text-lg px-6 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          <span>{t("game.tryAgain")}</span>
        </Button>

        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          size="lg"
          className="flex items-center justify-center space-x-2 text-lg px-6 py-4 font-bold rounded-xl transition-all duration-200 hover:scale-105"
        >
          <Home className="w-5 h-5" />
          <span>{t("game.exit")}</span>
        </Button>
      </div>

      {/* Encouragement message */}
      <div className="text-sm text-muted-foreground max-w-sm">
        <p className="font-medium mb-1">💡 {t("game.proTip")}</p>
        <p>{t("game.memoryImproves")}</p>
      </div>
    </div>
  )
}
