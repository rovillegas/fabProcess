import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponentComponent } from './tasks-component.component';

describe('TasksComponentComponent', () => {
  let component: TasksComponentComponent;
  let fixture: ComponentFixture<TasksComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
