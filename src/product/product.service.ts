import { Injectable, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import SanityService from 'src/common/sanity';
import { getAllProducts } from 'src/lib/sanityQueries/product';
import { createFilterfromProduct } from './helpers/allProductFilters';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }
  async getAllProducts(page, limit) {
    const sanityService = new SanityService();
    try {
      const data = await sanityService.client.fetch(getAllProducts);
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
