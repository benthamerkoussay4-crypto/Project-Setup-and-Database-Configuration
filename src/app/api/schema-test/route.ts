import { connectToDatabase } from "@/lib/mongodb";
import { BookRecommendation } from "@/models/BookRecommendation";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const bookCount = await BookRecommendation.countDocuments();
    const userCount = await User.countDocuments();

    if (bookCount === 0) {
      await BookRecommendation.create({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        genre: "Classic Fiction",
        description:
          "A tragic story of ambition, love, and the American Dream set in the Roaring Twenties.",
        coverUrl:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        rating: 5,
        recommendedBy: "BookNest Admin",
        status: "published",
      });
    }

    const sampleBooks = await BookRecommendation.find().limit(5);

    return NextResponse.json({
      status: "success",
      message: "MongoDB (Mongoose) connection and user auth schema verification successful.",
      database: "MongoDB",
      orm: "Mongoose",
      totalUsersInDb: userCount,
      totalRecommendations: sampleBooks.length,
      sampleRecords: sampleBooks,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Failed to query MongoDB schema",
      },
      { status: 500 },
    );
  }
}
