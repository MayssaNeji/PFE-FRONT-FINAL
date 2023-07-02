import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanSegmentComponent } from './add-plan-segment.component';

describe('AddPlanSegmentComponent', () => {
  let component: AddPlanSegmentComponent;
  let fixture: ComponentFixture<AddPlanSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlanSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
