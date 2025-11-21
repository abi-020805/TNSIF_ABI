import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShopOwnerService } from './ShopOwner.service';

describe('ShopOwnerService', () => {
  let service: ShopOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShopOwnerService],
    });
    service = TestBed.inject(ShopOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
