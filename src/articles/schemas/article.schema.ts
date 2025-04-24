import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';  // Import mongoose
import { User } from '../../users/schemas/user.schema'; // Adjust path as necessary

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

  // Explicitly define the type for `featuredImage`
  @Prop({ type: Object })  // You can also use mongoose.Schema.Types.Mixed if you need flexibility
  featuredImage: { url: string, caption: string };

  @Prop({ enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  reads: number;

  // Explicitly define the type for `seo`
  @Prop({ type: Object })  // Explicitly defining as Object type
  seo: { title: string, description: string };
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
