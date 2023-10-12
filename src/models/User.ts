import { Schema, connection, Model, model } from 'mongoose';

export type UserType = {
  name: string;
  email: string;
  passwordHash: string;
  state: string;
};

const schema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const modelName = 'User';

export default connection && connection.models[modelName]
  ? (connection.models[modelName] as Model<UserType>)
  : model<UserType>(modelName, schema);
