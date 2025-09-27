"use client"

import { useState, useEffect, useCallback } from "react"

interface HighScoreData {
  score: number
  playerName: string
  date: string
}

export function useHighScore() {
  const [highScore, setHighScore] = useState<HighScoreData>({
    score: 0,
    playerName: "",
    date: ""
  })
  const [isNewHighScore, setIsNewHighScore] = useState(false)

  // Load high score from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("memory-game-high-score")
        if (stored) {
          const parsedScore = JSON.parse(stored)
          setHighScore(parsedScore)
        }
      } catch (error) {
        console.error("Error loading high score:", error)
      }
    }
  }, [])

  // Save high score to localStorage
  const saveHighScore = useCallback((score: number, playerName: string) => {
    if (typeof window !== "undefined") {
      const newHighScore: HighScoreData = {
        score,
        playerName: playerName.trim() || "Anonymous",
        date: new Date().toISOString()
      }
      
      try {
        localStorage.setItem("memory-game-high-score", JSON.stringify(newHighScore))
        setHighScore(newHighScore)
        setIsNewHighScore(false)
      } catch (error) {
        console.error("Error saving high score:", error)
      }
    }
  }, [])

  // Check if current score beats high score
  const checkHighScore = useCallback((currentScore: number) => {
    const isNewHigh = currentScore > highScore.score
    setIsNewHighScore(isNewHigh)
    return isNewHigh
  }, [highScore.score])

  // Reset the new high score flag
  const resetNewHighScoreFlag = useCallback(() => {
    setIsNewHighScore(false)
  }, [])

  return {
    highScore,
    isNewHighScore,
    saveHighScore,
    checkHighScore,
    resetNewHighScoreFlag
  }
}
