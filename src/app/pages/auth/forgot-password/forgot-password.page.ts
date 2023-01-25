import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fireAuth: AngularFireAuth,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) { }

  get email() {
    return this.credentials.get('email');
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async resetPassword() {
    this.fireAuth.sendPasswordResetEmail(this.email.value)
      .then(() => {
        const message = 'Password resent link has been sent to your email. <strong> ' + this.email.value + ' </strong>' +
        'This link will only be active for an hour. Please also check your spam folder if you having problems ' +
        'locating the email.';
        this.presentAlert(message, 'Reset Password');
      })
      .catch(err => {
        this.presentToast('Please ensure that you have provided a registered email address.', 4000);
      });
  }

  async presentAlert(alertMessage: string, alertSubtitle: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Reset Password',
      subHeader: alertSubtitle,
      message: alertMessage,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.credentials.reset();
    this.onCancel();
  }

  async presentToast(toastMessage: string, toastDuration: number) {
    const toast = await this.toastController.create({
      message: toastMessage,
      position: 'bottom',
      duration: toastDuration,
      color: 'dark',
      icon: 'information'
    });
    toast.present();
    this.credentials.reset();
  }

  async onDisplaySignUp() {
    this.onCancel();
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 1500,
      translucent: true,
      backdropDismiss: true
    });

    await loading.present();

    const { role } = await loading.onDidDismiss();
    this.router.navigateByUrl('/auth/signup');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
