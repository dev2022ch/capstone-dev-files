import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventAndRegDetailsGoerComponent } from './event-and-reg-details-goer.component';

describe('EventAndRegDetailsGoerComponent', () => {
  let component: EventAndRegDetailsGoerComponent;
  let fixture: ComponentFixture<EventAndRegDetailsGoerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAndRegDetailsGoerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventAndRegDetailsGoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
