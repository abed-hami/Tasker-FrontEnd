import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarGraphComponent } from './polar-graph.component';

describe('PolarGraphComponent', () => {
  let component: PolarGraphComponent;
  let fixture: ComponentFixture<PolarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolarGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
