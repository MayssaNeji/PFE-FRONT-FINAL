import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatAuditComponent } from './etat-audit.component';

describe('EtatAuditComponent', () => {
  let component: EtatAuditComponent;
  let fixture: ComponentFixture<EtatAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
