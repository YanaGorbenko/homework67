import { connect } from 'mongoose';

export const connectDb = async () => {
  const DB_URL = process.env.MONGODB_URI;
  try {
    await connect(DB_URL);
    console.log('Connected to DB successfully!');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
