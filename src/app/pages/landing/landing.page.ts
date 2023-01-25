import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, MenuController } from '@ionic/angular';
import SwiperCore, { SwiperOptions, Pagination, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
    autoplay: true
  };

  constructor(
    private menu: MenuController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  openMenu() {
    this.menu.enable(true, 'landingPageMenu');
    this.menu.open('landingPageMenu');
  }

  async scrollTo(element: string) {
    const topPoint = document.getElementById(element).getBoundingClientRect().top;
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 1500,
      translucent: true,
      backdropDismiss: true
    });

    await loading.present();

    const { role } = await loading.onDidDismiss();
    this.content.scrollToPoint(0, topPoint, 1500);
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }

  async scrollToBottom() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 1500,
      translucent: true,
      backdropDismiss: true
    });

    await loading.present();

    const { role } = await loading.onDidDismiss();
    this.content.scrollToBottom(1500);
  }

}
