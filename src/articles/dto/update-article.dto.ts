// articles/dto/update-article.dto.ts

import { IsString, IsOptional, IsArray, IsEnum, IsMongoId } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsMongoId()
  @IsOptional()
  author?: string;

  @IsEnum(['politics', 'business', 'tech', 'health', 'world', 'sports', 'entertainment'])
  @IsOptional()
  category?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsOptional()
  featuredImage?: {
    url: string;
    caption: string;
  };

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: string;

  @IsOptional()
  seo?: {
    title: string;
    description: string;
  };
}
