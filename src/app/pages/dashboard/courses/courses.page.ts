/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { RulesPageModule } from './mut-faculties/rules/rules.module';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, LoadingController, ModalController } from '@ionic/angular';
import { RulesPage } from './mut-faculties/rules/rules.page';
import { DegreeService } from '../../../services/degree.service';
import { Degrees } from '../../../modals/degrees.modal';
import { CoursesListPage } from './more/courses-list/courses-list.page';
import { Subscription } from 'rxjs';
import { BComService } from 'src/app/services/b-com.service';
import { AdvancedCertificatesService } from '../../../services/advanced-certificates.service';
import { HigherCertificatesService } from '../../../services/higher-certificates.service';
import { OnlineCertificatesService } from '../../../services/online-certificates.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit, OnDestroy {
  degrees: Degrees[];
  bCom: Degrees[];
  advanced: Degrees[];
  higer: Degrees[];
  online: Degrees[];
  isLoadingDegree = false;

  private degreeSubscription: Subscription;
  private bComSubscription: Subscription;
  private advancedSubscription: Subscription;
  private higherSubscription: Subscription;
  private onlineSubscription: Subscription;

  constructor(
    private degreeService: DegreeService,
    private bComService: BComService,
    private advancedService: AdvancedCertificatesService,
    private higherService: HigherCertificatesService,
    private onlineService: OnlineCertificatesService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.degreeSubscription = this.degreeService.degrees.subscribe(degrees => {
      this.degrees = degrees;
    });

    this.bComSubscription = this.bComService.degrees.subscribe(degrees => {
      this.bCom = degrees;
    });

    this.advancedSubscription = this.advancedService.degrees.subscribe(degrees => {
      this.advanced = degrees;
    });

    this.higherSubscription = this.higherService.degrees.subscribe(degrees => {
      this.higer = degrees;
    });

    this.onlineSubscription = this.onlineService.degrees.subscribe(degrees => {
      this.online = degrees;
    });
  }

  ionViewWillEnter() {
    this.isLoadingDegree = true;
    // Fetch all degrees
    this.degreeService.fetchDegrees('degrees').subscribe(() => {
    this.isLoadingDegree = false;
    });
    // BCom
    this.bComService.fetchDegrees('commerceBCom').subscribe(() => {
      this.isLoadingDegree = false;
      });
    // Advanced
    this.advancedService.fetchDegrees('advancedCertificates').subscribe(() => {
      this.isLoadingDegree = false;
      });
    // Higer
    this.higherService.fetchDegrees('higerCertificate').subscribe(() => {
      this.isLoadingDegree = false;
      });
    // Online
    this.onlineService.fetchDegrees('online').subscribe(() => {
      this.isLoadingDegree = false;
      });
  }

  //   addFeaturedDepartmentProduct() {
  //   // This code adds a product to the database
  //  const degrees: Degrees[] = [
  //  ];

  //  degrees.forEach(element => {
  //    this.loadingCtrl.create({
  //     message: 'Adding a product'
  //   }).then(loadingEl => {
  //     loadingEl.present();
  //     this.degreeService.addDegree(element).subscribe(() => {
  //       loadingEl.dismiss();
  //     });
  //   });
  //  });
  // }

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

    if (canvas === 'rules') {
      this.presentPageModal(RulesPage);
    }

    if (canvas === 'undergraduate-degrees') {
      this.presentPageModal(CoursesListPage);
    }

    this.router.navigateByUrl(canvas);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mangosuthu University',
      subHeader: 'Shape and own the future',
      message:
        '<img src="../../../assets/icon/enterprise.png"><br>' +
        'The faculties and courses outlined in this application' +
        ' are in-line with the faculties and courses offered at' +
        ' MUT.',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
        },
        {
          text: 'Learn More',
          id: 'confirm-button',
          handler: () => {
            this.presentLoading();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      duration: 2000,
      translucent: true,
      backdropDismiss: true,
      keyboardClose: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl('/dashboard/tabs/mut');
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

  async presentPageModalCourse(displayDegree: Degrees) {
    const modal = await this.modalCtrl.create({
      component: CoursesListPage,
      componentProps: {
        selectedDegree: displayDegree
      },
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

  ngOnDestroy(): void {
    if (this.degreeSubscription) {
      this.degreeSubscription.unsubscribe();
    }
    if (this.bComSubscription) {
      this.bComSubscription.unsubscribe();
    }
    if (this.advancedSubscription) {
      this.advancedSubscription.unsubscribe();
    }
    if (this.higherSubscription) {
      this.higherSubscription.unsubscribe();
    }
    if (this.onlineSubscription) {
      this.onlineSubscription.unsubscribe();
    }
  }

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
