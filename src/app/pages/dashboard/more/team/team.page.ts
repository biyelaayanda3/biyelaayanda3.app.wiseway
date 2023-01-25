/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, LoadingController, ModalController } from '@ionic/angular';
import { ChangeProfilePage } from './change-profile/change-profile.page';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  displayEditProfile() {
    this.presentPageModal(ChangeProfilePage);
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
