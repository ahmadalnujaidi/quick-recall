"use client"

import { Button } from "@/components/ui/button"
import { Brain, Trophy, Target } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface HighScoreData {
  score: number
  playerName: string
  date: string
}

interface StartScreenProps {
  onStart: () => void
  highScore: HighScoreData
}

export function StartScreen({ onStart, highScore }: StartScreenProps) {
  const { t, isRTL } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fade-in px-4">
      {/* Header with icon */}
      <div className="flex items-center justify-center space-x-4 mb-2">
        <div className="p-6 bg-primary/10 rounded-full">
          <Brain className="w-16 h-16 text-primary" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
          {t("game.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-sm mx-auto text-pretty">{t("game.subtitle")}</p>
        <p className="text-md text-primary font-semibold">Endless Challenge Mode</p>
      </div>

      {/* Start button */}
      <Button
        onClick={onStart}
        size="lg"
        className="text-xl px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 w-full max-w-xs"
      >
        {t("game.start")}
      </Button>

      {/* Instructions */}
      <div className="text-sm text-muted-foreground max-w-sm mx-auto space-y-3">
        <p className="font-medium">{t("game.howToPlay")}</p>
        <div className={`grid grid-cols-1 gap-3 text-sm ${isRTL ? "rtl" : "ltr"}`}>
          <div className={`flex items-center space-x-3 ${isRTL ? "flex-row space-x-3" : ""}`}>
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              1
            </div>
            <span>{t("game.step1")}</span>
          </div>
          <div className={`flex items-center space-x-3 ${isRTL ? "flex-row space-x-3" : ""}`}>
            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold text-sm">
              2
            </div>
            <span>{t("game.step2")}</span>
          </div>
          <div className={`flex items-center space-x-3 ${isRTL ? "flex-row space-x-3" : ""}`}>
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-sm">
              3
            </div>
            <span>{t("game.step3")}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-muted">
          <p className="text-xs text-primary">🎮 Challenge yourself! How many rounds can you survive?</p>
          <p className="text-xs text-muted-foreground mt-1">One mistake ends the game. Each round gets harder!</p>
        </div>
      </div>

      {/* High Score Display */}
      {highScore.score > 0 && (
        <div className="w-full max-w-sm bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-600">Current High Score</span>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary">Round {highScore.score}</div>
            <div className="text-sm text-muted-foreground">
              held by <span className="font-semibold text-foreground">{highScore.playerName || "Anonymous"}</span>
            </div>
            <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
              <Target className="w-3 h-3" />
              <span>Beat this score to claim the crown!</span>
            </div>
          </div>
        </div>
      )}

      {highScore.score === 0 && (
        <div className="text-center p-4 bg-muted/30 rounded-lg border border-muted">
          <p className="text-sm text-muted-foreground">No high score yet!</p>
          <p className="text-xs text-primary mt-1">Be the first to set a record</p>
        </div>
      )}
    </div>
  )
}
