
import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
