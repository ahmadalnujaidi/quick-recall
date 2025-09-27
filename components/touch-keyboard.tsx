"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TouchKeyboardProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  maxLength?: number
}

export function TouchKeyboard({ value, onChange, onSubmit, maxLength = 20 }: TouchKeyboardProps) {
  const [isShift, setIsShift] = useState(false)

  const qwertyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ]

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  const handleKeyPress = (key: string) => {
    if (value.length >= maxLength) return
    
    const finalKey = isShift ? key.toUpperCase() : key.toLowerCase()
    onChange(value + finalKey)
    
    // Auto turn off shift after one character (like mobile keyboards)
    if (isShift && key.match(/[a-zA-Z]/)) {
      setIsShift(false)
    }
  }

  const handleBackspace = () => {
    onChange(value.slice(0, -1))
  }

  const handleSpace = () => {
    if (value.length >= maxLength) return
    onChange(value + ' ')
  }

  const handleShift = () => {
    setIsShift(!isShift)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-3">
      {/* Numbers Row */}
      <div className="flex justify-center gap-1">
        {numbers.map((num) => (
          <Button
            key={num}
            onClick={() => handleKeyPress(num)}
            variant="outline"
            size="sm"
            className="h-12 w-10 text-lg font-semibold hover:bg-secondary hover:text-secondary-foreground touch-manipulation"
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Letter Rows */}
      {qwertyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {/* Shift button on last row */}
          {rowIndex === 2 && (
            <Button
              onClick={handleShift}
              variant="outline"
              size="sm"
              className={`h-12 w-16 text-xs font-semibold touch-manipulation ${
                isShift ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              SHIFT
            </Button>
          )}
          
          {row.map((letter) => (
            <Button
              key={letter}
              onClick={() => handleKeyPress(letter)}
              variant="outline"
              size="sm"
              className="h-12 w-10 text-lg font-semibold hover:bg-secondary hover:text-secondary-foreground touch-manipulation"
            >
              {isShift ? letter.toUpperCase() : letter.toLowerCase()}
            </Button>
          ))}
          
          {/* Backspace button on last row */}
          {rowIndex === 2 && (
            <Button
              onClick={handleBackspace}
              variant="outline"
              size="sm"
              className="h-12 w-16 text-xs hover:bg-destructive/10 hover:text-destructive touch-manipulation"
            >
              ⌫
            </Button>
          )}
        </div>
      ))}

      {/* Bottom Row - Space, Clear, Submit */}
      <div className="flex justify-center gap-2">
        <Button
          onClick={handleClear}
          variant="outline"
          size="sm"
          className="h-12 px-4 text-sm font-semibold hover:bg-muted hover:text-muted-foreground touch-manipulation"
        >
          Clear
        </Button>
        
        <Button
          onClick={handleSpace}
          variant="outline"
          size="sm"
          className="h-12 flex-1 max-w-32 text-sm font-semibold hover:bg-secondary hover:text-secondary-foreground touch-manipulation"
        >
          Space
        </Button>
        
        <Button
          onClick={onSubmit}
          disabled={!value.trim()}
          size="sm"
          className="h-12 px-6 text-sm font-bold bg-yellow-500 hover:bg-yellow-600 text-black touch-manipulation disabled:opacity-50"
        >
          Save
        </Button>
      </div>
    </div>
  )
}
