import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierAssoPage } from './panier-asso.page';

describe('PanierAssoPage', () => {
  let component: PanierAssoPage;
  let fixture: ComponentFixture<PanierAssoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanierAssoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierAssoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
