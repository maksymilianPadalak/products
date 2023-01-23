import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
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
    type: mongoose.Schema.Types.Mixed,
  })
  details: any;

  @Prop({
    type: [
      {
        rating: { type: Number, required: true },
        review: { type: String, required: true },
      },
    ],
  })
  reviews: { rating: number; review: string }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
