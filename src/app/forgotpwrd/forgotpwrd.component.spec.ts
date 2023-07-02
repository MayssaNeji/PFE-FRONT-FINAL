import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpwrdComponent } from './forgotpwrd.component';

describe('ForgotpwrdComponent', () => {
  let component: ForgotpwrdComponent;
  let fixture: ComponentFixture<ForgotpwrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpwrdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotpwrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
