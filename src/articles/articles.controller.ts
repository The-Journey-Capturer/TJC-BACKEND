import { Controller, Get, Post, Patch, Param, Body, Query, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FilterArticleDto } from './dto/filter-article.dto';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Get paginated articles with filters and advanced query parameters
  @Get()
  async getArticles(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = '-createdAt',
    @Query('category') category: string,
    @Query('tag') tag: string,
    @Query('q') searchQuery: string,
  ) {
    const filters = { category, tag, searchQuery };
    return this.articlesService.getArticles({
      page: Number(page),
      limit: Number(limit),
      sort,
      ...filters,
    });
  }

  // Get single article by slug
  @Get(':slug')
  async getArticle(@Param('slug') slug: string) {
    return this.articlesService.getArticleBySlug(slug);
  }

  // Create article
  @Post()
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createArticle(createArticleDto);
  }

  // Update article
  @Patch(':id')
  async updateArticle(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.updateArticle(id, updateArticleDto);
  }

  // Increment view count
  @Patch(':id/view')
  async incrementViewCount(@Param('id') id: string) {
    return this.articlesService.incrementViewCount(id);
  }

  // Increment read count
  @Patch(':id/read')
  async incrementReadCount(@Param('id') id: string) {
    return this.articlesService.incrementReadCount(id);
  }

  // Delete article
  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return this.articlesService.deleteArticle(id);
  }
}
