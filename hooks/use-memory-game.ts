"use client"

import { useState, useCallback, useEffect } from "react"
import { useHighScore } from "./use-high-score"

export type GameState = "start" | "display" | "input" | "feedback" | "gameOver" | "nameEntry"

export interface GameStats {
  currentRound: number
  correctAnswers: number
  totalRounds: number // Keep for UI compatibility, but will be infinity symbol
  currentSequence: number[]
  userInput: number[]
  isCorrect: boolean | null
  timeRemaining: number
}

export function useMemoryGame() {
  const { highScore, isNewHighScore, saveHighScore, checkHighScore, resetNewHighScoreFlag } = useHighScore()
  const [gameState, setGameState] = useState<GameState>("start")
  const [stats, setStats] = useState<GameStats>({
    currentRound: 0,
    correctAnswers: 0,
    totalRounds: 999, // Display as ∞
    currentSequence: [],
    userInput: [],
    isCorrect: null,
    timeRemaining: 0,
  })

  // Generate random sequence based on difficulty (round number)
  const generateSequence = useCallback((round: number) => {
    // Aggressive difficulty: start with 3 digits, add 1 every round until 6, then every 2 rounds, max 15
    let length
    if (round < 3) {
      length = 3 + round // Rounds 1-3: 3,4,5 digits
    } else if (round < 6) {
      length = 6 + (round - 3) // Rounds 4-6: 6,7,8 digits  
    } else {
      length = Math.min(8 + Math.floor((round - 6) / 2), 15) // Every 2 rounds after that, max 15
    }
    
    const sequence = []
    for (let i = 0; i < length; i++) {
      sequence.push(Math.floor(Math.random() * 10))
    }
    return sequence
  }, [])

  // Calculate display time based on round (gets progressively shorter)
  const getDisplayTime = useCallback((round: number) => {
    // More aggressive time reduction: start with 4 seconds, reduce by 0.2s every round, minimum 1.5 seconds
    return Math.max(4 - (round * 0.2), 1.5)
  }, [])

  // Start new game
  const startGame = useCallback(() => {
    const firstSequence = generateSequence(0) // Round 1 uses index 0 for 3 digits
    const displayTime = getDisplayTime(0)
    setStats({
      currentRound: 1,
      correctAnswers: 0,
      totalRounds: 999,
      currentSequence: firstSequence,
      userInput: [],
      isCorrect: null,
      timeRemaining: displayTime,
    })
    setGameState("display")
  }, [generateSequence, getDisplayTime])

  // Start new round
  const startRound = useCallback(() => {
    const newSequence = generateSequence(stats.currentRound - 1)
    const displayTime = getDisplayTime(stats.currentRound - 1)
    setStats((prev) => ({
      ...prev,
      currentSequence: newSequence,
      userInput: [],
      isCorrect: null,
      timeRemaining: displayTime,
    }))
    setGameState("display")
  }, [stats.currentRound, generateSequence, getDisplayTime])

  // Handle countdown timer
  useEffect(() => {
    if (gameState === "display" && stats.timeRemaining > 0) {
      const timer = setTimeout(() => {
        setStats((prev) => ({ ...prev, timeRemaining: Math.max(0, prev.timeRemaining - 0.1) }))
      }, 100) // More granular timer for smoother countdown
      return () => clearTimeout(timer)
    } else if (gameState === "display" && stats.timeRemaining <= 0) {
      setGameState("input")
    }
  }, [gameState, stats.timeRemaining])

  // Add digit to user input
  const addDigit = useCallback(
    (digit: number) => {
      if (stats.userInput.length < stats.currentSequence.length) {
        setStats((prev) => ({
          ...prev,
          userInput: [...prev.userInput, digit],
        }))
      }
    },
    [stats.userInput.length, stats.currentSequence.length],
  )

  // Remove last digit
  const removeDigit = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      userInput: prev.userInput.slice(0, -1),
    }))
  }, [])

  // Clear all input
  const clearInput = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      userInput: [],
    }))
  }, [])

  // Submit answer
  const submitAnswer = useCallback(() => {
    const isCorrect = JSON.stringify(stats.userInput) === JSON.stringify(stats.currentSequence)
    setStats((prev) => ({
      ...prev,
      isCorrect,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
    }))
    setGameState("feedback")
  }, [stats.userInput, stats.currentSequence])

  // Next round or game over
  const nextRound = useCallback(() => {
    // If last answer was incorrect, game over immediately
    if (stats.isCorrect === false) {
      // Check if this is a new high score
      const finalScore = stats.currentRound
      const isNewHigh = checkHighScore(finalScore)
      
      if (isNewHigh) {
        setGameState("nameEntry")
      } else {
        setGameState("gameOver")
      }
    } else {
      // Continue to next round
      const nextRoundNum = stats.currentRound + 1
      setStats((prev) => ({
        ...prev,
        currentRound: nextRoundNum,
      }))
      setTimeout(() => {
        const newSequence = generateSequence(nextRoundNum - 1) // Use next round for sequence
        const displayTime = getDisplayTime(nextRoundNum - 1)
        setStats((prev) => ({
          ...prev,
          currentSequence: newSequence,
          userInput: [],
          isCorrect: null,
          timeRemaining: displayTime,
        }))
        setGameState("display")
      }, 0)
    }
  }, [stats.currentRound, stats.isCorrect, generateSequence, getDisplayTime, checkHighScore])

  // Handle name submission for high score
  const submitHighScoreName = useCallback((name: string) => {
    saveHighScore(stats.currentRound, name)
    setGameState("gameOver")
  }, [stats.currentRound, saveHighScore])

  // Reset game
  const resetGame = useCallback(() => {
    resetNewHighScoreFlag()
    setGameState("start")
    setStats({
      currentRound: 0,
      correctAnswers: 0,
      totalRounds: 999,
      currentSequence: [],
      userInput: [],
      isCorrect: null,
      timeRemaining: 0,
    })
  }, [resetNewHighScoreFlag])

  return {
    gameState,
    stats,
    highScore,
    isNewHighScore,
    startGame,
    startRound,
    addDigit,
    removeDigit,
    clearInput,
    submitAnswer,
    nextRound,
    submitHighScoreName,
    resetGame,
  }
}
