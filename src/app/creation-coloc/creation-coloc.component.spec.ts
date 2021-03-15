import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationColocComponent } from './creation-coloc.component';

describe('CreationColocComponent', () => {
  let component: CreationColocComponent;
  let fixture: ComponentFixture<CreationColocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationColocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationColocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
