import { IsUUID, IsArray } from 'class-validator';

export class ShareCollectionDto {
  @IsArray()
  @IsUUID('all', { each: true })
  userIds: string[];
}