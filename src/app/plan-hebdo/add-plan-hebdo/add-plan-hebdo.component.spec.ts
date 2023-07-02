import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanHebdoComponent } from './add-plan-hebdo.component';

describe('AddPlanHebdoComponent', () => {
  let component: AddPlanHebdoComponent;
  let fixture: ComponentFixture<AddPlanHebdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanHebdoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlanHebdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
