import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaColocComponent } from './ma-coloc.component';

describe('MaColocComponent', () => {
  let component: MaColocComponent;
  let fixture: ComponentFixture<MaColocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaColocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaColocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
