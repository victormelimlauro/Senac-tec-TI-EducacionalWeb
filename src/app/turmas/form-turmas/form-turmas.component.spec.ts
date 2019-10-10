import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTurmasComponent } from './form-turmas.component';

describe('FormTurmasComponent', () => {
  let component: FormTurmasComponent;
  let fixture: ComponentFixture<FormTurmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTurmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
