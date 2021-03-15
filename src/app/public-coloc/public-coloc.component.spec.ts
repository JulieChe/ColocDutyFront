import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicColocComponent } from './public-coloc.component';

describe('PublicColocComponent', () => {
  let component: PublicColocComponent;
  let fixture: ComponentFixture<PublicColocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicColocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicColocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
