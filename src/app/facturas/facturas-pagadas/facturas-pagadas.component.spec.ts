import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasPagadasComponent } from './facturas-pagadas.component';

describe('FacturasPagadasComponent', () => {
  let component: FacturasPagadasComponent;
  let fixture: ComponentFixture<FacturasPagadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasPagadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasPagadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
