import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVisitasComponent } from './form-visitas.component';

describe('FormVisitasComponent', () => {
  let component: FormVisitasComponent;
  let fixture: ComponentFixture<FormVisitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVisitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
