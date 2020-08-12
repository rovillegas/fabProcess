import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProcessComponentComponent } from './start-process-component.component';

describe('StartProcessComponentComponent', () => {
  let component: StartProcessComponentComponent;
  let fixture: ComponentFixture<StartProcessComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartProcessComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartProcessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
