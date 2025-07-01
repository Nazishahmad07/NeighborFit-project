// Mock neighborhood data
export interface Neighborhood {
  id: string
  name: string
  city: string
  state: string
  safety: number
  affordability: number
  walkability: number
  schoolQuality: number
  parksTransport: number
  description: string
  highlights: string[]
}

export const neighborhoods: Neighborhood[] = [
  {
    id: "1",
    name: "Greenwich Village",
    city: "New York",
    state: "NY",
    safety: 8,
    affordability: 3,
    walkability: 10,
    schoolQuality: 7,
    parksTransport: 9,
    description:
      "A historic and vibrant neighborhood known for its bohemian culture, tree-lined streets, and excellent walkability. Home to NYU and Washington Square Park.",
    highlights: [
      "Historic brownstones and charming architecture",
      "Excellent restaurants and nightlife",
      "Washington Square Park nearby",
      "Great public transportation access",
      "Walkable to most amenities",
    ],
  },
  {
    id: "2",
    name: "Park Slope",
    city: "Brooklyn",
    state: "NY",
    safety: 9,
    affordability: 4,
    walkability: 8,
    schoolQuality: 9,
    parksTransport: 8,
    description:
      "A family-friendly neighborhood with excellent schools, beautiful Victorian architecture, and easy access to Prospect Park.",
    highlights: [
      "Top-rated public schools",
      "Prospect Park at your doorstep",
      "Family-friendly community",
      "Victorian architecture",
      "Great local farmers market",
    ],
  },
  {
    id: "3",
    name: "Capitol Hill",
    city: "Seattle",
    state: "WA",
    safety: 7,
    affordability: 5,
    walkability: 9,
    schoolQuality: 6,
    parksTransport: 8,
    description:
      "Seattle's most densely populated neighborhood, known for its vibrant arts scene, diverse dining, and LGBTQ+ friendly community.",
    highlights: [
      "Vibrant arts and music scene",
      "Diverse dining options",
      "Cal Anderson Park",
      "Great public transit connections",
      "Active nightlife",
    ],
  },
  {
    id: "4",
    name: "Plano",
    city: "Dallas",
    state: "TX",
    safety: 9,
    affordability: 7,
    walkability: 4,
    schoolQuality: 10,
    parksTransport: 6,
    description:
      "A suburban community known for having some of the best schools in Texas, family-friendly amenities, and affordable housing.",
    highlights: [
      "Excellent public school system",
      "Family-friendly community",
      "Affordable housing options",
      "Multiple parks and recreation centers",
      "Low crime rates",
    ],
  },
  {
    id: "5",
    name: "Mission District",
    city: "San Francisco",
    state: "CA",
    safety: 6,
    affordability: 4,
    walkability: 8,
    schoolQuality: 5,
    parksTransport: 7,
    description:
      "A culturally rich neighborhood known for its Latino heritage, street art, and diverse food scene. More affordable than other SF areas.",
    highlights: [
      "Rich Latino culture and heritage",
      "Amazing street art and murals",
      "Diverse food scene",
      "Dolores Park nearby",
      "Good public transportation",
    ],
  },
  {
    id: "6",
    name: "Irvine",
    city: "Orange County",
    state: "CA",
    safety: 10,
    affordability: 5,
    walkability: 6,
    schoolQuality: 10,
    parksTransport: 7,
    description:
      "A master-planned city known for its safety, excellent schools, and family-friendly environment. Popular with young professionals and families.",
    highlights: [
      "One of the safest cities in America",
      "Top-rated schools and UC Irvine",
      "Well-planned community layout",
      "Multiple parks and green spaces",
      "Strong job market",
    ],
  },
  {
    id: "7",
    name: "Midtown",
    city: "Atlanta",
    state: "GA",
    safety: 7,
    affordability: 6,
    walkability: 8,
    schoolQuality: 6,
    parksTransport: 8,
    description:
      "Atlanta's cultural heart with museums, parks, and a thriving arts scene. Great for young professionals and those who love city life.",
    highlights: [
      "Piedmont Park in the heart of the area",
      "Rich arts and culture scene",
      "MARTA accessibility",
      "Historic Fox Theatre",
      "Active nightlife and dining",
    ],
  },
  {
    id: "8",
    name: "Shadyside",
    city: "Pittsburgh",
    state: "PA",
    safety: 8,
    affordability: 7,
    walkability: 9,
    schoolQuality: 7,
    parksTransport: 7,
    description:
      "An upscale neighborhood known for its walkability, boutique shopping, and tree-lined streets. Great for professionals and students.",
    highlights: [
      "Walkable to shops and restaurants",
      "Tree-lined residential streets",
      "Close to universities",
      "Good public transportation",
      "Active community events",
    ],
  },
]

export interface UserPreferences {
  safety: number
  affordability: number
  walkability: number
  schoolQuality: number
  parksTransport: number
}

export function calculateNeighborhoodScore(neighborhood: Neighborhood, preferences: UserPreferences): number {
  // Normalize preferences to weights (0-1 scale)
  const totalPreference =
    preferences.safety +
    preferences.affordability +
    preferences.walkability +
    preferences.schoolQuality +
    preferences.parksTransport

  const weights = {
    safety: preferences.safety / totalPreference,
    affordability: preferences.affordability / totalPreference,
    walkability: preferences.walkability / totalPreference,
    schoolQuality: preferences.schoolQuality / totalPreference,
    parksTransport: preferences.parksTransport / totalPreference,
  }

  // Calculate weighted score
  const score =
    neighborhood.safety * weights.safety +
    neighborhood.affordability * weights.affordability +
    neighborhood.walkability * weights.walkability +
    neighborhood.schoolQuality * weights.schoolQuality +
    neighborhood.parksTransport * weights.parksTransport

  return Math.round(score * 10) / 10 // Round to 1 decimal place
}

export function matchNeighborhoods(preferences: UserPreferences) {
  const scoredNeighborhoods = neighborhoods.map((neighborhood) => ({
    ...neighborhood,
    totalScore: calculateNeighborhoodScore(neighborhood, preferences),
  }))

  // Sort by total score (highest first)
  return scoredNeighborhoods.sort((a, b) => b.totalScore - a.totalScore)
}
