import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true, maxlength: 120 })
  title: string;

  @Prop({ required: true, unique: true, match: /^[a-z0-9-]+$/ })
  slug: string;

  @Prop({ maxlength: 200 })
  summary: string;

  @Prop({ required: true, minlength: 300 })
  content: string;

  @Prop({ required: true, minlength: 300 })
  author: string;

  @Prop({ required: true, enum: ['politics', 'business', 'tech', 'health', 'world', 'sports', 'entertainment'] })
  category: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: Object })
  featuredImage: { url: string; caption: string };

  @Prop({ enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop({ type: Object, default: { views: 0, reads: 0 } })
  stats: { views: number; reads: number };

  @Prop({ type: Object })
  seo: { 
    title: string; 
    description: string; 
  };
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

// Add text index after schema is created
ArticleSchema.index({ title: 'text', content: 'text', slug: 'text' });  // Text index for title, content, and slug
