import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCircuitComponent } from './gestion-circuit.component';

describe('GestionCircuitComponent', () => {
  let component: GestionCircuitComponent;
  let fixture: ComponentFixture<GestionCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCircuitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
