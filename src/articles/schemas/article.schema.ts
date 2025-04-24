import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  summary: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ required: true, enum: ['politics', 'business', 'tech', 'health', 'world', 'sports', 'entertainment'] })
  category: string;

  @Prop([String])
  tags: string[];

  
  @Prop({ type: Object })
  featuredImage: { url: string, caption: string };

  @Prop({ enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  reads: number;


  @Prop({ type: Object })
  seo: { title: string, description: string };
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
