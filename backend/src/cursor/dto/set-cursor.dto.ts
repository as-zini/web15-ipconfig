import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SetCursorDTO {
  @ApiProperty({ description: '워크스페이스 ID', example: 'w1' })
  @IsString()
  workspaceId: string;

  @ApiProperty({ description: '유저 ID', example: 'u1' })
  @IsString()
  userId: string;

  @ApiProperty({ description: '커서 X 좌표', example: 120 })
  @IsNumber()
  x: number;

  @ApiProperty({ description: '커서 Y 좌표', example: 240 })
  @IsNumber()
  y: number;
}
