import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopContentComponent } from './shop-content.component';

describe('ShopContentComponent', () => {
  let component: ShopContentComponent;
  let fixture: ComponentFixture<ShopContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
