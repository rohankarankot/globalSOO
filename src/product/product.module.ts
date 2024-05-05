import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import SanityService from 'src/common/sanity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, SanityService],
})
export class ProductModule {}
