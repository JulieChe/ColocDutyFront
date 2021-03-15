import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilSansColocComponent } from './accueil-sans-coloc.component';

describe('AccueilSansColocComponent', () => {
  let component: AccueilSansColocComponent;
  let fixture: ComponentFixture<AccueilSansColocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilSansColocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilSansColocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
