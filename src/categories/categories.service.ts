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

  
  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  
  async getArticlesByCategory(slug: string): Promise<Article[]> {
    return this.articleModel.find({ category: slug }).exec();
  }
}

