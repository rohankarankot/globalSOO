import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('/all')
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('price_from') price_from: number,
    @Query('price_to') price_to: number,
  ) {
    return this.productService.getAllProducts(
      page,
      limit,
      price_from,
      price_to,
    );
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productService.findProduct(id);
  }
}
