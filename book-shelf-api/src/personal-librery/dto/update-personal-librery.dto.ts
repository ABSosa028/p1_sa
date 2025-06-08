import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalLibreryDto } from './create-personal-librery.dto';

export class UpdatePersonalLibreryDto extends PartialType(CreatePersonalLibreryDto) {}
