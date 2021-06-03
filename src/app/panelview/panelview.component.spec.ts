import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelviewComponent } from './panelview.component';

describe('PanelviewComponent', () => {
  let component: PanelviewComponent;
  let fixture: ComponentFixture<PanelviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
