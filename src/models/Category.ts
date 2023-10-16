import { Schema, connection, Model, model } from 'mongoose';

type CategoryType = {
  name: string;
};

const schema = new Schema<CategoryType>({
  name: {
    type: String,
    required: true,
  },
});

const modelName = 'Category';

export default connection && connection.models[modelName]
  ? (connection.models[modelName] as Model<CategoryType>)
  : model<CategoryType>(modelName, schema);
