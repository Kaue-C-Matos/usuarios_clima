import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DataSource } from 'typeorm';
import { UserModules } from './module/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "clima",
      entities: [User],
      synchronize: true
    }),
    UserModules
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
