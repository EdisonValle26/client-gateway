import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
          catchError((err) => {
            throw new RpcException(err);
          }),
        );
  }

  @Get()
  findAllOrder(@Query() paginationDto: PaginationDto){
      return this.ordersClient.send('findAllOrders', paginationDto).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
  
  @Get(':id')
  findOneOrder(@Param("id", ParseUUIDPipe) id: string){
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
