import { IsOptional, IsString, IsInt } from 'class-validator';

export class FilterArticleDto {
  @IsString()
  @IsOptional()  // Optional kyunki filter sab fields pe nahi hona
  category?: string;

  @IsInt()
  @IsOptional()
  page?: number;  // Pagination ka page number

  @IsInt()
  @IsOptional()
  limit?: number;  // Pagination mein kitni items per page chahiye
}
