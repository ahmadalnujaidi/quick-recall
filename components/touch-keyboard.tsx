"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface TouchKeyboardProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  maxLength?: number
}

export function TouchKeyboard({ value, onChange, onSubmit, maxLength = 20 }: TouchKeyboardProps) {
  const { language, t } = useLanguage()
  const [isShift, setIsShift] = useState(false)
  const [currentLayout, setCurrentLayout] = useState<'en' | 'ar'>('en')

  const qwertyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ]

  const arabicRows = [
    ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'],
    ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك'],
    ['ظ', 'ط', 'ذ', 'د', 'ز', 'ر', 'و', 'ة', 'ى', 'ء', 'ؤ', 'ئ']
  ]

  const currentRows = currentLayout === 'ar' ? arabicRows : qwertyRows

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

  const toggleLayout = () => {
    setCurrentLayout(currentLayout === 'en' ? 'ar' : 'en')
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-3">
      {/* Language Toggle */}
      <div className="flex justify-center mb-2">
        <Button
          onClick={toggleLayout}
          variant="outline"
          size="sm"
          className="h-10 px-4 text-sm font-semibold hover:bg-primary hover:text-primary-foreground touch-manipulation"
        >
          {currentLayout === 'en' ? 'عربي' : 'English'}
        </Button>
      </div>


      {/* Letter Rows */}
      {currentRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1" dir={currentLayout === 'ar' ? 'rtl' : 'ltr'}>
          {/* Shift button on last row (only for English) */}
          {rowIndex === 2 && currentLayout === 'en' && (
            <Button
              onClick={handleShift}
              variant="outline"
              size="sm"
              className={`h-12 w-16 text-xs font-semibold touch-manipulation ${
                isShift ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              {t("game.shift")}
            </Button>
          )}
          
          {row.map((letter) => (
            <Button
              key={letter}
              onClick={() => handleKeyPress(letter)}
              variant="outline"
              size="sm"
              className={`h-12 text-lg font-semibold hover:bg-secondary hover:text-secondary-foreground touch-manipulation ${
                currentLayout === 'ar' ? 'w-8' : 'w-10'
              }`}
            >
              {currentLayout === 'ar' ? letter : (isShift ? letter.toUpperCase() : letter.toLowerCase())}
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
          {t("game.clear")}
        </Button>
        
        <Button
          onClick={handleSpace}
          variant="outline"
          size="sm"
          className="h-12 flex-1 max-w-32 text-sm font-semibold hover:bg-secondary hover:text-secondary-foreground touch-manipulation"
        >
          {t("game.space")}
        </Button>
        
        <Button
          onClick={onSubmit}
          disabled={!value.trim()}
          size="sm"
          className="h-12 px-6 text-sm font-bold bg-yellow-500 hover:bg-yellow-600 text-black touch-manipulation disabled:opacity-50"
        >
          {t("game.save")}
        </Button>
      </div>
    </div>
  )
}
