import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasVigentesComponent } from './facturas-vigentes.component';

describe('FacturasVigentesComponent', () => {
  let component: FacturasVigentesComponent;
  let fixture: ComponentFixture<FacturasVigentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasVigentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasVigentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
