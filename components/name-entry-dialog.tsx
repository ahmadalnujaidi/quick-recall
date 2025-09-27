"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, Star } from "lucide-react"
import { TouchKeyboard } from "./touch-keyboard"
import { useLanguage } from "@/contexts/language-context"

interface NameEntryDialogProps {
  score: number
  onSubmit: (name: string) => void
}

export function NameEntryDialog({ score, onSubmit }: NameEntryDialogProps) {
  const [name, setName] = useState("")
  const { t } = useLanguage()

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-2xl mx-auto px-4">
      {/* Celebration animation */}
      <div className="flex flex-col items-center space-y-4 animate-fade-in">
        <div className="p-6 bg-yellow-500/10 rounded-full animate-bounce">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-yellow-500">{t("game.newHighScore")}</h1>
          <div className="flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-2xl font-bold text-primary">{t("game.round")} {score}</span>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Name entry form */}
      <Card className="p-6 w-full bg-card border-2">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {t("game.congratulations")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("game.enterNamePrompt")}
            </p>
          </div>

          {/* Name Display */}
          <div className="mb-4">
            <div className="min-h-[3rem] p-3 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-lg font-medium text-foreground">
                {name || t("game.enterYourName")}
              </span>
            </div>
          </div>

          {/* Touch Keyboard */}
          <TouchKeyboard
            value={name}
            onChange={setName}
            onSubmit={handleSubmit}
            maxLength={20}
          />

          <div className="text-xs text-muted-foreground text-center mt-2">
            {t("game.useKeyboard")}
          </div>
        </div>
      </Card>

      {/* Achievement message */}
      <div className="text-sm text-muted-foreground max-w-sm">
        <p className="font-medium mb-1">🎉 {t("game.amazingAchievement")}</p>
        <p>{t("game.memorySkillsExceptional")}</p>
      </div>
    </div>
  )
}
