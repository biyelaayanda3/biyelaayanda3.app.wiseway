/* eslint-disable no-var */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, LoadingController, MenuController, ModalController, ModalOptions } from '@ionic/angular';
import { ApsCalculatorPage } from '../aps-calculator/aps-calculator.page';
import { CareerTipsPage } from '../career-tips/career-tips.page';
import { FundamentalsPage } from '../learn-more/fundamentals/fundamentals.page';
import { GraduatesPage } from '../learn-more/graduates/graduates.page';
import { LearnersPage } from '../learn-more/learners/learners.page';
import { ParentsPage } from '../learn-more/parents/parents.page';
import SwiperCore, { SwiperOptions, Pagination, Autoplay, EffectFade } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { PsychometricPage } from '../learn-more/psychometric/psychometric.page';
import { UndergradPostgradPage } from '../learn-more/undergrad-postgrad/undergrad-postgrad.page';

SwiperCore.use([Pagination, Autoplay, EffectFade]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
    autoplay: true,
    direction: 'horizontal',
    effect: 'fade'
  };

  sliderImages = [
    '../../../assets/images/dashboard/1.jpg',
    '../../../assets/images/dashboard/2.jpg',
    '../../../assets/images/dashboard/3.jpg',
    '../../../assets/images/dashboard/4.jpg',
  ];

  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    // 1eb21083938f57d96b2ca2e878872c8a5 -- Chatbot old ID
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    (function(d, m){
      const kommunicateSettings =
          // eslint-disable-next-line quote-props
          {'appId':'11dba82b071598585b152bdedd05b9763','popupWidget':true,'automaticChatOpenOnNavigation':true};
      var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
      var h = document.getElementsByTagName('head')[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;
  })(document, (window as any).kommunicate || {});
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }

  async displayLoader(canvas: string) {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true,
      duration: 2000,
      translucent: true,
      animated: true,
      backdropDismiss: true,
      keyboardClose: true
    });

    await loading.present();

    const { role } = await loading.onDidDismiss();

    switch (canvas) {
      case 'calculator':
        this.presentPageModal(ApsCalculatorPage);
        break;
      case 'career-tips':
        this.presentPageModal(CareerTipsPage);
        break;
      case 'graduates':
        this.presentPageModal(GraduatesPage);
        break;
      case 'learners':
        this.presentPageModal(LearnersPage);
        break;
      case 'parents':
        this.presentPageModal(ParentsPage);
        break;
      case 'fundamentals':
        this.presentPageModal(FundamentalsPage);
        break;
      case 'pyschometric':
        this.presentPageModal(PsychometricPage);
        break;
      case 'undergradPostgrad':
        this.presentPageModal(UndergradPostgradPage);
        break;
    }

    this.router.navigateByUrl(canvas);
  }

  featureCurrentlyUnavailable() {
    const subHeader = 'Feature Currently Unavailable';
    const message =
      '<img src="../../../../assets/icon/warning.png"><br>' +
      'This feature is currently unavailable. It will be available once ' +
      'you have a valid subscription. However, if you have a currently ' +
      'running subscription please email: <strong>wiseway.info@gamil.com</strong> ' +
      'with your account details.';

    this.presentAlert(subHeader, message);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Subscription Based',
      subHeader,
      message,
      backdropDismiss: true,
      translucent: true,
      keyboardClose: true,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(1000)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => this.enterAnimation(baseEl).direction('reverse');

  private async presentPageModal(pageComponent: any) {
    const modal = await this.modalCtrl.create({
      component: pageComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      swipeToClose: true,
      keyboardClose: true,
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation,
      breakpoints: [0, 0.3, 0.5, 0.6, 0.8, 1],
      initialBreakpoint: 1,
    });

    await modal.present();
    const { role } = await modal.onDidDismiss();
  }

}
