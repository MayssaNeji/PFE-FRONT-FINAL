import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetAuditComponent } from './view-det-audit.component';

describe('ViewDetAuditComponent', () => {
  let component: ViewDetAuditComponent;
  let fixture: ComponentFixture<ViewDetAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
