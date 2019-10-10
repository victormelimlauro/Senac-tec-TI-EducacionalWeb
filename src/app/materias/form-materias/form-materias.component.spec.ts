import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMateriasComponent } from './form-materias.component';

describe('FormMateriasComponent', () => {
  let component: FormMateriasComponent;
  let fixture: ComponentFixture<FormMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
