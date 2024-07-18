// import { MongoClient, MongoClientOptions } from 'mongodb';


// const uri = process.env.MONGODB_URI as string;
// const options: MongoClientOptions = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };

// let clientPromise: Promise<MongoClient>;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Add Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     const client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   const client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;




// lib/db.ts
import mongoose, { ConnectOptions } from 'mongoose';



const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // const uri = process.env.MONGODB_URI as string;
    // const options: ConnectOptions = {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // };
    

    cached.promise = mongoose.connect(MONGODB_URI, options)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
