import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPage } from './completed.page';

describe('Tab3Page', () => {
  let component: CompletedPage;
  let fixture: ComponentFixture<CompletedPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
