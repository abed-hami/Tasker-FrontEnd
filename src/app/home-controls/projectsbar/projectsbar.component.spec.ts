import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsbarComponent } from './projectsbar.component';

describe('ProjectsbarComponent', () => {
  let component: ProjectsbarComponent;
  let fixture: ComponentFixture<ProjectsbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
