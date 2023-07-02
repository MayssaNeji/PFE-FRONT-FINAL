import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSegmentsComponent } from './import-segments.component';

describe('ImportSegmentsComponent', () => {
  let component: ImportSegmentsComponent;
  let fixture: ComponentFixture<ImportSegmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSegmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportSegmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
