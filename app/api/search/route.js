import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  console.log("Query:", query); // Log the query parameter

  // Replace the uri string with your connection string.
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect(); // Ensure to connect to the database
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const products = await inventory
      .aggregate([
        {
          $match: {
            $or: [{ slug: { $regex: query, $options: "i" } }],
          },
        },
      ])
      .toArray();

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close(); // Ensure the client closes
  }
}
