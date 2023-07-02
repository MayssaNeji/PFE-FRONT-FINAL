import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceBusComponent } from './presence-bus.component';

describe('PresenceBusComponent', () => {
  let component: PresenceBusComponent;
  let fixture: ComponentFixture<PresenceBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceBusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresenceBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
