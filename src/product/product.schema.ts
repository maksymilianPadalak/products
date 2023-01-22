import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductCategory } from '../enums/enums';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    required: true,
    unique: true,
    sparse: true,
    index: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: String,
    required: true,
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Prop({
    type: [
      {
        rating: { type: Number, required: true },
        review: { type: String, required: true },
      },
    ],
  })
  reviews: { rating: number; review: string }[];

  @Prop(
    raw({
      albumDetails: {},
      title: { type: String },
      album: { type: String },
      genre: { type: String },
    }),
  )
  details: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
