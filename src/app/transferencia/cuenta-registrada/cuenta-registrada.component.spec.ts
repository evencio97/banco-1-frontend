import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaRegistradaComponent } from './cuenta-registrada.component';

describe('CuentaRegistradaComponent', () => {
  let component: CuentaRegistradaComponent;
  let fixture: ComponentFixture<CuentaRegistradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaRegistradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaRegistradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
