import { Schema, connection, Model, model } from 'mongoose';

export type AdType = {
  images: {
    url: string;
    default: boolean;
  }[];
  idUser: string;
  dateCreated: Date;
  title: string;
  category: string;
  price: number;
  priceNegotiable: boolean;
  description: string;
  views: number;
  status: string;
  state: string;
};

const schema = new Schema<AdType>({
  images: Array<{
    url: {
      type: String;
      required: true;
    };
    default: {
      type: Boolean;
      required: true;
    };
  }>,
  category: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceNegotiable: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Disponível',
  },
  title: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const modelName = 'Ads';

export default connection && connection.models[modelName]
  ? (connection.models[modelName] as Model<AdType>)
  : model<AdType>(modelName, schema);
