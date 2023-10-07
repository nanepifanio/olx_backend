import { Schema, connection, Model, model } from 'mongoose';

type AdsType = {
  images: {
    url: string;
    default: boolean;
  }[];
  idUser: string;
  dateCreated: string;
  title: string;
  category: string;
  price: number;
  priceNegotiable: boolean;
  description: string;
  views: number;
  status: boolean;
  state: string;
};

const schema = new Schema<AdsType>({
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
    type: String,
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
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
  },
});

const modelName = 'Ads';

export default connection && connection.models[modelName]
  ? (connection.models[modelName] as Model<AdsType>)
  : model<AdsType>(modelName, schema);
