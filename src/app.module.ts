import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { configValidationSchema } from './config.schema';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
import { PromotionModule } from './promotion/promotion.module';
import { ReportModule } from './report/report.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
      exclude: ['*/graphql'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['config.env'],
      validationSchema: configValidationSchema,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'DB1',
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DB_DATABASE_1'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError & {
          statusCode: number;
        } = {
          message:
            error.extensions?.exception?.response ||
            error.extensions?.exception?.response?.message ||
            error.extensions?.response?.message ||
            error.message ||
            'Unknown Error Occured',
          statusCode:
            error.extensions?.exception?.status ||
            error.extensions?.exception?.response?.statusCode ||
            error.extensions?.response?.statusCode ||
            500,
        };

        return graphQLFormattedError;
      },
      context: ({ req, connection, res }) =>
        connection ? { req: connection.context, res } : { req, res },
    }),
    UserModule,
    AuthModule,
    MailModule,
    BookingModule,
    ReviewModule,
    PromotionModule,
    ReportModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
