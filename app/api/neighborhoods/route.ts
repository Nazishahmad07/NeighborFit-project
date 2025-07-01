import { NextResponse } from "next/server"
import { neighborhoods } from "@/lib/neighborhoods"

export async function GET() {
  return NextResponse.json(neighborhoods)
}
