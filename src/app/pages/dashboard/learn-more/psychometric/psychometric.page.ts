import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-psychometric',
  templateUrl: './psychometric.page.html',
  styleUrls: ['./psychometric.page.scss'],
})
export class PsychometricPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
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

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
