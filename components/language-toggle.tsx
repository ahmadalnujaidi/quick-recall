"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, setLanguage, isRTL } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className={`
        fixed top-4 z-50 bg-background/80 backdrop-blur-sm border-2 hover:bg-accent/50 transition-all duration-200 px-3 py-2
        ${isRTL ? "right-4" : "left-4"}
      `}
    >
      <span className="text-sm font-medium">{language === "en" ? "AR" : "EN"}</span>
    </Button>
  )
}
