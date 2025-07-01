"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Loader2 } from "lucide-react"

interface Preferences {
  safety: number
  affordability: number
  walkability: number
  schoolQuality: number
  parksTransport: number
}

export function PreferenceForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [preferences, setPreferences] = useState<Preferences>({
    safety: 5,
    affordability: 5,
    walkability: 5,
    schoolQuality: 5,
    parksTransport: 5,
  })

  const handleSliderChange = (key: keyof Preferences, value: number[]) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value[0],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      })

      if (response.ok) {
        const results = await response.json()
        // Store results in sessionStorage to pass to results page
        sessionStorage.setItem("neighborhoodResults", JSON.stringify(results))
        sessionStorage.setItem("userPreferences", JSON.stringify(preferences))
        router.push("/results")
      }
    } catch (error) {
      console.error("Error matching neighborhoods:", error)
    } finally {
      setLoading(false)
    }
  }

  const preferenceItems = [
    {
      key: "safety" as keyof Preferences,
      label: "Safety",
      description: "How important is neighborhood safety to you?",
      icon: "🛡️",
    },
    {
      key: "affordability" as keyof Preferences,
      label: "Affordability",
      description: "How important is cost of living?",
      icon: "💰",
    },
    {
      key: "walkability" as keyof Preferences,
      label: "Walkability",
      description: "How important is being able to walk to amenities?",
      icon: "🚶",
    },
    {
      key: "schoolQuality" as keyof Preferences,
      label: "School Quality",
      description: "How important are good schools?",
      icon: "🎓",
    },
    {
      key: "parksTransport" as keyof Preferences,
      label: "Parks & Transport",
      description: "How important are parks and public transportation?",
      icon: "🌳",
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6">
        {preferenceItems.map((item) => (
          <Card key={item.key} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
                <Slider
                  value={[preferences[item.key]]}
                  onValueChange={(value) => handleSliderChange(item.key, value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <Label className="text-lg font-semibold text-blue-600">{preferences[item.key]}/10</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Finding Your Perfect Neighborhoods...
          </>
        ) : (
          "Find My Neighborhoods"
        )}
      </Button>
    </form>
  )
}
