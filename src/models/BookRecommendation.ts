import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBookRecommendation extends Document {
  title: string;
  author: string;
  isbn?: string;
  genre: string;
  description: string;
  coverUrl?: string;
  rating: number;
  user?: mongoose.Types.ObjectId;
  recommendedBy: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const BookRecommendationSchema = new Schema<IBookRecommendation>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    coverUrl: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recommendedBy: {
      type: String,
      required: [true, "Recommended by name is required"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

BookRecommendationSchema.index({ title: "text", author: "text", genre: "text" });

export const BookRecommendation: Model<IBookRecommendation> =
  mongoose.models.BookRecommendation ||
  mongoose.model<IBookRecommendation>(
    "BookRecommendation",
    BookRecommendationSchema,
  );
