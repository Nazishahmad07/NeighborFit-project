import { type NextRequest, NextResponse } from "next/server"
import { matchNeighborhoods, type UserPreferences } from "@/lib/neighborhoods"

export async function POST(request: NextRequest) {
  try {
    const preferences: UserPreferences = await request.json()

    // Validate preferences
    const requiredFields = ["safety", "affordability", "walkability", "schoolQuality", "parksTransport"]
    for (const field of requiredFields) {
      if (!(field in preferences) || typeof preferences[field as keyof UserPreferences] !== "number") {
        return NextResponse.json({ error: `Invalid or missing field: ${field}` }, { status: 400 })
      }
    }

    const matchedNeighborhoods = matchNeighborhoods(preferences)

    return NextResponse.json(matchedNeighborhoods)
  } catch (error) {
    console.error("Error matching neighborhoods:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
