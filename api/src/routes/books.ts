import { Hono } from "hono";
import { db } from "../db";
import { booksTable } from "../db/schema/books";

export const booksRoute = new Hono()
  // .get('/', (c) => {
  //   return c.text('Hello Hono! - Books Route')
  // })
  .post('/add-book', async (c) => {

    console.log('add-book');

    const result = await db
      .insert(booksTable)
      .values({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald'
      })
      .returning() // retunrs the newly created row
      .then(res => res[0]);
    
    c.status(201);
    return c.json(result);
  })
  // .put('/:id', (c) => {
  //   return c.text('Hello Hono! - Books Route')
  // })
  // .delete('/:id', (c) => {
  //   return c.text('Hello Hono! - Books Route')
  // })
