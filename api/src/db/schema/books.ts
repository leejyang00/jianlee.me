import { pgTable, text, serial } from 'drizzle-orm/pg-core';

export const booksTable = pgTable('books_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
});
