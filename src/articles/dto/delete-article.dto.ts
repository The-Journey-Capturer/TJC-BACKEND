import { IsString } from 'class-validator';

export class DeleteArticleDto {
  @IsString()
  slug: string;  // Article ko slug ke through delete karna
}
