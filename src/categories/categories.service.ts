import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Article, ArticleDocument } from 'src/articles/schemas/article.schema';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument> // Inject Article model for fetching articles by category
  ) {}

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  // Get articles by category slug
  async getArticlesByCategory(slug: string): Promise<Article[]> {
    // Fetch articles belonging to the category (assuming 'category' field in Article Schema)
    return this.articleModel.find({ category: slug }).exec();
  }
}

