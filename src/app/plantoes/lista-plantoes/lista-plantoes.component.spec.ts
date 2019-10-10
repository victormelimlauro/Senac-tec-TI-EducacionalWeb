import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlantoesComponent } from './lista-plantoes.component';

describe('ListaPlantoesComponent', () => {
  let component: ListaPlantoesComponent;
  let fixture: ComponentFixture<ListaPlantoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPlantoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlantoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
