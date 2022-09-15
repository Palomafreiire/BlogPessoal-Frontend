import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoGeneroComponent } from './acao-genero.component';

describe('AcaoGeneroComponent', () => {
  let component: AcaoGeneroComponent;
  let fixture: ComponentFixture<AcaoGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaoGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcaoGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
