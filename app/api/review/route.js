import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Replace the uri string with your connection string.
  const uri =
    "mongodb+srv://prarthanab1703:anahtrarP17@manage.ncqyr.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("reviews");

    const query = {};
    const review = await inventory.find(query).toArray();
    return NextResponse.json({ success: true, review });
  } finally {
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
    const inventory = database.collection("reviews");

    // Add createdAt timestamp to the review data
    const reviewData = {
      ...body,
      createdAt: new Date(), // current date and time
    };

    const review = await inventory.insertOne(reviewData);
    return NextResponse.json({ review, ok: true });
  } finally {
    await client.close();
  }
}
