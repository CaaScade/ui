import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebaarComponent } from './sidebaar.component';

describe('SidebaarComponent', () => {
  let component: SidebaarComponent;
  let fixture: ComponentFixture<SidebaarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebaarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
