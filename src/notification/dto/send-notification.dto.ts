import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDto {
  @ApiProperty({
    example: 'DEVICE_FCM_TOKEN',
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    example: 'test notification',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'this notification for test',
  })
  @IsNotEmpty()
  @IsString()
  body: string;
}
