import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaNoRegistradaComponent } from './cuenta-no-registrada.component';

describe('CuentaNoRegistradaComponent', () => {
  let component: CuentaNoRegistradaComponent;
  let fixture: ComponentFixture<CuentaNoRegistradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaNoRegistradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaNoRegistradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
