import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingPage } from './ongoing.page';

describe('Tab1Page', () => {
  let component: OngoingPage;
  let fixture: ComponentFixture<OngoingPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(OngoingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
