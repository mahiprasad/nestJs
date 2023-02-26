import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    AdminModule, 
    DatabaseModule, 
    AuthModule, 
    ProfileModule,
    MailerModule.forRoot({
      transport:{
        host: 'smtp.sendgrid.net',
        auth:{
          user: 'apikey',
          pass:''
        }
      }
    })
  ],
})
export class AppModule {}
