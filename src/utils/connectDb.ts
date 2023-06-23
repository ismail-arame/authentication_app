import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("Please add the database url in .env file");
}

const DATABASE_URL: string = process.env.DATABASE_URL;

// extending the global object *global* to include a property mongoose
//mongoose property now is accessible on the global object without TypeScript throwing errors related to its type
let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

//optimize the MongoDB connection process by caching the connection and reusing it when possible, thus reducing redundant connection attempts.
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    console.log("connection already established...");
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose
      .connect(DATABASE_URL, options)
      .then((mongoose) => {
        console.log("Connection has been established...");
        return mongoose;
      })
      .catch((error) => {
        console.log("error connecting to mongodb");
        console.log(error as Error);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDb;
