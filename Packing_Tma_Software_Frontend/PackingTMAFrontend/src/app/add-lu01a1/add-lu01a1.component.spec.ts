import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLu01a1Component } from './add-lu01a1.component';

describe('AddLu01a1Component', () => {
  let component: AddLu01a1Component;
  let fixture: ComponentFixture<AddLu01a1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLu01a1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLu01a1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
