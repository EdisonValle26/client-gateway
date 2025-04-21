import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  imports:[
      ClientsModule.register([
        { name: ORDER_SERVICE,
          transport: Transport.TCP,
          options:{
            host: envs.ordercMsHost,
            port: envs.orderMsPort
          }
        },
      ]),
    ]
})
export class OrdersModule {}
