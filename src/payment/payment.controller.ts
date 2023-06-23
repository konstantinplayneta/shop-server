import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { MakePaymentDto } from './dto/make-paymen.dto';
import { MakePaymentResponse } from './types';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOkResponse({ type: MakePaymentResponse })
  @Post()
  makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}
