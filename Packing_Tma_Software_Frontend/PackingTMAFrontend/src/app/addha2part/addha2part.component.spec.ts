import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addha2partComponent } from './addha2part.component';

describe('Addha2partComponent', () => {
  let component: Addha2partComponent;
  let fixture: ComponentFixture<Addha2partComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addha2partComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Addha2partComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
