import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareerTipsGraduatesPage } from './career-tips-graduates.page';

describe('CareerTipsGraduatesPage', () => {
  let component: CareerTipsGraduatesPage;
  let fixture: ComponentFixture<CareerTipsGraduatesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerTipsGraduatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareerTipsGraduatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
