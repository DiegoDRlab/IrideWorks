import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksiteDetailsPage } from './worksite-details.page';

describe('WorksiteDetailsPage', () => {
  let component: WorksiteDetailsPage;
  let fixture: ComponentFixture<WorksiteDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
