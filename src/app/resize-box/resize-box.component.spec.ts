import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeBoxComponent } from './resize-box.component';

describe('ResizeBoxComponent', () => {
  let component: ResizeBoxComponent;
  let fixture: ComponentFixture<ResizeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizeBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResizeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
