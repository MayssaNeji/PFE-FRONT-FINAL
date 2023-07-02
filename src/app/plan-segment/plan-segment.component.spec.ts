import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSegmentComponent } from './plan-segment.component';

describe('PlanSegmentComponent', () => {
  let component: PlanSegmentComponent;
  let fixture: ComponentFixture<PlanSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
