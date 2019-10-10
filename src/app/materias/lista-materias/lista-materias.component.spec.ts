import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMateriasComponent } from './lista-materias.component';

describe('ListaMateriasComponent', () => {
  let component: ListaMateriasComponent;
  let fixture: ComponentFixture<ListaMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
