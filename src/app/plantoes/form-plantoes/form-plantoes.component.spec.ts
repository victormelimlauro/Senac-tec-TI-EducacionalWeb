import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlantoesComponent } from './form-plantoes.component';

describe('FormPlantoesComponent', () => {
  let component: FormPlantoesComponent;
  let fixture: ComponentFixture<FormPlantoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPlantoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlantoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
