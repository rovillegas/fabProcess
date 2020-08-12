import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessExtensionComponent } from './process-extension.component';

describe('ProcessExtensionComponent', () => {
  let component: ProcessExtensionComponent;
  let fixture: ComponentFixture<ProcessExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
