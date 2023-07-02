import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEmployeComponent } from './import-employe.component';

describe('ImportEmployeComponent', () => {
  let component: ImportEmployeComponent;
  let fixture: ComponentFixture<ImportEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
