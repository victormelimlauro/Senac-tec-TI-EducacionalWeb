import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosSharedComponent } from './usuarios-shared.component';

describe('UsuariosSharedComponent', () => {
  let component: UsuariosSharedComponent;
  let fixture: ComponentFixture<UsuariosSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
