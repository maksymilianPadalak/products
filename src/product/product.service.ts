import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model, SortOrder } from 'mongoose';
import { ProductCategory } from '../enums/enums';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdCat = new this.productModel(product);
    return createdCat.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findByCategory(
    category: ProductCategory,
    sortOrder?: SortOrder,
  ): Promise<Product[]> {
    return this.productModel
      .find({ 'details.category': category })
      .sort({ 'details.price': sortOrder })
      .exec();
  }
}
