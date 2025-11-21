import { TestBed } from '@angular/core/testing';
import { ShopOwnerComponent } from './ShopOwner.component';
import { ShopOwnerService } from './ShopOwner.service';
import { of } from 'rxjs';

describe('ShopOwnerComponent', () => {
  let mockShopOwnerService: jasmine.SpyObj<ShopOwnerService>;

  beforeEach(async () => {
    mockShopOwnerService = jasmine.createSpyObj('ShopOwnerService', ['getShopOwner']);
    mockShopOwnerService.getShopOwners.and.returnValue(of([])); // Mock response

    await TestBed.configureTestingModule({
      declarations: [ShopOwnerComponent],
      providers: [{ provide: ShopOwnerService, useValue: mockShopOwnerService }],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ShopOwnerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ShopOwner'`, () => {
    const fixture = TestBed.createComponent(ShopOwnerComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('ShopOwner');
  });

  it('should call getShopOwner on init', () => {
    const fixture = TestBed.createComponent(ShopOwnerComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'getShopOwners');
    component.ngOnInit();
    expect(component.getShopOwners).toHaveBeenCalled();
  });

  it('should fetch shop owners from the service', () => {
    const fixture = TestBed.createComponent(ShopOwnerComponent);
    const component = fixture.componentInstance;
    component.getShopOwners();
    expect(mockShopOwnerService.getShopOwners).toHaveBeenCalled();
  });
});
