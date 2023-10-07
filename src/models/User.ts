import { Schema, connection, Model, model } from 'mongoose';

type UserType = {
  name: string;
  email: string;
  passwordHash: string;
  token: string;
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
  token: {
    type: String,
    required: true,
  },
});

const modelName = 'User';

export default connection && connection.models[modelName]
  ? (connection.models[modelName] as Model<UserType>)
  : model<UserType>(modelName, schema);
