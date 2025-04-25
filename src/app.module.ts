// app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Tjc-backend-Api'),
    ArticlesModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
