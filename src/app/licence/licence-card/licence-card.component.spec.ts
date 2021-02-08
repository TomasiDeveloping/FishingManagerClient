import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceCardComponent } from './licence-card.component';

describe('LicenceCardComponent', () => {
  let component: LicenceCardComponent;
  let fixture: ComponentFixture<LicenceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
