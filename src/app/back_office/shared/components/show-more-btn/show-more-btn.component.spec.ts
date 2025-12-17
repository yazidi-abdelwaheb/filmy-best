import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreBtnComponent } from './show-more-btn.component';

describe('ShowMoreBtnComponent', () => {
  let component: ShowMoreBtnComponent;
  let fixture: ComponentFixture<ShowMoreBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMoreBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
