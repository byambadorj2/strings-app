import { Client } from "pg";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

export async function loadFakeData(numUsers: number = 10) {
  console.log(`Executing load fake data. Generating ${numUsers} users`);

  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASS,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
  });

  await client.connect();

  try {
    await client.query("BEGIN");
    for (let i = 0; i < numUsers; i++) {
      const saltRounds = 10;
      const a = await hash.bcrypt();
      const insertQuery =
        "INSERT INTO public.users(username, password, avatar) VALUES ($1, $2, $3)";
      const values = [
        faker.internet.userName(),
        faker.internet.password(),
        faker.image.avatar(),
      ];
      await client.query(insertQuery, values);
    }

    const res = await client.query(
      "select id from public.users order by created_at desc limit $1",
      [numUsers]
    );
    console.log(res.rows);

    for (const row of res.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
        await client.query(
          "insert into public.posts (user_id, content) values ($1, $2)",
          [row.id, faker.lorem.sentence()]
        );
      }
    }

    for (const row1 of res.rows) {
      for (const row2 of res.rows) {
        if (row1.id != row2.id && Math.random() > 0.5) {
          await client.query(
            "insert into public.follows (user_id, follower_id) values ($1, $2)",
            [row1.id, row2.id]
          );
        }
      }
    }

    await client.query("COMMIT");
  } catch (error) {
    console.error("Error during transaction, rolling back!", error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}
