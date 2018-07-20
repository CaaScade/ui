import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthGuageComponent } from './health-guage.component';

describe('HealthGuageComponent', () => {
  let component: HealthGuageComponent;
  let fixture: ComponentFixture<HealthGuageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthGuageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthGuageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
