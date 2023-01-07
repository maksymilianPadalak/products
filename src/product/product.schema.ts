import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop(
    raw({
      title: { type: String, required: true },
      album: { type: String, required: true },
      genre: { type: String },
    }),
  )
  details: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
