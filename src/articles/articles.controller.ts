import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';


@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  
  @Get()
  async findAll(@Query() query): Promise<{ data: Article[]; meta: any }> {
    return this.articlesService.findAll(query);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Article | null> {
    return this.articlesService.findBySlug(slug);
  }

  @Post()
  async create(@Body() createArticleDto: any): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  // Additional endpoints for update, delete, etc.
}
