import { PreferenceForm } from "@/components/preference-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Home } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">NeighborFit</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find neighborhoods that perfectly match your lifestyle preferences using real-world data and intelligent
            matching.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Personalized Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our algorithm considers your unique preferences to find the perfect neighborhood fit.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Real Data</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Based on actual neighborhood data including safety, walkability, and amenities.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Home className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Smart Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Get ranked results with detailed insights about each neighborhood.</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Find Your Perfect Neighborhood</CardTitle>
              <CardDescription className="text-center">
                Tell us what matters most to you, and we'll find neighborhoods that match your lifestyle.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreferenceForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
