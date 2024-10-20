import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Replace the uri string with your connection string.
  const uri =
    "mongodb+srv://prarthanab1703:anahtrarP17@manage.ncqyr.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const products = await inventory.find(query).toArray();
    // const movie = await movies.find(query).toArray(); //to print all queries or findOne(query) //to find only one data entry
    return NextResponse.json({ success: true, products });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function POST(request) {
  let body = await request.json();
  const uri =
    "mongodb+srv://prarthanab1703:anahtrarP17@manage.ncqyr.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const product = await inventory.insertOne(body);
    return NextResponse.json({ product, ok: true });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
