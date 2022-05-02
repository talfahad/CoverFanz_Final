import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureResolver } from './feature.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { Feature, FeatureSchema } from './feature.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature(
      [{ name: Feature.name, schema: FeatureSchema }],
      'DB1',
    ),
  ],
  providers: [FeatureResolver, FeatureService],
})
export class FeatureModule {}
