import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkourPage } from './parkour.page';

describe('ParkourPage', () => {
  let component: ParkourPage;
  let fixture: ComponentFixture<ParkourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
