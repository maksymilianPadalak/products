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

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':category')
  productsByCategory(
    @Param('category') category: ProductCategory,
  ): Promise<Product[]> {
    return this.productService.findByCategory(category);
  }

  @Post()
  async createProduct(@Res() response, @Body() product: Product) {
    const newProduct = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newProduct,
    });
  }
}
