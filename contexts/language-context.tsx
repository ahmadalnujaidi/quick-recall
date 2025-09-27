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

    // Name Entry Screen
    "game.newHighScore": "New High Score!",
    "game.congratulations": "Congratulations!",
    "game.enterNamePrompt": "You've set a new high score! Enter your name to claim this achievement.",
    "game.enterYourName": "Enter your name...",
    "game.saveHighScore": "Save High Score",
    "game.useKeyboard": "Use the keyboard above to enter your name",
    "game.amazingAchievement": "Amazing Achievement!",
    "game.memorySkillsExceptional": "Your memory skills are truly exceptional. This score will be remembered!",

    // Game Over Screen
    "game.gameOver": "Game Over",
    "game.oneWrongAnswer": "One wrong answer ends it all!",
    "game.performanceLevel.legendary": "Legendary",
    "game.performanceLevel.expert": "Expert", 
    "game.performanceLevel.advanced": "Advanced",
    "game.performanceLevel.good": "Good",
    "game.performanceLevel.gettingStarted": "Getting Started",
    "game.performanceMessage.legendary": "Incredible memory mastery!",
    "game.performanceMessage.expert": "Outstanding performance!",
    "game.performanceMessage.advanced": "Great memory skills!",
    "game.performanceMessage.good": "Solid effort!",
    "game.performanceMessage.gettingStarted": "Keep practicing!",
    "game.highestRoundReached": "Highest round reached",
    "game.correctAnswers": "Correct Answers",
    "game.difficultyLevel": "Difficulty Level",
    "game.tryAgain": "Try Again",
    "game.proTip": "Pro Tip:",
    "game.memoryImproves": "Memory improves with practice! Each round makes your brain stronger.",

    // Start Screen
    "game.endlessChallenge": "Endless Challenge Mode",
    "game.challengeYourself": "Challenge yourself! How many rounds can you survive?",
    "game.oneMistake": "One mistake ends the game. Each round gets harder!",
    "game.currentHighScore": "Current High Score",
    "game.heldBy": "held by",
    "game.anonymous": "Anonymous",
    "game.beatThisScore": "Beat this score to claim the crown!",
    "game.noHighScore": "No high score yet!",
    "game.firstRecord": "Be the first to set a record",

    // General UI
    "game.readyToSubmit": "Ready to submit!",
    "game.enterMoreDigits": "Enter more digits",
    "game.digits": "digits",
    "game.level": "Level",
    "game.clear": "Clear",
    "game.space": "Space",
    "game.save": "Save",
    "game.shift": "SHIFT",
  },
  ar: {
    // Start Screen
    "game.title": "تحدي على الطاير",
    "game.subtitle": "اختبر ذاكرتك في خطوات بسيطة",
    "game.start": "ابدأ التحدي",
    "game.howToPlay": "كيفية اللعب:",
    "game.step1": "شاهد التسلسل",
    "game.step2": "احفظ الترتيب",
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
    "game.clear": "مسح",
    "game.delete": "حذف",
    "game.submit": "إرسال",

    // Feedback Screen
    "game.correct": "صحيح!",
    "game.incorrect": "خطأ",
    "game.correctSequence": "التسلسل الصحيح:",
    "game.yourAnswer": "إجابتك:",
    "game.nextRound": "الجولة التالية",
    "game.viewResults": "عرض النتائج",
    "game.sequenceComparison": "مقارنة التسلسل:",

    // Completion Screen
    "game.youDidIt": "أحسنت!",
    "game.excellent": "ممتاز",
    "game.good": "جيد",
    "game.fair": "مقبول",
    "game.keepPracticing": "استمر في التدريب",
    "game.sequencesRecalled": "تسلسل تم تذكره بشكل صحيح",
    "game.accuracy": "الدقة:",
    "game.playAgain": "العب مرة أخرى",
    "game.exit": "خروج",
    "game.didYouKnow": "هل تعلم؟",

    // Performance Messages
    "game.performance.excellent": "مهارات ذاكرة استثنائية! أنت بطل في التذكر!",
    "game.performance.good": "عمل رائع! ذاكرتك قوية ومتطورة!",
    "game.performance.fair": "جهد جيد! استمر في التدريب لتحسين قدرتك على التذكر!",
    "game.performance.poor": "كل خبير كان مبتدئاً يوماً ما. استمر في تدريب ذاكرتك!",

    // Fun Facts
    "game.fact.excellent": "سعة ذاكرتك العاملة أعلى من المتوسط! معظم الناس يحتفظون بـ ٧±٢ عنصر فقط.",
    "game.fact.good": "التدريب المنتظم للذاكرة يمكن أن يحسن قدرتك على التذكر بنسبة تصل إلى ٤٠٪!",
    "game.fact.fair": "ألعاب الذاكرة مثل هذه تساعد في تحسين التركيز والمرونة المعرفية.",
    "game.fact.poor": "الشخص العادي ينسى ٥٠٪ من المعلومات الجديدة خلال ساعة. التدريب يساعد!",

    // Name Entry Screen
    "game.newHighScore": "رقم قياسي جديد!",
    "game.congratulations": "تهانينا!",
    "game.enterNamePrompt": "لقد حققت رقماً قياسياً جديداً! أدخل اسمك لتسجيل هذا الإنجاز.",
    "game.enterYourName": "أدخل اسمك...",
    "game.saveHighScore": "حفظ الرقم القياسي",
    "game.useKeyboard": "استخدم لوحة المفاتيح أعلاه لإدخال اسمك",
    "game.amazingAchievement": "إنجاز مذهل!",
    "game.memorySkillsExceptional": "مهاراتك في الذاكرة استثنائية حقاً. هذا الرقم سيُذكر!",

    // Game Over Screen
    "game.gameOver": "انتهت اللعبة",
    "game.oneWrongAnswer": "إجابة خاطئة واحدة تنهي كل شيء!",
    "game.performanceLevel.legendary": "أسطوري",
    "game.performanceLevel.expert": "خبير",
    "game.performanceLevel.advanced": "متقدم",
    "game.performanceLevel.good": "جيد",
    "game.performanceLevel.gettingStarted": "بداية الطريق",
    "game.performanceMessage.legendary": "إتقان مذهل للذاكرة!",
    "game.performanceMessage.expert": "أداء متميز!",
    "game.performanceMessage.advanced": "مهارات ذاكرة عظيمة!",
    "game.performanceMessage.good": "جهد قوي!",
    "game.performanceMessage.gettingStarted": "استمر في التدريب!",
    "game.highestRoundReached": "أعلى جولة تم الوصول إليها",
    "game.correctAnswers": "الإجابات الصحيحة",
    "game.difficultyLevel": "مستوى الصعوبة",
    "game.tryAgain": "حاول مرة أخرى",
    "game.proTip": "نصيحة:",
    "game.memoryImproves": "الذاكرة تتحسن بالتدريب! كل جولة تقوي عقلك.",

    // Start Screen
    "game.endlessChallenge": "وضع التحدي اللانهائي",
    "game.challengeYourself": "تحدّ نفسك! كم جولة يمكنك أن تنجو منها؟",
    "game.oneMistake": "خطأ واحد ينهي اللعبة. كل جولة تصبح أصعب!",
    "game.currentHighScore": "الرقم القياسي الحالي",
    "game.heldBy": "محقق بواسطة",
    "game.anonymous": "مجهول",
    "game.beatThisScore": "اهزم هذا الرقم لتحتل التاج!",
    "game.noHighScore": "لا يوجد رقم قياسي بعد!",
    "game.firstRecord": "كن أول من يسجل رقماً قياسياً",

    // General UI
    "game.readyToSubmit": "جاهز للإرسال!",
    "game.enterMoreDigits": "أدخل المزيد من الأرقام",
    "game.digits": "أرقام",
    "game.level": "المستوى",
    "game.clear": "مسح",
    "game.space": "مسافة",
    "game.save": "حفظ",
    "game.shift": "تبديل",
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
