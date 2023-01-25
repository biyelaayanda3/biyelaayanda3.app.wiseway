import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import SwiperCore, { SwiperOptions, Pagination, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.page.html',
  styleUrls: ['./graduates.page.scss'],
})
export class GraduatesPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
    autoplay: true
  };

  isNewGraduates = true;
  isNewGraduatesContent = true;
  isChallenges = true;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  toggleNewGraduates() {
    this.isNewGraduates = !this.isNewGraduates;

    if (this.isNewGraduates) {
      setTimeout(() => {
        this.isNewGraduatesContent = this.isNewGraduates;
      }, 3000);
    } else {
      this.isNewGraduatesContent = false;
    }
  }

  toggleChallenges() {
    this.isChallenges = !this.isChallenges;
  }

}
