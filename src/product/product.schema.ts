import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductType } from '../enums/enums';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    required: true,
    unique: true,
    sparse: true,
    index: true,
  })
  name: string;

  @Prop({
    type: { type: String, required: true, enum: ProductType },
    title: {
      type: String,
      required: true,
    },
    album: { type: String, required: true },
    genre: { type: String },
  })
  details: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
