"use client"

import { useMemoryGame } from "@/hooks/use-memory-game"
import { useLanguage } from "@/contexts/language-context"
import { StartScreen } from "@/components/start-screen"
import { SequenceDisplay } from "@/components/sequence-display"
import { InputScreen } from "@/components/input-screen"
import { FeedbackScreen } from "@/components/feedback-screen"
import { GameOverScreen } from "@/components/game-over-screen"
import { NameEntryDialog } from "@/components/name-entry-dialog"
import { LanguageToggle } from "@/components/language-toggle"

export default function MemoryGamePage() {
  const { isRTL } = useLanguage()
  const game = useMemoryGame()

  return (
    <div className={`min-h-screen bg-background flex flex-col items-center justify-center p-6 ${isRTL ? "rtl" : "ltr"}`}>
      <LanguageToggle />

      <div className={`w-full px-4 flex-1 flex items-center justify-center ${game.gameState === "nameEntry" ? "max-w-4xl" : "max-w-md"}`}>
        {game.gameState === "start" && (
          <StartScreen 
            onStart={game.startGame} 
            highScore={game.highScore}
          />
        )}
        {game.gameState === "display" && (
          <SequenceDisplay
            sequence={game.stats.currentSequence}
            timeRemaining={game.stats.timeRemaining}
            round={game.stats.currentRound}
            totalRounds={game.stats.totalRounds}
          />
        )}
        {game.gameState === "input" && (
          <InputScreen
            sequence={game.stats.currentSequence}
            userInput={game.stats.userInput}
            onAddDigit={game.addDigit}
            onRemoveDigit={game.removeDigit}
            onClearInput={game.clearInput}
            onSubmit={game.submitAnswer}
            round={game.stats.currentRound}
            totalRounds={game.stats.totalRounds}
          />
        )}
        {game.gameState === "feedback" && (
          <FeedbackScreen
            isCorrect={game.stats.isCorrect!}
            correctSequence={game.stats.currentSequence}
            userInput={game.stats.userInput}
            onNext={game.nextRound}
            round={game.stats.currentRound}
            totalRounds={game.stats.totalRounds}
          />
        )}
        {game.gameState === "nameEntry" && (
          <NameEntryDialog
            score={game.stats.currentRound}
            onSubmit={game.submitHighScoreName}
          />
        )}
        {game.gameState === "gameOver" && (
          <GameOverScreen
            currentRound={game.stats.currentRound}
            correctAnswers={game.stats.correctAnswers}
            onPlayAgain={game.resetGame}
          />
        )}
      </div>
    </div>
  )
}
