import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComunicadosComponent } from './form-comunicados.component';

describe('FormComunicadosComponent', () => {
  let component: FormComunicadosComponent;
  let fixture: ComponentFixture<FormComunicadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComunicadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
