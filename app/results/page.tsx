"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MapPin, Star, DollarSign, Shield, Footprints, GraduationCap, Trees } from "lucide-react"

interface Neighborhood {
  id: string
  name: string
  city: string
  state: string
  safety: number
  affordability: number
  walkability: number
  schoolQuality: number
  parksTransport: number
  totalScore: number
  description: string
  highlights: string[]
}

interface Preferences {
  safety: number
  affordability: number
  walkability: number
  schoolQuality: number
  parksTransport: number
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<Neighborhood[]>([])
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResults = sessionStorage.getItem("neighborhoodResults")
    const storedPreferences = sessionStorage.getItem("userPreferences")

    if (storedResults && storedPreferences) {
      setResults(JSON.parse(storedResults))
      setPreferences(JSON.parse(storedPreferences))
    } else {
      router.push("/")
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excellent"
    if (score >= 6) return "Good"
    return "Fair"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.push("/")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Neighborhood Matches</h1>
            <p className="text-gray-600">Found {results.length} neighborhoods that match your preferences</p>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6">
          {results.map((neighborhood, index) => (
            <Card key={neighborhood.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        #{index + 1} Match
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold">{neighborhood.totalScore.toFixed(1)}/10</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{neighborhood.name}</CardTitle>
                    <CardDescription className="text-blue-100 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {neighborhood.city}, {neighborhood.state}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-lg mb-2">About This Neighborhood</h3>
                    <p className="text-gray-600 mb-4">{neighborhood.description}</p>

                    <h4 className="font-semibold mb-2">Highlights</h4>
                    <ul className="space-y-1">
                      {neighborhood.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Scores */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Detailed Scores</h3>
                    <div className="space-y-4">
                      {[
                        { key: "safety", label: "Safety", icon: Shield, score: neighborhood.safety },
                        {
                          key: "affordability",
                          label: "Affordability",
                          icon: DollarSign,
                          score: neighborhood.affordability,
                        },
                        { key: "walkability", label: "Walkability", icon: Footprints, score: neighborhood.walkability },
                        {
                          key: "schoolQuality",
                          label: "School Quality",
                          icon: GraduationCap,
                          score: neighborhood.schoolQuality,
                        },
                        {
                          key: "parksTransport",
                          label: "Parks & Transport",
                          icon: Trees,
                          score: neighborhood.parksTransport,
                        },
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div key={item.key} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">{item.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
                                  {getScoreLabel(item.score)}
                                </span>
                                <span className="text-sm text-gray-500">{item.score}/10</span>
                              </div>
                            </div>
                            <Progress value={item.score * 10} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Try Again */}
        <div className="text-center mt-12">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Want to try different preferences?</h3>
              <p className="text-gray-600 text-sm mb-4">Adjust your priorities to discover new neighborhood matches.</p>
              <Button onClick={() => router.push("/")} className="w-full">
                Start New Search
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
