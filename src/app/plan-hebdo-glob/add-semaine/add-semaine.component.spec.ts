import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSemaineComponent } from './add-semaine.component';

describe('AddSemaineComponent', () => {
  let component: AddSemaineComponent;
  let fixture: ComponentFixture<AddSemaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSemaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
