import { MongoClient, ObjectId } from 'mongodb';

// Helper function to get the appropriate MongoDB URI based on environment
const getMongoURI = (): string => {
  // Use provided URI from environment variables
  const configuredURI = process.env.MONGODB_URI;
  
  if (configuredURI) {
    return configuredURI;
  }
  
  // Check if running in Docker (using Docker's special hostname)
  const isDocker = process.env.IS_DOCKER === 'true' || 
                  process.env.HOSTNAME?.includes('docker');
  
  // Provide default values if no URI is configured
  if (isDocker) {
    return 'mongodb://host.docker.internal:27017/3rvision';
  } else {
    return 'mongodb://localhost:27017/3rvision';
  }
};

const uri = getMongoURI();
const dbName = process.env.MONGODB_DB || '3rvision';

// Connection options with better defaults for reliability
const options = {
  // Add connection pooling
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 60000,
  // Add connection timeout
  connectTimeoutMS: 10000,
  // Add retry logic
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise: Promise<MongoClient>;

// Log connection info without exposing credentials
console.log(`Connecting to MongoDB${uri.includes('localhost') ? ' (localhost)' : 
  uri.includes('host.docker.internal') ? ' (Docker)' : ' (remote)'}`);

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function for connecting to the database
export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    return {
      client,
      db,
      ObjectId
    };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Unable to establish database connection');
  }
}

// Helper function to check if the database is connected
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const client = await clientPromise;
    await client.db(dbName).command({ ping: 1 });
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}