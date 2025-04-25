// articles/dto/create-article.dto.ts

import { IsString, IsNotEmpty, IsArray, IsEnum, IsOptional, IsMongoId } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  @IsNotEmpty()
  author: string;

  @IsEnum(['politics', 'business', 'tech', 'health', 'world', 'sports', 'entertainment'])
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsOptional()
  featuredImage: {
    url: string;
    caption: string;
  };

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status: string;

  @IsOptional()
  seo: {
    title: string;
    description: string;
  };
}
