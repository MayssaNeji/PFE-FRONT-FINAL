import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStationComponent } from './import-station.component';

describe('ImportStationComponent', () => {
  let component: ImportStationComponent;
  let fixture: ComponentFixture<ImportStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
