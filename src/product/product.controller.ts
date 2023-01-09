import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { ProductCategory } from '../enums/enums';
import { SortOrder } from 'mongoose';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':category/:order?')
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
}
