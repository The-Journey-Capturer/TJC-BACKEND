import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  // Get paginated articles with filters and advanced query parameters


async getArticles({ page = 1, limit = 10, sort = '-createdAt', category, tag, searchQuery }: any) {
  const query: any = {};

 
  if (category) {
    query.category = category;
  }


  if (tag) {
    query.tags = { $in: [tag] };  
  }

  
  if (searchQuery) {
    query.$text = { $search: searchQuery }; 
  }

  const articles = await this.articleModel
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort(sort)
    .exec();

  return articles;
}

  // Get single article by slug
  async getArticleBySlug(slug: string) {
    return this.articleModel.findOne({ slug }).exec();
  }

  // Create article
  async createArticle(createArticleDto: any) {
    const article = new this.articleModel(createArticleDto);
    return article.save();
  }

  // Update article
  async updateArticle(id: string, updateArticleDto: any) {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto, { new: true }).exec();
  }

  // Increment view count
  async incrementViewCount(id: string) {
    return this.articleModel.findByIdAndUpdate(id, { $inc: { 'stats.views': 1 } }).exec();
  }

  // Increment read count
  async incrementReadCount(id: string) {
    return this.articleModel.findByIdAndUpdate(id, { $inc: { 'stats.reads': 1 } }).exec();
  }

  // Delete article
  async deleteArticle(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
