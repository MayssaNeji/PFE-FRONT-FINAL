import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHebdoGlobComponent } from './plan-hebdo-glob.component';

describe('PlanHebdoGlobComponent', () => {
  let component: PlanHebdoGlobComponent;
  let fixture: ComponentFixture<PlanHebdoGlobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanHebdoGlobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanHebdoGlobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
