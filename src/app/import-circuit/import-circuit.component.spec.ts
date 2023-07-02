import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCircuitComponent } from './import-circuit.component';

describe('ImportCircuitComponent', () => {
  let component: ImportCircuitComponent;
  let fixture: ComponentFixture<ImportCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCircuitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
