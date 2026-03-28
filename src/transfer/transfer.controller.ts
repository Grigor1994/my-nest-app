import { Body, Controller, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from './dto/transfer.dto';
import { TransferResponseDto } from './dto/transfer-response.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly service: TransferService) {}

  // TODO add auth guard
  @Post()
  async transfer(@Body() dto: TransferDto): Promise<TransferResponseDto> {
    return this.service.transferMoney(dto);
  }
}
