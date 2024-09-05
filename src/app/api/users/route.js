import { MongoClient } from "mongodb";

// MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to persist the client connection
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

// Database and collection name
const dbName = "your-database-name";
const collectionName = "users";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const users = await collection.find({}).toArray();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const user = await request.json();
    const result = await collection.insertOne(user);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Error creating user", { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const { id, ...updateData } = await request.json();
    const result = await collection.updateOne(
      { _id: new MongoClient.ObjectId(id) },
      { $set: updateData }
    );
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Error updating user", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const { id } = await request.json();
    const result = await collection.deleteOne({
      _id: new MongoClient.ObjectId(id),
    });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Error deleting user", { status: 500 });
  }
}
