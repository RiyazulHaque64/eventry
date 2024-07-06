import { IUser } from "@/interfaces/user-interface";
import { Schema, model, models } from "mongoose";

const schema = new Schema<IUser>({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  bio: {
    required: true,
    type: String,
  },
});

const usersModel = models.users ?? model<IUser>("users", schema);

export default usersModel;
