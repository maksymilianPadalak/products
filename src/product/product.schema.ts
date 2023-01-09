import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductCategory } from '../enums/enums';

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

  @Prop(
    raw({
      category: { type: String, required: true, enum: ProductCategory },
      title: {
        type: String,
        required: true,
      },
      album: { type: String },
      genre: { type: String },
      price: { type: Number, required: true },
    }),
  )
  details: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
