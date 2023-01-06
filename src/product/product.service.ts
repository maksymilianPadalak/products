import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private catModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdCat = new this.catModel(product);
    return createdCat.save();
  }

  async findAll(): Promise<Product[]> {
    return this.catModel.find().exec();
  }
}
