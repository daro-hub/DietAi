"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  User,
  X,
  ArrowLeft,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  FileText,
  Lightbulb,
  Check,
  Bot,
  MoreVertical,
  RefreshCw,
  Heart,
  Trash2,
  Minimize2,
  Coffee,
  Apple,
  Utensils,
  Cookie,
} from "lucide-react"

const goalSuggestions = [
  "Lose weight",
  "Gain muscle",
  "Maintain weight",
  "Improve energy",
  "Better digestion",
  "Reduce inflammation",
  "Athletic performance",
  "General health",
]

const activitySuggestions = [
  "Sedentary",
  "Lightly active",
  "Moderately active",
  "Very active",
  "Extremely active",
  "Athlete",
  "Office worker",
  "Manual labor",
]

const preferenceSuggestions = [
  "Vegetarian",
  "Vegan",
  "Keto",
  "Mediterranean",
  "Low carb",
  "High protein",
  "Gluten-free",
  "Dairy-free",
  "Paleo",
  "Intermittent fasting",
  "No restrictions",
]

const bodyTypes = [
  { id: "ectomorph", name: "Ectomorph", description: "Lean, difficulty gaining weight" },
  { id: "mesomorph", name: "Mesomorph", description: "Athletic, gains muscle easily" },
  { id: "endomorph", name: "Endomorph", description: "Curvy, gains weight easily" },
]

const wizardSteps = [
  { id: "intro", title: "Introduction", required: false },
  { id: "age", title: "Age", required: true },
  { id: "weight", title: "Weight", required: true },
  { id: "height", title: "Height", required: true },
  { id: "gender", title: "Gender", required: true },
  { id: "bodyType", title: "Body Type", required: false },
  { id: "goals", title: "Goals", required: true },
  { id: "activityLevel", title: "Activity Level", required: true },
  { id: "preferences", title: "Preferences", required: false },
  { id: "recap", title: "Review", required: false },
]

