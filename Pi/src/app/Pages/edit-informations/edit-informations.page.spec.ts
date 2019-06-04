import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationsPage } from './edit-informations.page';

describe('EditInformationsPage', () => {
  let component: EditInformationsPage;
  let fixture: ComponentFixture<EditInformationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInformationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInformationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
