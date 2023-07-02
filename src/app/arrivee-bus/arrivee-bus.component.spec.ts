import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriveeBusComponent } from './arrivee-bus.component';

describe('ArriveeBusComponent', () => {
  let component: ArriveeBusComponent;
  let fixture: ComponentFixture<ArriveeBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriveeBusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArriveeBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
