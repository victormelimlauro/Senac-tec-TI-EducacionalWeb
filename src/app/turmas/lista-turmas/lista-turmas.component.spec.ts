import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTurmasComponent } from './lista-turmas.component';

describe('ListaTurmasComponent', () => {
  let component: ListaTurmasComponent;
  let fixture: ComponentFixture<ListaTurmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTurmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
