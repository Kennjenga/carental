// db.ts
import mysql from "serverless-mysql";

// Load the environment variables
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

// Create a connection pool
const db = mysql({
  config: {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  },
});

// Define a helper function to execute queries
export default async function executeQuery({ query, values }) {
  try {
    // Connect to the database
    await db.connect();
    // Execute the query and get the results
    const results = await db.query(query, values);
    // Close the connection
    await db.end();
    // Return the results
    return results;
  } catch (error) {
    // Return the error
    return { error };
  }
}
