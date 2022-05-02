import { Test, TestingModule } from '@nestjs/testing';
import { PromotionResolver } from './promotion.resolver';
import { PromotionService } from './promotion.service';

describe('PromotionResolver', () => {
  let resolver: PromotionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionResolver, PromotionService],
    }).compile();

    resolver = module.get<PromotionResolver>(PromotionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
