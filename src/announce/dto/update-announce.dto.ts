import { PartialType } from '@nestjs/swagger';
import { CreateAnnounceDto } from './create-announce.dto';

export class UpdateAnnounceDto extends PartialType(CreateAnnounceDto) {}
