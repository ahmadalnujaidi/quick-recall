"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations = {
  en: {
    // Start Screen
    "game.title": "Quick Recall Challenge",
    "game.subtitle": "Test your short-term memory in just a few steps",
    "game.start": "Start Challenge",
    "game.howToPlay": "How to play:",
    "game.step1": "Watch the sequence",
    "game.step2": "Remember the order",
    "game.step3": "Enter what you saw",

    // Language Selection
    "language.select": "Select Language",
    "language.english": "English",
    "language.arabic": "العربية",

    // Sequence Display
    "game.round": "Round",
    "game.of": "of",
    "game.memorize": "Memorize this sequence:",
    "game.timeRemaining": "Time remaining:",
    "game.seconds": "s",

    // Input Screen
    "game.enterSequence": "Enter the sequence you saw:",
    "game.yourInput": "Your input:",
    "game.clear": "Clear",
    "game.delete": "Delete",
    "game.submit": "Submit",

    // Feedback Screen
    "game.correct": "Correct!",
    "game.incorrect": "Incorrect",
    "game.correctSequence": "Correct sequence:",
    "game.yourAnswer": "Your answer:",
    "game.nextRound": "Next Round",
    "game.viewResults": "View Results",
    "game.sequenceComparison": "Sequence comparison:",

    // Completion Screen
    "game.youDidIt": "You Did It!",
    "game.excellent": "Excellent",
    "game.good": "Good",
    "game.fair": "Fair",
    "game.keepPracticing": "Keep Practicing",
    "game.sequencesRecalled": "sequences recalled correctly",
    "game.accuracy": "Accuracy:",
    "game.playAgain": "Play Again",
    "game.exit": "Exit",
    "game.didYouKnow": "Did you know?",

    // Performance Messages
    "game.performance.excellent": "Outstanding memory skills! You're a recall champion!",
    "game.performance.good": "Great job! Your memory is sharp and improving!",
    "game.performance.fair": "Good effort! Keep practicing to boost your recall!",
    "game.performance.poor": "Every expert was once a beginner. Keep training your memory!",

    // Fun Facts
    "game.fact.excellent": "Your working memory capacity is above average! Most people can only hold 7±2 items.",
    "game.fact.good": "Regular memory training can improve your recall by up to 40%!",
    "game.fact.fair": "Memory games like this can help improve focus and cognitive flexibility.",
    "game.fact.poor": "The average person forgets 50% of new information within an hour. Practice helps!",
  },
  ar: {
    // Start Screen
    "game.title": "تحدي على الطاير",
    "game.subtitle": "اختبر ذاكرتك قصيرة المدى في خطوات بسيطة",
    "game.start": "ابدأ التحدي",
    "game.howToPlay": "كيفية اللعب:",
    "game.step1": "شاهد التسلسل",
    "game.step2": "تذكر الترتيب",
    "game.step3": "أدخل ما رأيته",

    // Language Selection
    "language.select": "اختر اللغة",
    "language.english": "English",
    "language.arabic": "العربية",

    // Sequence Display
    "game.round": "الجولة",
    "game.of": "من",
    "game.memorize": "احفظ هذا التسلسل:",
    "game.timeRemaining": "الوقت المتبقي:",
    "game.seconds": "ث",

    // Input Screen
    "game.enterSequence": "أدخل التسلسل الذي رأيته:",
    "game.yourInput": "إدخالك:",
    "game.clear": "مسح الكل",
    "game.delete": "مسح",
    "game.submit": "إرسال",

    // Feedback Screen
    "game.correct": "!صحيح",
    "game.incorrect": "خطأ",
    "game.correctSequence": "التسلسل الصحيح:",
    "game.yourAnswer": "إجابتك:",
    "game.nextRound": "الجولة التالية",
    "game.viewResults": "عرض النتائج",
    "game.sequenceComparison": ":مقارنة التسلسل",

    // Completion Screen
    "game.youDidIt": "!أحسنت",
    "game.excellent": "ممتاز",
    "game.good": "جيد",
    "game.fair": "مقبول",
    "game.keepPracticing": "استمر في التدريب",
    "game.sequencesRecalled": "تسلسل تم تذكره بشكل صحيح",
    "game.accuracy": ":الدقة",
    "game.playAgain": "العب مرة أخرى",
    "game.exit": "خروج",
    "game.didYouKnow": "هل تعلم؟",

    // Performance Messages
    "game.performance.excellent": "!مهارات ذاكرة رائعة! جبتها على الطاير ",
    "game.performance.good": "!عمل رائع! ذاكرتك حادة وتتحسن",
    "game.performance.fair": "!جهد جيد! استمر في التدريب لتعزيز قدرتك على التذكر",
    "game.performance.poor": "!كل خبير كان مبتدئاً يوماً ما. استمر في تدريب ذاكرتك",

    // Fun Facts
    "game.fact.excellent": "سعة ذاكرتك العاملة أعلى من المتوسط! معظم الناس يمكنهم الاحتفاظ بـ 7±2 عنصر فقط.",
    "game.fact.good": "التدريب المنتظم للذاكرة يمكن أن يحسن قدرتك على التذكر بنسبة تصل إلى 40%!",
    "game.fact.fair": "ألعاب الذاكرة مثل هذه يمكن أن تساعد في تحسين التركيز والمرونة المعرفية.",
    "game.fact.poor": "الشخص العادي ينسى 50% من المعلومات الجديدة خلال ساعة. التدريب يساعد!",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const isRTL = language === "ar"

  useEffect(() => {
    // Apply RTL direction to document
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language

    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("lang", language)
    }
  }, [language, isRTL])

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
