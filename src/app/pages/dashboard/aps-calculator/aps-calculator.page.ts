import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-aps-calculator',
  templateUrl: './aps-calculator.page.html',
  styleUrls: ['./aps-calculator.page.scss'],
})
export class ApsCalculatorPage implements OnInit {
  homeLanguage: string[] = ['', ''];
  firstAdditionalLanguage: string[] = ['', ''];
  mathematics: string[] = ['', ''];
  lifeOrientation: string[] = ['Life Orientation', ''];
  subjectFive: string[] = ['', ''];
  subjectSix: string[] = ['', ''];
  subjectSeven: string[] = ['', ''];

  isLoading = false;
  hasScoreBeenCalculated = false;
  apsScore = 0;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // Check if user has entered all subject names
  hasSubjectNames() {
    return (this.homeLanguage[0].toString() !== '') &&
     (this.firstAdditionalLanguage[0].toString() !== '') &&
     (this.mathematics[0].toString() !== '') &&
     (this.lifeOrientation[0].toString() !== '') &&
     (this.subjectFive[0].toString() !== '') &&
     (this.subjectSix[0].toString() !== '') &&
     (this.subjectSeven[0].toString() !== '');
  }

  // Check if user has entered all subject marks
  hasSubjectMarks() {
    return (this.homeLanguage[1].toString() !== '') &&
     (this.firstAdditionalLanguage[1].toString() !== '') &&
     (this.mathematics[1].toString() !== '') &&
     (this.lifeOrientation[1].toString() !== '') &&
     (this.subjectFive[1].toString() !== '') &&
     (this.subjectSix[1].toString() !== '') &&
     (this.subjectSeven[1].toString() !== '');
  }

  // Check if there are duplicate subject names 5 - 7
  hasDuplicateSubjectNames() {
    const subjectFive = this.subjectFive[0].substring(this.subjectFive[0].indexOf('5') + 1).toString();
    const subjectSix = this.subjectSix[0].substring(this.subjectSix[0].indexOf('6') + 1).toString();
    const subjectSeven = this.subjectSeven[0].substring(this.subjectSeven[0].indexOf('7') + 1).toString();

    if
      ((subjectFive === subjectSix) ||
      (subjectFive === subjectSeven) ||
      (subjectSix === subjectSeven)) {
      return true;
    }

    return false;
  }

  validateSubjectMarkEntry() {
    let subHeader = 'Regarding: Subject ';
    let message: string;

    if (this.hasSubjectNames()) {
      if (this.hasSubjectMarks()) {
        if (!this.hasDuplicateSubjectNames()) {
          //  Proceed accordingly
          return true;
        } else {
          // remove duplicates
          subHeader += 'Names Duplication';
          message =
            '<img src="../../../../assets/icon/warning.png"><br>' +
            'Sorry. But it appears that you have unintentionally ' +
            '<strong>duplicated</strong> your <strong>subject names.</strong> ' +
            'Please remove all <strong>duplications</strong> before ' +
            'attempting to proceed.';
          this.presentAlert(subHeader, message);
        }
      } else {
        // Enter subject marks
        subHeader += 'Marks';
        message =
          '<img src="../../../../assets/icon/warning.png"><br>' +
          'Please ensure that you have filled out all the ' +
          '<strong>subject marks</strong> required.';
        this.presentAlert(subHeader, message);
      }
    } else {
      // Enter subject names
      subHeader += 'Names';
      message =
        '<img src="../../../../assets/icon/warning.png"><br>' +
        'Please ensure that you have filled out all the ' +
        '<strong>subject names</strong> required.';
      this.presentAlert(subHeader, message);
    }

    return false;
  }

  calculateScore(level: string) {
    let num: number;

    switch(level) {
      case 'level8':
        num = 8;
        break;
      case 'level7':
        num = 7;
        break;
      case 'level6':
        num =  6;
        break;
      case 'level5':
        num = 5;
        break;
      case 'level4':
        num = 4;
        break;
      case 'level3':
        num = 3;
        break;
      case 'level2':
        num = 2;
        break;
      case 'level1':
        num = 1;
        break;
    }

    return num;
  }

  async calculateAPS() {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      backdropDismiss: true,
      translucent: true,
      keyboardClose: true,
      duration: 3000
    });

    await loading.present();

    const { role } = await loading.onDidDismiss();

    if (this.validateSubjectMarkEntry()) {
      this.apsScore = 0;
      this.apsScore += this.calculateScore(this.homeLanguage[1].substring(this.homeLanguage[1].indexOf('_') + 1));
      this.apsScore += this.calculateScore(this.firstAdditionalLanguage[1].substring(this.firstAdditionalLanguage[1].indexOf('_') + 1));
      this.apsScore += this.calculateScore(this.mathematics[1].substring(this.mathematics[1].indexOf('_') + 1));
      this.apsScore += this.calculateScore(this.lifeOrientation[1].substring(this.lifeOrientation[1].indexOf('_') + 1));
      this.apsScore += this.calculateScore(this.subjectFive[1].substring(this.subjectFive[1].indexOf('_') + 1));
      this.apsScore += this.calculateScore(this.subjectSix[1].substring(this.subjectSix[1].indexOf('_') + 1));
      this.apsScore += this.calculateScore(this.subjectSeven[1].substring(this.subjectSeven[1].indexOf('_') + 1));
      this.hasScoreBeenCalculated = true;
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'APS Calculator',
      subHeader,
      message,
      backdropDismiss: true,
      translucent: true,
      keyboardClose: true,
      buttons: ['OK']
    });

    this.isLoading = false;
    await alert.present();

    const { role } = await alert.onDidDismiss();
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

}
