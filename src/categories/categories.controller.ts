import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Get all categories
  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  // Get articles by category slug
  @Get(':slug/articles')
  async getArticlesByCategory(@Param('slug') slug: string) {
    return this.categoriesService.getArticlesByCategory(slug);
  }
}
