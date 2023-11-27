// pages/api/update-profile.ts
import  executeQuery  from "./lib/db"; // import the helper function
import bcrypt from "bcryptjs"; // import bcrypt to hash the password

export default async function handler(req: { method: string; body: { name: any; email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  // Check if the request method is POST
  if (req.method === "POST") {
    // Get the form data from the request body
    const { name, email, password } = req.body;
    // Validate the form data
    if (!name || !email || !password) {
      // Return a 400 status code and an error message
      res.status(400).json({ message: "Name, email and password are required" });
      return;
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Perform the update operation on the profiles table using the executeQuery function
    const result: any = await executeQuery({
      query: "UPDATE profiles SET username = ?,email = ?, password = ?,confpwd = ?",
      values: [name, email, password], // use the email as the username and the name as the first and last name
    });
    // Check if the update was successful and return a response
    if (result.error) {
      // Return a 500 status code and an error message
      res.status(500).json({ message: "Something  wrong" });
    } else {
      // Return a 200 status code and a success message
      res.status(200).json({ message: "Profile updated successfully" });
    }
  } else {
    // Return a 405 status code and an error message
    res.status(405).json({ message: "Only POST requests are allowed" });
  }
}
