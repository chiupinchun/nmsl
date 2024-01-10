import { PartialType } from '@nestjs/swagger';
import { CreatecalendarDto } from './create-calendar.dto';

export class UpdatecalendarDto extends PartialType(CreatecalendarDto) { }
