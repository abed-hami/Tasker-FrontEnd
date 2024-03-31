import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityPieComponent } from './priority-pie.component';

describe('PriorityPieComponent', () => {
  let component: PriorityPieComponent;
  let fixture: ComponentFixture<PriorityPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityPieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorityPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
