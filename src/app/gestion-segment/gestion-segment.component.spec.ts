import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSegmentComponent } from './gestion-segment.component';

describe('GestionSegmentComponent', () => {
  let component: GestionSegmentComponent;
  let fixture: ComponentFixture<GestionSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
