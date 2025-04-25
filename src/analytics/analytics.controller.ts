import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // Top Viewed Articles
  @Get('most-viewed')
  async getMostViewed(@Query('limit') limit: string) {
    const limitNumber = parseInt(limit) || 5;
    return this.analyticsService.getMostViewed(limitNumber);
  }

  // Top Read Articles
  @Get('most-read')
  async getMostRead(@Query('limit') limit: string) {
    const limitNumber = parseInt(limit) || 5;
    return this.analyticsService.getMostRead(limitNumber);
  }

  // Trending Articles
  @Get('trending')
  async getTrending(@Query('limit') limit: string) {
    const limitNumber = parseInt(limit) || 3;
    return this.analyticsService.getTrending(limitNumber);
  }
}
