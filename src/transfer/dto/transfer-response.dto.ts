import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TransferResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiPropertyOptional()
  amount?: number;

  @ApiProperty()
  fromBalance: number;

  @ApiPropertyOptional()
  toBalance?: number;

  @ApiPropertyOptional()
  message?: string;

  @ApiPropertyOptional()
  error?: string;

  @ApiPropertyOptional()
  transactionLogId?: number;

  constructor(partial: Partial<TransferResponseDto>) {
    Object.assign(this, partial);
  }
}
