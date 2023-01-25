/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { AnimationController, LoadingController, ModalController } from '@ionic/angular';
import { CareerTipsGraduatesPage } from './career-tips-graduates/career-tips-graduates.page';
import { CareerTipsStudentsPage } from './career-tips-students/career-tips-students.page';

@Component({
  selector: 'app-career-tips',
  templateUrl: './career-tips.page.html',
  styleUrls: ['./career-tips.page.scss'],
})
export class CareerTipsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
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
      case 'students':
        this.presentPageModal(CareerTipsStudentsPage);
        break;
      case 'graduates':
        this.presentPageModal(CareerTipsGraduatesPage);
        break;
    }
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

  async presentPageModal(pageComponent: any) {
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
