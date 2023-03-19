import { Test, TestingModule } from '@nestjs/testing';
import { AuthorbookService } from './authorbook.service';

describe('AuthorbookService', () => {
  let service: AuthorbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorbookService],
    }).compile();

    service = module.get<AuthorbookService>(AuthorbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
