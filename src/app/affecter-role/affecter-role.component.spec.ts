import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterRoleComponent } from './affecter-role.component';

describe('AffecterRoleComponent', () => {
  let component: AffecterRoleComponent;
  let fixture: ComponentFixture<AffecterRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffecterRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
