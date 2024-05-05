import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import SanityService from 'src/common/sanity';
import { getAllProducts, getProductInfo } from 'src/lib/sanityQueries/product';
import { createFilterfromProduct } from './helpers/allProductFilters';

@Injectable()
export class ProductService {
  constructor(private readonly sanityService: SanityService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }
  async getAllProducts(page, limit, price_from?: number, price_to?: number) {
    try {
      const query = getAllProducts(price_from, price_to);
      const data = await this.sanityService.client.fetch(query);
      const totalItems = data?.totalCount || 10;

      // Calculate pagination metadata
      const perPage = limit;
      const totalPages = Math.ceil(totalItems / perPage);
      // Calculate the starting index and ending index for the current page
      const startIndex = (page - 1) * perPage;
      const endIndex = Math.min(startIndex + perPage, totalItems);

      // Extract the subset of data for the current page
      const pageData = data.products.slice(startIndex, endIndex);
      const filters = createFilterfromProduct(data?.products);
      return {
        data: pageData,
        totalCount: data.totalCount,
        filters,
        pagination: {
          perPage,
          currentPage: page,
          totalPages,
        },
      };
    } catch (error) {
      console.log(error.msg);
      return error;
    }
  }

  async findProduct(id: string) {
    const product = await this.sanityService.client.fetch(getProductInfo(id));
    if (!product?.[0]) {
      throw new NotFoundException('Product not found');
    }
    return product[0];
  }
}
