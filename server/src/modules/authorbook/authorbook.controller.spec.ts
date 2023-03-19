import { Test, TestingModule } from '@nestjs/testing';
import { AuthorbookController } from './authorbook.controller';

describe('AuthorbookController', () => {
  let controller: AuthorbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorbookController],
    }).compile();

    controller = module.get<AuthorbookController>(AuthorbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
