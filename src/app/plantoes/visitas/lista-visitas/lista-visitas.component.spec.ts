import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVisitasComponent } from './lista-visitas.component';

describe('ListaVisitasComponent', () => {
  let component: ListaVisitasComponent;
  let fixture: ComponentFixture<ListaVisitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVisitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
