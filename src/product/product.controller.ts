import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { ProductCategory } from '../enums/enums';
import { ObjectId, SortOrder } from 'mongoose';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('by-category/:category/:order?')
  productsByCategory(
    @Param('category') category: ProductCategory,
    @Param('order') order?: SortOrder,
  ): Promise<Product[]> {
    return this.productService.findByCategory(category, order);
  }

  @Post()
  async createProduct(@Res() response, @Body() product: Product) {
    const newProduct = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newProduct,
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: ObjectId) {
    await this.productService.deleteProduct(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: ObjectId, @Body() product: Product) {
    await this.productService.updateProduct(id, product);
  }

  @Patch('reviews/:id')
  async addReview(
    @Param('id') id: ObjectId,
    @Body() review: { rating: number; review: string },
  ) {
    await this.productService.addReview(id, review);
  }

  @Delete('reviews/:id')
  async deleteReview(@Param('id') id: ObjectId) {
    await this.productService.deleteReview(id);
  }

  @Get('reviews/:id')
  reviews(@Param('id') id: ObjectId) {
    console.log(id);
    return this.productService.findAllReviews(id);
  }
}
