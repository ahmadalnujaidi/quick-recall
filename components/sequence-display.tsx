"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Eye, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

interface SequenceDisplayProps {
  sequence: number[]
  timeRemaining: number
  round: number
  totalRounds: number
}

export function SequenceDisplay({ sequence, timeRemaining, round, totalRounds }: SequenceDisplayProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    if (timeRemaining === 0) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [timeRemaining])

  // Dynamic max time based on current round (starts at 5s, reduces to 2s minimum)
  const maxTime = Math.max(5 - (Math.floor(round / 10) * 0.5), 2)
  const progressValue = Math.max(0, ((maxTime - timeRemaining) / maxTime) * 100)

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center">
      {/* Header */}
      <div className={`flex items-center justify-between w-full max-w-md ${isRTL ? "flex-row-reverse" : ""}`}>
        <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
          <Eye className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            {t("game.round")} {round}
          </span>
        </div>
        <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
          <Clock className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-muted-foreground">
            {Math.ceil(timeRemaining)}
            {t("game.seconds")}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md">
        <Progress value={progressValue} className="h-2" />
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{t("game.memorize")}</h2>
        <p className="text-muted-foreground">
          {timeRemaining > 0
            ? `${t("game.timeRemaining")} ${Math.ceil(timeRemaining)} ${t("game.seconds")}`
            : t("game.enterSequence")}
        </p>
        <div className="text-xs text-primary/80">
          {sequence.length} digits • Level {Math.min(Math.floor(round / 2) + 1, 10)}
        </div>
      </div>

      {/* Sequence display */}
      <Card className="p-8 min-h-[200px] flex items-center justify-center bg-card border-2">
        <div className={`transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {isVisible ? (
            <div className="flex flex-wrap justify-center gap-4" dir="ltr">
              {sequence.map((digit, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-3xl font-bold shadow-lg animate-bounce"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: "0.6s",
                    animationIterationCount: "1",
                  }}
                >
                  {digit}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-6xl text-muted-foreground/30">?</div>
          )}
        </div>
      </Card>

      {/* Countdown indicator */}
      {timeRemaining > 0 && (
        <div className="flex space-x-2">
          {[...Array(Math.ceil(maxTime))].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < (maxTime - timeRemaining) ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {timeRemaining === 0 && (
        <div className="text-sm text-muted-foreground animate-pulse">Get ready to enter your answer...</div>
      )}
    </div>
  )
}
