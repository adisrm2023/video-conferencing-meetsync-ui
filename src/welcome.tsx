"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, MessageSquare, Users, Settings } from "lucide-react"

export default function WelcomePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const steps = [
    {
      title: "Welcome to MeetSync",
      description: "Your new video conferencing platform for seamless collaboration.",
      icon: Video,
    },
    {
      title: "Connect with Anyone",
      description: "Start or join meetings with just a click. Share your meeting link with anyone.",
      icon: Users,
    },
    {
      title: "Chat in Real-time",
      description: "Send messages, share files, and react with emojis during your meetings.",
      icon: MessageSquare,
    },
    {
      title: "Customize Your Experience",
      description: "Adjust your audio, video, and appearance settings to your preference.",
      icon: Settings,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                MS
              </div>
              MeetSync
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-primary" })}
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <Button onClick={handleNext}>{currentStep < steps.length - 1 ? "Next" : "Get Started"}</Button>
            {currentStep < steps.length - 1 && (
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

