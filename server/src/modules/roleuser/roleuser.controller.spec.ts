import { Test, TestingModule } from '@nestjs/testing';
import { RoleuserController } from './roleuser.controller';

describe('RoleuserController', () => {
  let controller: RoleuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleuserController],
    }).compile();

    controller = module.get<RoleuserController>(RoleuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
