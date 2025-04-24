import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async findAll(query: any): Promise<{ data: Article[]; meta: any }> {
    const { page = 1, limit = 10, sort = '-createdAt', ...filters } = query;

    const skip = (page - 1) * limit;
    const articles = await this.articleModel
      .find(filters)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .exec();

    const total = await this.articleModel.countDocuments(filters);

    return {
      data: articles,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string): Promise<Article | null> {
    return this.articleModel.findOne({ slug }).exec();
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  // Other methods like update, delete, etc.
}

