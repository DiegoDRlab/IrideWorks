import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingPage } from './incoming.page';

describe('Tab2Page', () => {
  let component: IncomingPage;
  let fixture: ComponentFixture<IncomingPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(IncomingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
