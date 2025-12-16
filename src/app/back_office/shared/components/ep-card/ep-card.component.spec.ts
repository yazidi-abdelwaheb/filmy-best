import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpCardComponent } from './ep-card.component';

describe('EpCardComponent', () => {
  let component: EpCardComponent;
  let fixture: ComponentFixture<EpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
