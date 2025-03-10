// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

// const connectionString = process.env.DATABASE_URL || "empty";
// console.log('connectionString-env', connectionString);

// // Disable prefetch as it is not supported for "Transaction" pool mode
// const client = postgres(connectionString, { prepare: false })
// const db = drizzle(client);

// export default db;

// // const allUsers = await db.select().from(users);
      

// import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

// interface Env {
//   SUPABASE_URL: string;
//   SUPABASE_KEY: string;
// }

// export default {
//   async fetch(request: Request, env: Env) {
//     console.log('env-URL', env.SUPABASE_URL);
//     const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
//     const { data, error } = await supabase.from("countries").select('*');

//   }
// }
    // if (error) throw error;
//     return new Response(JSON.stringify(data), {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   },
// };
