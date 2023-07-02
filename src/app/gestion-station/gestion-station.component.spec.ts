import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStationComponent } from './gestion-station.component';

describe('GestionStationComponent', () => {
  let component: GestionStationComponent;
  let fixture: ComponentFixture<GestionStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
