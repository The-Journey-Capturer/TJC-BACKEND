import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/schemas/article.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  // Get Most Viewed Articles
  async getMostViewed(limit: number = 5) {
    return this.articleModel
      .find()
      .sort({ 'stats.views': -1 })
      .limit(limit)
      .select('title slug stats.views featuredImage');
  }

  // Get Most Read Articles
  async getMostRead(limit: number = 5) {
    return this.articleModel
      .find()
      .sort({ 'stats.reads': -1 })
      .limit(limit)
      .select('title slug stats.reads featuredImage');
  }

  // Get Trending Articles (Combination of Views and Reads)
  async getTrending(limit: number = 3) {
    return this.articleModel
      .aggregate([
        {
          $project: {
            title: 1,
            slug: 1,
            stats: 1,
            featuredImage: 1,
            total: { $add: ['$stats.views', '$stats.reads'] }, // Combine views and reads
          },
        },
        { $sort: { total: -1 } },
        { $limit: limit },
      ])
      .exec();
  }
}