export function SimpleGenerateOptions() {
  const [selectedOption, setSelectedOption] = useState<"biometric" | "manual" | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState<{
    goals: boolean
    activityLevel: boolean
    preferences: boolean
  }>({ goals: false, activityLevel: false, preferences: false })

  const [saveToAccount, setSaveToAccount] = useState(false)
  const [showDietPlan, setShowDietPlan] = useState(false)
  const [showSuggestionsDialog, setShowSuggestionsDialog] = useState(false)
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([])
  const [currentSuggestionType, setCurrentSuggestionType] = useState<"goals" | "activityLevel" | "preferences">("goals")

  const [formData, setFormData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    gender: "",
    bodyType: "",
    goals: "",
    activityLevel: "",
    preferences: "",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("dietai-form-data")
    const savedOption = localStorage.getItem("dietai-selected-option")
    const savedStep = localStorage.getItem("dietai-wizard-step")

    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
    if (savedOption) {
      setSelectedOption(savedOption as "biometric" | "manual")
    }
    if (savedStep && savedOption === "manual") {
      setCurrentStep(Number.parseInt(savedStep))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("dietai-form-data", JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    if (selectedOption) {
      localStorage.setItem("dietai-selected-option", selectedOption)
    }
  }, [selectedOption])

  useEffect(() => {
    if (selectedOption === "manual") {
      localStorage.setItem("dietai-wizard-step", currentStep.toString())
    }
  }, [currentStep, selectedOption])

  // Gestione scroll per navigazione tra le pagine - una slide alla volta
  useEffect(() => {
    if (selectedOption !== "manual") return
    if (showSuggestionsDialog) return // Blocca scroll quando dialog è aperto

    let lastScrollTime = 0
    const scrollCooldown = 800 // 800ms tra le navigazioni per PC

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown) return
      
      if (e.deltaY > 0 && currentStep < wizardSteps.length - 1) {
        lastScrollTime = now
        nextStep()
      } else if (e.deltaY < 0 && currentStep > 0) {
        lastScrollTime = now
        prevStep()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      const startY = e.touches[0].clientY
      let startTime = Date.now()
      
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault()
      }
      
      const handleTouchEnd = (e: TouchEvent) => {
        const endY = e.changedTouches[0].clientY
        const diff = startY - endY
        const now = Date.now()
        
        if (Math.abs(diff) > 30 && now - lastScrollTime > scrollCooldown) {
          if (diff > 0 && currentStep < wizardSteps.length - 1) {
            lastScrollTime = now
            nextStep()
          } else if (diff < 0 && currentStep > 0) {
            lastScrollTime = now
            prevStep()
          }
        }
        
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchstart', handleTouchStart)

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [selectedOption, currentStep, wizardSteps.length, showSuggestionsDialog])

  const openSuggestionsDialog = (type: "goals" | "activityLevel" | "preferences") => {
    setCurrentSuggestionType(type)
    // Mantieni le selezioni precedenti se esistono
    const currentValue = formData[type]
    if (currentValue) {
      const suggestions = currentValue.split('\n').map(s => s.replace('• ', '')).filter(s => s.trim())
      setSelectedSuggestions(suggestions)
    } else {
      setSelectedSuggestions([])
    }
    setShowSuggestionsDialog(true)
  }

  const handleSuggestionSelect = (suggestion: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(suggestion) 
        ? prev.filter(s => s !== suggestion)
        : [...prev, suggestion]
    )
  }

  const applySuggestions = () => {
    const suggestionsText = selectedSuggestions.map(s => `• ${s}`).join('\n')
    setFormData(prev => ({
      ...prev,
      [currentSuggestionType]: suggestionsText
    }))
    setShowSuggestionsDialog(false)
    setSelectedSuggestions([])
  }

  const getSuggestions = (type: "goals" | "activityLevel" | "preferences") => {
    switch (type) {
      case "goals": return goalSuggestions
      case "activityLevel": return activitySuggestions
      case "preferences": return preferenceSuggestions
      default: return []
    }
  }

  const getCarouselValues = (field: "age" | "weight" | "height", currentValue: number) => {
    const ranges = {
      age: { min: 0, max: 150, step: 1 },
      weight: { min: 0, max: 150, step: 1 },
      height: { min: 0, max: 150, step: 1 },
    }

    const range = ranges[field]
    const values = []

    // Mostra 5 numeri prima e 5 dopo il valore corrente, centrando sempre il numero selezionato
    for (let i = currentValue - 5; i <= currentValue + 5; i++) {
      if (i >= range.min && i <= range.max) {
        values.push(i)
      }
    }

    return values
  }

  const adjustValue = (field: "age" | "weight" | "height", direction: "up" | "down") => {
    const increments = { age: 1, weight: 1, height: 1 }
    const mins = { age: 16, weight: 30, height: 120 }
    const maxs = { age: 100, weight: 200, height: 220 }

    const increment = increments[field]
    const currentValue = formData[field]
    const newValue =
      direction === "up"
        ? Math.min(maxs[field], currentValue + increment)
        : Math.max(mins[field], currentValue - increment)

    setFormData((prev) => ({ ...prev, [field]: newValue }))
  }

  const addSuggestion = (field: "goals" | "activityLevel" | "preferences", suggestion: string) => {
    const currentValue = formData[field]
    const suggestions = currentValue ? currentValue.split(", ") : []

    if (!suggestions.includes(suggestion)) {
      const newValue = suggestions.length > 0 ? `${currentValue}, ${suggestion}` : suggestion
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    }
  }

  const removeSuggestion = (field: "goals" | "activityLevel" | "preferences", suggestion: string) => {
    const currentValue = formData[field]
    const suggestions = currentValue.split(", ").filter((s) => s !== suggestion)
    setFormData((prev) => ({ ...prev, [field]: suggestions.join(", ") }))
  }

  const getSuggestionsArray = (field: "goals" | "activityLevel" | "preferences") => {
    return formData[field] ? formData[field].split(", ").filter((s) => s.trim()) : []
  }

  const isStepValid = (stepId: string) => {
    switch (stepId) {
      case "age":
        return formData.age > 0
      case "weight":
        return formData.weight > 0
      case "height":
        return formData.height > 0
      case "gender":
        return formData.gender !== ""
      case "goals":
        return formData.goals.trim() !== ""
      case "activityLevel":
        return formData.activityLevel.trim() !== ""
      default:
        return true
    }
  }

  const isFormValid = () => {
    // Per debug: permette di generare anche senza dati completi
    return true
    // return wizardSteps.filter((step) => step.required).every((step) => isStepValid(step.id))
  }

  const nextStep = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert("Please fill in all required fields")
      return
    }
    console.log("[v0] Form submitted with data:", formData)
    setShowDietPlan(true)
  }

  const handleSaveToAccount = () => {
    console.log("[v0] Saving user data to account:", formData)
  }

  if (showDietPlan) {
    return <DietPlanResult formData={formData} onBack={() => setShowDietPlan(false)} />
  }

  if (selectedOption === null) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Generate Your Diet Plan</h1>
            <p className="text-muted-foreground">Choose how you want to create your personalized diet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Biometric Option */}
            <Card className="cursor-not-allowed opacity-50 relative overflow-hidden border-2 hover:border-muted transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Biometric File</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your medical test results for maximum accuracy
                </p>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full inline-block">
                  More Accurate
                </div>
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Manual Option */}
            <Card
              className="cursor-pointer border-2 hover:border-primary transition-colors"
              onClick={() => setSelectedOption("manual")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Manual Input</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fill in your information manually through our guided wizard
                </p>
                <Button className="w-full">Start Manual Input</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (selectedOption === "manual") {
    return (
      <div className="fixed inset-0 bg-background z-50">
        {/* Tasto indietro - In alto */}
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={() => setSelectedOption(null)} 
          className="absolute top-4 left-0 z-20 h-12 w-8 p-0"
        >
          <ChevronLeft className="w-10 h-10" />
        </Button>

        {/* Progress Bar - Verticale sul lato sinistro con position absolute */}
        <div className="absolute left-0 top-0 w-8 h-full bg-muted/20 flex flex-col items-center justify-center space-y-6 z-10">
          {wizardSteps.map((step, index) => (
            <div
              key={step.id}
              className={`rounded-full cursor-pointer transition-all duration-300 ${
                index === currentStep
                  ? "bg-black w-3 h-3 scale-110"
                  : "bg-gray-400 w-1.5 h-1.5"
              }`}
              onClick={() => goToStep(index)}
              title={step.title}
            />
          ))}
        </div>

        {/* Contenuto principale - occupa tutto lo spazio disponibile */}
        <div className="w-full h-full relative overflow-hidden">
          <div
            className="h-full w-full flex flex-col transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentStep * 100}%)` }}
          >
            {wizardSteps.map((step, index) => (
              <div key={step.id} className="h-full w-full flex-shrink-0 flex items-center justify-center px-8">
                <Card className="w-full max-w-lg mx-auto">
                  <CardContent className="p-6">
                    {step.id === "intro" && (
                      <div className="text-center space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">Let's Create Your Perfect Diet</h2>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-800">
                              The more fields you complete and the more detailed descriptions you provide, the more
                              accurate and tailored your diet plan will be.
                            </p>
                          </div>
                        </div>
                        <Button onClick={nextStep} className="w-full">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    )}

                    {step.id === "age" && (
                      <div className="space-y-6 text-center">
                        <h2 className="text-2xl font-bold">What's your age? {step.required && "*"}</h2>
                        <div className="flex justify-center">
                          <input
                            type="number"
                            min="0"
                            max="150"
                            value={formData.age || ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                            className="w-32 h-16 text-4xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                            placeholder="25"
                          />
                        </div>
                        <p className="text-muted-foreground">years old</p>
                      </div>
                    )}

                    {step.id === "weight" && (
                      <div className="space-y-6 text-center">
                        <h2 className="text-2xl font-bold">What's your weight? {step.required && "*"}</h2>
                        <div className="flex justify-center">
                          <input
                            type="number"
                            min="0"
                            max="150"
                            value={formData.weight || ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                            className="w-32 h-16 text-4xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                            placeholder="85"
                          />
                        </div>
                        <p className="text-muted-foreground">kilograms</p>
                      </div>
                    )}

                    {step.id === "height" && (
                      <div className="space-y-6 text-center">
                        <h2 className="text-2xl font-bold">What's your height? {step.required && "*"}</h2>
                        <div className="flex justify-center">
                          <input
                            type="number"
                            min="0"
                            max="3"
                            step="0.01"
                            value={formData.height || ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, height: parseFloat(e.target.value) || 0 }))}
                            className="w-32 h-16 text-4xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                            placeholder="1.70"
                          />
                        </div>
                        <p className="text-muted-foreground">meters</p>
                      </div>
                    )}

                    {step.id === "gender" && (
                      <div className="space-y-6 text-center">
                        <h2 className="text-2xl font-bold">What's your gender? {step.required && "*"}</h2>
                        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                          <Card
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              formData.gender === "male" ? "border-primary bg-primary/5" : ""
                            }`}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, gender: "male" }))
                              setTimeout(() => nextStep(), 300)
                            }}
                          >
                            <CardContent className="p-6 text-center">
                              <div className="text-4xl font-bold mb-2">M</div>
                              <div className="text-sm text-muted-foreground">Male</div>
                            </CardContent>
                          </Card>
                          <Card
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              formData.gender === "female" ? "border-primary bg-primary/5" : ""
                            }`}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, gender: "female" }))
                              setTimeout(() => nextStep(), 300)
                            }}
                          >
                            <CardContent className="p-6 text-center">
                              <div className="text-4xl font-bold mb-2">F</div>
                              <div className="text-sm text-muted-foreground">Female</div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {step.id === "bodyType" && (
                      <div className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold">What's your body type?</h2>
                        <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
                          {bodyTypes.map((type) => (
                            <Card
                              key={type.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                formData.bodyType === type.id ? "border-primary bg-primary/5" : ""
                              }`}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, bodyType: type.id }))
                                setTimeout(() => nextStep(), 300)
                              }}
                            >
                              <CardContent className="p-3 flex items-center space-x-3">
                                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                                  <img
                                    src={`/body-type-${type.id}.jpg`}
                                    alt={type.name}
                                    className="w-10 h-10 object-contain rounded-full"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none"
                                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                                      if (nextElement) nextElement.style.display = "block"
                                    }}
                                  />
                                  <div className="text-xs font-medium hidden">{type.name[0]}</div>
                                </div>
                                <div className="text-left">
                                  <div className="font-medium text-sm">{type.name}</div>
                                  <div className="text-xs text-muted-foreground">{type.description}</div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.id === "goals" && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold">What are your goals? {step.required && "*"}</h2>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            onClick={() => openSuggestionsDialog("goals")}
                            className="border"
                          >
                            Suggest <Sparkles className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Describe your health and fitness goals..."
                          value={formData.goals}
                          onChange={(e) => setFormData((prev) => ({ ...prev, goals: e.target.value }))}
                          className="min-h-[120px]"
                        />
                      </div>
                    )}

                    {step.id === "activityLevel" && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold">What's your activity level? {step.required && "*"}</h2>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            onClick={() => openSuggestionsDialog("activityLevel")}
                            className="border"
                          >
                            Suggest <Sparkles className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Describe your physical activity level..."
                          value={formData.activityLevel}
                          onChange={(e) => setFormData((prev) => ({ ...prev, activityLevel: e.target.value }))}
                          className="min-h-[120px]"
                        />
                      </div>
                    )}

                    {step.id === "preferences" && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold">Any dietary preferences?</h2>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            onClick={() => openSuggestionsDialog("preferences")}
                            className="border"
                          >
                            Suggest <Sparkles className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Describe your dietary preferences and restrictions..."
                          value={formData.preferences}
                          onChange={(e) => setFormData((prev) => ({ ...prev, preferences: e.target.value }))}
                          className="min-h-[120px]"
                        />
                      </div>
                    )}

                    {step.id === "recap" && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold">Review Your Information</h2>
                        </div>

                        <div className="space-y-4">
                          {/* Tutti i campi in griglia 2x2 */}
                          <div className="grid grid-cols-2 gap-3">
                            <Card 
                              className="cursor-pointer hover:bg-muted/50 transition-colors w-full py-1 px-3" 
                              onClick={() => goToStep(1)}
                            >
                              <CardContent className="p-0">
                                <div className="font-medium text-sm">Age</div>
                                <div className="text-sm">
                                  {formData.age ? `${formData.age} years` : 'N/S'}
                                </div>
                              </CardContent>
                            </Card>

                            <Card 
                              className="cursor-pointer hover:bg-muted/50 transition-colors w-full py-1 px-3" 
                              onClick={() => goToStep(2)}
                            >
                              <CardContent className="p-0">
                                <div className="font-medium text-sm">Weight</div>
                                <div className="text-sm">
                                  {formData.weight ? `${formData.weight} kg` : 'N/S'}
                                </div>
                              </CardContent>
                            </Card>

                            <Card 
                              className="cursor-pointer hover:bg-muted/50 transition-colors w-full py-1 px-3" 
                              onClick={() => goToStep(3)}
                            >
                              <CardContent className="p-0">
                                <div className="font-medium text-sm">Height</div>
                                <div className="text-sm">
                                  {formData.height ? `${formData.height} m` : 'N/S'}
                                </div>
                              </CardContent>
                            </Card>

                            <Card 
                              className="cursor-pointer hover:bg-muted/50 transition-colors w-full py-1 px-3" 
                              onClick={() => goToStep(4)}
                            >
                              <CardContent className="p-0">
                                <div className="font-medium text-sm">Gender</div>
                                <div className="text-sm">
                                  {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'N/S'}
                                </div>
                              </CardContent>
                            </Card>

                            <Card 
                              className="cursor-pointer hover:bg-muted/50 transition-colors w-full py-1 px-3" 
                              onClick={() => goToStep(5)}
                            >
                              <CardContent className="p-0">
                                <div className="font-medium text-sm">Body Type</div>
                                <div className="text-sm">
                                  {formData.bodyType ? formData.bodyType.charAt(0).toUpperCase() + formData.bodyType.slice(1) : 'N/S'}
                                </div>
                              </CardContent>
                            </Card>

                            <Card 
                              className="cursor-pointer hover:bg-muted/50 transition-colors w-full py-1 px-3" 
                              onClick={() => goToStep(6)}
                            >
                              <CardContent className="p-0">
                                <div className="font-medium text-sm">Goals</div>
                                <div className="text-sm">
                                  {formData.goals || 'N/S'}
                                </div>
                              </CardContent>
                            </Card>

                            <Card 
                              className="cursor-pointer hover:bg-muted/50 transition-colors w-full py-1 px-3" 
                              onClick={() => goToStep(7)}
                            >
                              <CardContent className="p-0">
                                <div className="font-medium text-sm">Activity Level</div>
                                <div className="text-sm">
                                  {formData.activityLevel || 'N/S'}
                                </div>
                              </CardContent>
                            </Card>

                            <Card 
                              className="cursor-pointer hover:bg-muted/50 transition-colors w-full py-1 px-3" 
                              onClick={() => goToStep(8)}
                            >
                              <CardContent className="p-0">
                                <div className="font-medium text-sm">Preferences</div>
                                <div className="text-sm">
                                  {formData.preferences || 'N/S'}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <Card className="cursor-pointer py-1 px-3" onClick={() => setSaveToAccount(!saveToAccount)}>
                          <CardContent className="p-0">
                            <div className="flex items-center space-x-3">
                              <Checkbox checked={saveToAccount} onCheckedChange={(checked) => setSaveToAccount(checked === true)} />
                              <p className="font-medium text-sm">Remember this informations</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Button className="w-full" size="lg" onClick={handleSubmit} disabled={!isFormValid()}>
                          Generate <Sparkles className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}

                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog per suggerimenti */}
        <Dialog open={showSuggestionsDialog} onOpenChange={setShowSuggestionsDialog}>
          <DialogContent 
            className=""
            onWheel={(e) => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle>
                Select {currentSuggestionType === "goals" ? "Goals" : 
                       currentSuggestionType === "activityLevel" ? "Activity Level" : 
                       "Preferences"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="max-h-[50vh] overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap-3 items-center w-full">
                  {getSuggestions(currentSuggestionType).map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant={selectedSuggestions.includes(suggestion) ? "default" : "outline"}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="justify-start h-auto p-3 text-left w-fit"
                    >
                      {selectedSuggestions.includes(suggestion) && (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSuggestionsDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={applySuggestions}
                  disabled={selectedSuggestions.length === 0}
                >
                  Done ({selectedSuggestions.length})
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return null
}

function DietPlanResult({ formData, onBack }: { formData: any; onBack: () => void }) {
  const [expandedMeals, setExpandedMeals] = useState<{ [key: string]: boolean }>({})

  const toggleMeal = (mealId: string) => {
    setExpandedMeals((prev) => ({ ...prev, [mealId]: !prev[mealId] }))
  }

  const openMealDetail = (mealId: string) => {
    toggleMeal(mealId)
  }

  const getMealIcon = (mealId: string) => {
    switch (mealId) {
      case "breakfast": return <Coffee className="w-6 h-6" />
      case "lunch": return <Utensils className="w-6 h-6" />
      case "dinner": return <Utensils className="w-6 h-6" />
      case "snacks": return <Cookie className="w-6 h-6" />
      default: return <Apple className="w-6 h-6" />
    }
  }

  const getIngredientIcon = (ingredientName: string) => {
    const name = ingredientName.toLowerCase()
    if (name.includes("oats") || name.includes("cereal")) return "🌾"
    if (name.includes("banana") || name.includes("berry")) return "🍌"
    if (name.includes("chicken") || name.includes("meat")) return "🍗"
    if (name.includes("salmon") || name.includes("fish")) return "🐟"
    if (name.includes("quinoa") || name.includes("rice")) return "🌾"
    if (name.includes("broccoli") || name.includes("vegetable")) return "🥦"
    if (name.includes("avocado")) return "🥑"
    if (name.includes("yogurt")) return "🥛"
    if (name.includes("almond") || name.includes("nut")) return "🥜"
    if (name.includes("oil")) return "🫒"
    return "🥗"
  }

  const exampleDiet = {
    totalCalories: 2150,
    totalMacros: { protein: 140, carbs: 215, fat: 95, fiber: 35 },
    meals: [
      {
        id: "breakfast",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 520,
        macros: { protein: 28, carbs: 45, fat: 22, fiber: 8 },
        ingredients: [
          {
            id: "oats",
            name: "Rolled Oats",
            amount: "60g",
            calories: 220,
            macros: { protein: 8, carbs: 40, fat: 4, fiber: 6 },
          },
          {
            id: "banana",
            name: "Banana",
            amount: "1 medium",
            calories: 105,
            macros: { protein: 1, carbs: 27, fat: 0, fiber: 3 },
          },
          {
            id: "almonds",
            name: "Almonds",
            amount: "20g",
            calories: 115,
            macros: { protein: 4, carbs: 4, fat: 10, fiber: 2 },
          },
          {
            id: "milk",
            name: "Almond Milk",
            amount: "200ml",
            calories: 80,
            macros: { protein: 3, carbs: 8, fat: 3, fiber: 1 },
          },
        ],
      },
      {
        id: "lunch",
        name: "Lunch",
        time: "12:30 PM",
        calories: 680,
        macros: { protein: 45, carbs: 52, fat: 28, fiber: 12 },
        ingredients: [
          {
            id: "chicken",
            name: "Grilled Chicken Breast",
            amount: "150g",
            calories: 280,
            macros: { protein: 35, carbs: 0, fat: 8, fiber: 0 },
          },
          {
            id: "quinoa",
            name: "Quinoa",
            amount: "80g dry",
            calories: 220,
            macros: { protein: 8, carbs: 40, fat: 4, fiber: 5 },
          },
          {
            id: "broccoli",
            name: "Steamed Broccoli",
            amount: "150g",
            calories: 55,
            macros: { protein: 6, carbs: 11, fat: 1, fiber: 5 },
          },
          {
            id: "avocado",
            name: "Avocado",
            amount: "1/2 medium",
            calories: 125,
            macros: { protein: 2, carbs: 6, fat: 12, fiber: 5 },
          },
        ],
      },
      {
        id: "dinner",
        name: "Dinner",
        time: "7:00 PM",
        calories: 620,
        macros: { protein: 42, carbs: 48, fat: 25, fiber: 10 },
        ingredients: [
          {
            id: "salmon",
            name: "Baked Salmon",
            amount: "140g",
            calories: 280,
            macros: { protein: 35, carbs: 0, fat: 15, fiber: 0 },
          },
          {
            id: "sweet-potato",
            name: "Sweet Potato",
            amount: "200g",
            calories: 180,
            macros: { protein: 4, carbs: 42, fat: 0, fiber: 6 },
          },
          {
            id: "spinach",
            name: "Sautéed Spinach",
            amount: "100g",
            calories: 35,
            macros: { protein: 3, carbs: 4, fat: 1, fiber: 2 },
          },
          {
            id: "olive-oil",
            name: "Olive Oil",
            amount: "10ml",
            calories: 90,
            macros: { protein: 0, carbs: 0, fat: 10, fiber: 0 },
          },
        ],
      },
      {
        id: "snacks",
        name: "Snacks",
        time: "Throughout day",
        calories: 330,
        macros: { protein: 25, carbs: 20, fat: 18, fiber: 8 },
        ingredients: [
          {
            id: "greek-yogurt",
            name: "Greek Yogurt",
            amount: "150g",
            calories: 130,
            macros: { protein: 15, carbs: 9, fat: 5, fiber: 0 },
          },
          {
            id: "berries",
            name: "Mixed Berries",
            amount: "100g",
            calories: 60,
            macros: { protein: 1, carbs: 14, fat: 0, fiber: 6 },
          },
          {
            id: "walnuts",
            name: "Walnuts",
            amount: "15g",
            calories: 100,
            macros: { protein: 2, carbs: 2, fat: 10, fiber: 1 },
          },
        ],
      },
    ],
  }

  return (
    <div className="h-screen bg-background overflow-y-auto">
      <div className="max-w-4xl mx-auto min-h-full">
        {/* Header - Mobile optimized */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10 p-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="text-xs px-2">
                <Sparkles className="w-3 h-3 mr-1" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" className="text-xs px-2">
                ❤️ Save
              </Button>
            </div>
          </div>
        </div>

        {/* Title - Mobile optimized */}
        <div className="text-center p-4 pb-2">
          <h1 className="text-xl font-bold mb-1">Your Diet Plan</h1>
          <p className="text-sm text-muted-foreground">
            {formData.age ? `${formData.age}y, ${formData.weight}kg, ${formData.height}m, ${formData.gender}` : 'Personalized nutrition plan'}
          </p>
        </div>

        {/* Daily Totals - Moved to top */}
        <div className="px-3 pb-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-base">Daily Totals</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-lg font-bold text-primary">{exampleDiet.totalCalories}</div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{exampleDiet.totalMacros.protein}g</div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{exampleDiet.totalMacros.carbs}g</div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{exampleDiet.totalMacros.fat}g</div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{exampleDiet.totalMacros.fiber}g</div>
                  <div className="text-xs text-muted-foreground">Fiber</div>
                </div>
                <div className="p-2 bg-background rounded-lg">
                  <div className="text-sm font-bold">{Math.round(exampleDiet.totalCalories * 0.25)}g</div>
                  <div className="text-xs text-muted-foreground">Sugar</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meals List - Mobile optimized */}
        <div className="space-y-3 px-3">
          {exampleDiet.meals.map((meal) => (
            <Card key={meal.id} className="cursor-pointer hover:shadow-md transition-shadow mx-0" onClick={() => openMealDetail(meal.id)}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-xl flex-shrink-0">
                      {getMealIcon(meal.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold truncate">{meal.name}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {/* Macronutrients - Mobile compact */}
                    <div className="text-right">
                      <div className="text-sm font-bold">{meal.calories} cal</div>
                      <div className="text-xs text-muted-foreground">
                        P:{meal.macros.protein} C:{meal.macros.carbs} F:{meal.macros.fat}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Meal Details */}
                {expandedMeals[meal.id] && (
                  <div className="mt-3 space-y-3">
                    {/* Macronutrients in separate cards */}
                    <div className="grid grid-cols-2 gap-2">
                      <Card className="p-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{meal.calories}</div>
                          <div className="text-xs text-muted-foreground">Calories</div>
                        </div>
                      </Card>
                      <Card className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold">{meal.macros.protein}g</div>
                          <div className="text-xs text-muted-foreground">Protein</div>
                        </div>
                      </Card>
                      <Card className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold">{meal.macros.carbs}g</div>
                          <div className="text-xs text-muted-foreground">Carbs</div>
                        </div>
                      </Card>
                      <Card className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold">{meal.macros.fat}g</div>
                          <div className="text-xs text-muted-foreground">Fat</div>
                        </div>
                      </Card>
                    </div>

                    {/* Ingredients */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Ingredients:</h4>
                      {meal.ingredients.map((ingredient) => (
                        <Card key={ingredient.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <div className="text-lg flex-shrink-0">{getIngredientIcon(ingredient.name)}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm truncate">{ingredient.name}</div>
                                  <div className="text-xs text-muted-foreground">{ingredient.calories} cal</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="text-right">
                                  <div className="font-medium text-sm">{ingredient.amount}</div>
                                  <div className="text-xs text-muted-foreground">
                                    P:{ingredient.macros.protein} C:{ingredient.macros.carbs} F:{ingredient.macros.fat}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

    </div>
  )
}
