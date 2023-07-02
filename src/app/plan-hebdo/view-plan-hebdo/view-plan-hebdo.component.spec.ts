import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlanHebdoComponent } from './view-plan-hebdo.component';

describe('ViewPlanHebdoComponent', () => {
  let component: ViewPlanHebdoComponent;
  let fixture: ComponentFixture<ViewPlanHebdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlanHebdoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPlanHebdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
