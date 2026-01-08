import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCursorDTO {
  @ApiProperty({ description: '워크스페이스 ID', example: 'w1' })
  @IsString()
  workspaceId: string;

  @ApiProperty({ description: '유저 ID', example: 'u1' })
  @IsString()
  userId: string;

  @ApiPropertyOptional({ description: '커서 X 좌표', example: 120 })
  @IsNumber()
  @IsOptional()
  x?: number;

  @ApiPropertyOptional({ description: '커서 Y 좌표', example: 240 })
  @IsNumber()
  @IsOptional()
  y?: number;
}
