import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleService } from './modules/role/role.service';
import { UserService } from './modules/user/user.service';
import { BookService } from './modules/book/book.service';
import { AuthorService } from './modules/author/author.service';
import { ImageService } from './modules/image/image.service';
import { CityService } from './modules/city/city.service';
import { AppointmentService } from './modules/appointment/appointment.service';
import { RoleController } from './modules/role/role.controller';
import { UserController } from './modules/user/user.controller';
import { BookController } from './modules/book/book.controller';
import { AuthorController } from './modules/author/author.controller';
import { ImageController } from './modules/image/image.controller';
import { CityController } from './modules/city/city.controller';
import { AppointmentController } from './modules/appointment/appointment.controller';
import { DataController } from './modules/data/data.controller';
import { ServiceData } from './modules/data/DataService';
import { AuthorbookService } from './authorbook/authorbook.service';
import { AuthorbookController } from './authorbook/authorbook.controller';
import { RoleuserService } from './roleuser/roleuser.service';
import { RoleuserController } from './roleuser/roleuser.controller';

@Module({
  imports: [],
  controllers: [AppController, RoleController, UserController, BookController, AuthorController, ImageController, CityController, AppointmentController, DataController, AuthorbookController, RoleuserController],
  providers: [AppService, RoleService, UserService, BookService, AuthorService, ImageService, CityService, AppointmentService, ServiceData, AuthorbookService, RoleuserService],
})
export class AppModule {}
