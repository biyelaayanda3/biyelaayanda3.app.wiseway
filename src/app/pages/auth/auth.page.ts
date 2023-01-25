import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  credentials: FormGroup;
  isLoading = false;
  isPasswordHidden = true;
  name: any;

  usersIDs: any;
  usersPrivate: any;

  constructor(
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private asf: AngularFirestore
  ) {
    this.usersIDs = this.asf.collection('usersCollection').valueChanges();
    this.usersPrivate = this.asf.collection('userStatus').valueChanges();
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  togglePassword() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  isValidEmailAddress(email: string) {
    return (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
  }

  onSubmit() {
    if (!this.credentials.valid) {
      return;
    }

    const email = this.credentials.value.email;
    const password = this.credentials.value.password;

    // Validate Email
    if (this.isValidEmailAddress(email)) {
      // Attempt to log user in
      this.logUser(email, password);
      this.credentials.reset();
    } else {
      // Display Email Error
      const alertSubtitle = 'Invalid Email Address';
      const alertMessage =
        '<img src="../../assets/icon/warning.png"><br>' +
        'Please ensure that you have specified your gender<br>' +
        'before attempting to continue.';
      this.presentAlert(alertMessage, alertSubtitle);
    }

  }

  async logUser(email: string, password: string){
try {
    const res = await this.afAuth.signInWithEmailAndPassword(email,password);
    // Check if user is verified | <!--res.user.emailVerified-->
    if ( true ) {
      this.afAuth.authState.subscribe(authState =>{
        if(authState){
          this.name= authState;
          // console.log(this.name);
          localStorage.setItem('myName',this.name);
        }
      });
      localStorage.setItem('emails', email);
      //update status when logging in
      this.usersPrivate.forEach(element => {
        for(const x in element){
          if(email === element[x].Email){
          this.asf.collection('usersCollection').doc(element[x].userDocId.id).update(
            {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Status:'Active'
            }
          );
        }
        }
    });

    this.usersIDs.forEach(element => {
      for(const x in element){
        if(email === element[x].Email){
          localStorage.setItem('userID', element[x].userID);
      }
      }
  });

    this.router.navigateByUrl('/dashboard/tabs/home');
    } else {
      // User email not verified
      console.log('Please verify email!');
    }

  } catch(error){
    const alertSubtitle = 'Login Error!';
    const alertMessage =
      '<img src="../../../assets/icon/warning.png"><br>' +
      'We are currently experiencing technical difficulties. We apologize for any inconvinence caused.<br>' +
      'However, we are working at resolving the issue. Please try again later.';
    this.presentAlert(alertMessage, alertSubtitle);
  }
  }

  changeForm() {
    console.log('Form validation');
    this.router.navigateByUrl('/dashboard/tabs/home');
  }

  onDisplaySignUp() {
    this.router.navigateByUrl('/auth/signup');
  }

  async presentModalForgotPassword() {
    this.credentials.reset();
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordPage,
      breakpoints: [0, 0.3, 0.5, 0.6, 0.8],
      initialBreakpoint: 0.8,
    });

    await modal.present();
    const { role } = await modal.onDidDismiss();
  }

  async presentAlert(alertMessage: string, alertSubtitle: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Sign Up Authentication',
      subHeader: alertSubtitle,
      message: alertMessage,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
