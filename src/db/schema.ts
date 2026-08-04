import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const recommendationStatus = pgEnum("recommendation_status", [
  "draft",
  "published",
]);

export const bookRecommendations = pgTable(
  "book_recommendations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 180 }).notNull(),
    isbn: varchar("isbn", { length: 20 }),
    genre: varchar("genre", { length: 80 }).notNull(),
    description: text("description").notNull(),
    coverUrl: text("cover_url"),
    rating: integer("rating").notNull(),
    recommendedBy: varchar("recommended_by", { length: 120 }).notNull(),
    status: recommendationStatus("status").default("draft").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("book_recommendations_isbn_unique").on(table.isbn),
    index("book_recommendations_title_idx").on(table.title),
    index("book_recommendations_genre_idx").on(table.genre),
    index("book_recommendations_created_at_idx").on(table.createdAt),
    check(
      "book_recommendations_rating_check",
      sql`${table.rating} between 1 and 5`,
    ),
  ],
);

export type BookRecommendation = typeof bookRecommendations.$inferSelect;
export type NewBookRecommendation = typeof bookRecommendations.$inferInsert;
