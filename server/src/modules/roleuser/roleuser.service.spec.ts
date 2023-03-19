import { Test, TestingModule } from '@nestjs/testing';
import { RoleuserService } from './roleuser.service';

describe('RoleuserService', () => {
  let service: RoleuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleuserService],
    }).compile();

    service = module.get<RoleuserService>(RoleuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
