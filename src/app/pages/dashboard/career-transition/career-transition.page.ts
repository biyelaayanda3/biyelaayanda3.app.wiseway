/* eslint-disable max-len */
import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController} from '@ionic/angular';
import { CareerTransitionService } from '../../../services/career-transition.service';
import SwiperCore, { SwiperOptions, Pagination, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { CareerTransitionModel } from '../../../modals/career-transition.modal';
import { Subscription } from 'rxjs';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-career-transition',
  templateUrl: './career-transition.page.html',
  styleUrls: ['./career-transition.page.scss'],
})
export class CareerTransitionPage implements OnInit, AfterContentChecked, OnDestroy {
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
    autoplay: true
  };

  contentDirectory = '../../../../assets/images/careerTransition/';

  famousPeople = [
    this.contentDirectory + 'famous_1.jpg',
    this.contentDirectory + 'famous_2.jpg',
    this.contentDirectory + 'famous_3.jpg',
    this.contentDirectory + 'famous_4.jpg',
    this.contentDirectory + 'famous_5.jpg',
    this.contentDirectory + 'famous_6.jpg',
  ];

  famousPeopleNames = [
    'Brad Pitt', 'Harry Styles', 'E. DeGeneres', 'W. Goldberg', 'Michael Jordan', 'Jeff Bezos',
  ];

  isLoading: boolean;
  loadedCareerTransition: CareerTransitionModel[];
  private careerTransition: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private careerTransitionService: CareerTransitionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.careerTransition = this.careerTransitionService.careerTransition.subscribe(careerTransitionData => {
      this.loadedCareerTransition = careerTransitionData;
      this.isLoading = true;
    });
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  ionViewDidEnter() {
    this.isLoading = false;
    this.careerTransitionService.fetchCareerTransitionItems().subscribe();
  }

  async navigateTo(path: string) {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 2000,
      translucent: true,
      backdropDismiss: true,
      keyboardClose: true
    });

    await loading.present();

    const { role } = await loading.onDidDismiss();
    this.router.navigateByUrl(path);
  }

  showSummary(person: string) {
    const subHeader = person;
    let message = '<img src="../../../../assets/icon/information.png"><br><hr>';

    switch(person) {
      case 'Brad Pitt':
        message +=
          'Brad Pitt was a limo driver. For strippers. He drove them to and from bachelor parties. ' +
          'He also used to be a furniture mover and dressed up as a giant chicken mascot for the restaurant ' +
          'chain El Pollo Loco. With that, he then decided to pursue an acting career and enrolled in acting classes. ' +
          'And within 7 months, he found an agent. Today, he’s now one of the most famous and recognizable superstars in the world.';
        break;
      case 'Harry Styles':
        message +=
          'Everybody knows the famous One Direction singer, Harry Styles. Prior to his stardom, he was a baker, earning just $7 an hour ' +
          'at the W Mandeville bakery in his hometown. Then, he decided to leave his job and stop going to school to ' +
          'audition for the X Factor. From there, One Direction was formed. He rose to fame with his other band mates.';
        break;
      case 'E. DeGeneres':
        message +=
          'Ellen DeGeneres, from the famous The Ellen DeGeneres show is a comedian, TV host, writer, and producer. ' +
          'Although before pursuing a career in the entertainment industry, she worked different jobs. One of them being a paralegal.';
        break;
      case 'W. Goldberg':
        message +=
          'From a funeral makeup artist to an actor, writer, and TV host. Whoopi is one of few entertainers to win an Emmy, Grammy, ' +
          'Oscar, and Tony awards and with good reason. But before raking in those trophies, she worked in a funeral home doing dead ' +
          'people’s hair and makeup. Yikes.';
        break;
      case 'Michael Jordan':
        message +=
          'From a basketball player to baseball player to businessman. Everybody either knows Michael Jordan ' +
          'or knows of him. He’s a household name and a person who forever changed the world of professional basketball. ' +
          'But that life is behind him now as he focuses on running his own sports team and getting rich from endorsements.';
        break;
      case 'Jeff Bezos':
        message += '';
        break;
    }

    this.presentAlert(subHeader, message);
  }

  // This code adds a product to the database
  // addCareerTransitionData() {
  //   const careerTransition: CareerTransitionModel[] = [
  //  ];

  //  careerTransition.forEach(element => {
  //    this.loadingCtrl.create({
  //     message: 'Adding Career transition'
  //   }).then(loadingEl => {
  //     loadingEl.present();
  //     this.careerTransitionService.addCareerTransition(element).subscribe(() => {
  //       loadingEl.dismiss();
  //     });
  //   });
  //  });
  // }

   async displayCareerTransitionItem(careerTransitionId: string) {
      const loading = await this.loadingCtrl.create({
        spinner: 'dots',
        duration: 2000,
        keyboardClose: true,
        translucent: true,
        backdropDismiss: true
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();
      this.router.navigateByUrl('/dashboard/tabs/career-transition/' + careerTransitionId);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Career Transition',
      subHeader,
      message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  ngOnDestroy(): void {
    if (this.careerTransition) {
      this.careerTransition.unsubscribe();
    }
  }
}
