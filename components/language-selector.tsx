"use client"
import { Card } from "@/components/ui/card"
import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface LanguageSelectorProps {
  onLanguageSelected: () => void
}

export function LanguageSelector({ onLanguageSelected }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()

  const handleLanguageSelect = (lang: "en" | "ar") => {
    setLanguage(lang)
    onLanguageSelected()
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center animate-fade-in">
      {/* Header with icon */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="p-4 bg-primary/10 rounded-full">
          <Languages className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {t("language.select")}
        </h1>
      </div>

      {/* Language options */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/50 flex-1"
          onClick={() => handleLanguageSelect("en")}
        >
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">🇺🇸</div>
            <div className="text-lg font-semibold">{t("language.english")}</div>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/50 flex-1"
          onClick={() => handleLanguageSelect("ar")}
        >
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">🇸🇦</div>
            <div className="text-lg font-semibold">{t("language.arabic")}</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
