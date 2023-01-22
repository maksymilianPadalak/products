import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model, ObjectId, SortOrder } from 'mongoose';
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

  async deleteProduct(id: ObjectId): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async updateProduct(
    id: ObjectId,
    updatedProduct: Partial<Product>,
  ): Promise<Product> {
    return await this.productModel
      .findOneAndUpdate({ id }, { $set: updatedProduct })
      .exec();
  }

  async addReview(
    id: ObjectId,
    review: { rating: number; review: string },
  ): Promise<Product> {
    return await this.productModel
      .findOneAndUpdate({ id }, { $push: { reviews: review } })
      .exec();
  }

  async deleteReview(id: ObjectId): Promise<Product> {
    return await this.productModel
      .findOneAndUpdate({ id }, { $pull: { reviews: { _id: id } } })
      .exec();
  }
}
