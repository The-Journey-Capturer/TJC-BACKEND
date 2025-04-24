import { IsOptional, IsString, IsInt } from 'class-validator';

export class FilterArticleDto {
  @IsString()
  @IsOptional()  // Optional kyunki filter sab fields pe nahi hona
  category?: string;

  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  limit?: number;
}
