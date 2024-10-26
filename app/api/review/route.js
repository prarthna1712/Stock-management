import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const uri =
      "mongodb+srv://prarthanab1703:anahtrarP17@manage.ncqyr.mongodb.net/";
    const client = new MongoClient(uri);
    const db = client.db("stock"); // replace "myDatabase" with your database name
    const reviewsCollection = db.collection("reviews");

    const { review } = await req.json(); // extract review from the request body
    if (!review) {
      return new Response("Review is required", { status: 400 });
    }

    const result = await reviewsCollection.insertOne({
      review,
      createdAt: new Date(),
    });
    return new Response(
      JSON.stringify({ message: "Review saved", success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Failed to save review", { status: 500 });
  }
}
