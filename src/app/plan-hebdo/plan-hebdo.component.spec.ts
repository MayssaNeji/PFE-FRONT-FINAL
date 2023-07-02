import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHebdoComponent } from './plan-hebdo.component';

describe('PlanHebdoComponent', () => {
  let component: PlanHebdoComponent;
  let fixture: ComponentFixture<PlanHebdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanHebdoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanHebdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
