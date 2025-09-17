import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDVPageComponent } from './pdv-page.component';

describe('PDVPageComponent', () => {
  let component: PDVPageComponent;
  let fixture: ComponentFixture<PDVPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDVPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PDVPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
