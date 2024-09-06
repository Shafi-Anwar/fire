import clientPromise from "../../../../lib/mongodb"
import { ObjectId } from "mongodb";

// Handle GET request to fetch all users
export async function GET() {
  const client = await clientPromise;
  const db = client.db("admin");
  const users = await db.collection("users").find({}).toArray();
  return new Response(JSON.stringify(users), { status: 200 });
}

// Handle POST request to create a new user
export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const data = await request.json();
  const result = await db.collection("users").insertOne(data);
  return new Response(JSON.stringify(result), { status: 201 });
}

// Handle PUT request to update a user
export async function PUT(request) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const data = await request.json();
  const { id, ...update } = data;
  const result = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: update });
  return new Response(JSON.stringify(result), { status: 200 });
}

// Handle DELETE request to remove a user
export async function DELETE(request) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const { id } = await request.json();
  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify(result), { status: 200 });
}
