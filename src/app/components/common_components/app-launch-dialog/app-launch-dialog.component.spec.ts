import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLaunchDialogComponent } from './app-launch-dialog.component';

describe('AppLaunchDialogComponent', () => {
  let component: AppLaunchDialogComponent;
  let fixture: ComponentFixture<AppLaunchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLaunchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLaunchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
