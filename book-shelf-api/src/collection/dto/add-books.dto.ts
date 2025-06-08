
import { IsUUID, IsArray } from 'class-validator';

export class AddBooksDto {
  @IsArray()
  @IsUUID('all', { each: true })
  libroIds: string[];
}
