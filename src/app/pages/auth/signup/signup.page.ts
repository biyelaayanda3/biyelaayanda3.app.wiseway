/* eslint-disable @typescript-eslint/naming-convention */
import { AngularFirestore } from '@angular/fire/compat/firestore';
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;
  isConfirmPasswordHidden = true;
  isPasswordHidden = true;
  isLoading = false;
  genderSelected = 'None';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public actionSheetController: ActionSheetController
  ) { }

  get name() {
    return this.credentials.get('name');
  }

  get surname() {
    return this.credentials.get('surname');
  }

  get username() {
    return this.credentials.get('username');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get confirmPassword() {
    return this.credentials.get('confirmPassword');
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      surname: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleConfirmPassword() {
    this.isConfirmPasswordHidden = !this.isConfirmPasswordHidden;
  }

  togglePassword() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  onDisplayLogin() {
    this.router.navigateByUrl('/auth');
  }

  isValidEmailAddress(email: string) {
    return (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
  }

  signUserUp() {
    const username = this.credentials.value.username;
    const name = this.credentials.value.name;
    const surname = this.credentials.value.surname;
    const email =  this.credentials.value.email;
    const password = this.credentials.value.password;

    // Check if gender has been set
    if (this.genderSelected !== 'None') {
      // Validate Email address
      if (this.isValidEmailAddress(email)) {
        // Attempt to sign user up
        this.signup(username, name, surname, email, password);
      } else {
        // Invalid Email Address
        const alertSubtitle = 'Invalid Email Address';
        const alertMessage =
          '<img src="../../../assets/icon/warning.png"><br>' +
          'Please ensure that you have specified your gender<br>' +
          'before attempting to continue.';
        this.presentAlert(alertMessage, alertSubtitle);
      }
    } else {
      const alertSubtitle = 'Missing Field Error';
      const alertMessage =
        '<img src="../../../assets/icon/warning.png"><br>' +
        'Please ensure that you have specified your gender<br>' +
        'before attempting to continue.';
      this.presentAlert(alertMessage, alertSubtitle);
    }
  }
  async signup(username: string, name: string, surname: string, email: string, password: string){



    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password).then(async responseData =>
        {
          localStorage.setItem('usersid',(await this.afAuth.currentUser).uid);
          (await this.afAuth.currentUser).updateProfile({
            displayName: username,
            photoURL:'',
          });
          // Send email verification to user's email
          responseData.user.sendEmailVerification();
          const alertSubtitle = 'Email Verification';
          const alertMessage =
        '<img src="../../../assets/icon/information.png"><br>' +
        'An email verification link has been sent to your email address.<br>' +
        'Please ensure that you verify your account before attempting to login.<br>' +
        'If the email is not in your inbox, please look in the spam folder.';
        this.presentAlert(alertMessage, alertSubtitle);
        });
        this.afs.collection('usersCollection').add({
          Name: name,
          Surname: surname,
          Username : username,
          Email : email,
          userID : (await this.afAuth.currentUser).uid,
          Status : 'Offline',
          Gender : this.genderSelected

        }).then(docRef =>{
          this.afs.collection('userStatus').add({
            userDocId: docRef,
            Email : email,
            Username : username
          });

        });
        // Print feedback message
        const alert_subtitle = 'Account Created!';
        const alert_message =
          '<img src="../../../assets/icon/information.png"><br>' +
          'Congratulations ' + name + ' ' + surname + ' your account has been successfully ' +
          'created.<br>Please proceed to the login screen to access your account.';
        this.presentAlert(alert_message, alert_subtitle);
      } catch (error) {
        // Display error feedback message
        const alert_subtitle = 'Signup Error!';
        const alert_message =
          '<img src="../../../assets/icon/warning.png"><br>' +
          'We are currently experiencing technical difficulties. We apologize for any inconvinence caused.<br>' +
          'However, we are working at resolving the issue. Please try again later.';
        this.presentAlert(alert_message, alert_subtitle);
      }
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

 async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Please select your gender',
    cssClass: 'my-custom-class',
    buttons: [{
      text: 'Male',
      icon: 'male',
      data: 9,
      handler: () => {
        this.genderSelected = 'Male';
      }
    }, {
      text: 'Female',
      icon: 'female',
      data: 10,
      handler: () => {
        this.genderSelected = 'Female';
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();

  const { role, data } = await actionSheet.onDidDismiss();
  // console.log('onDidDismiss resolved with role and data', role, data);
}

async HelpAboutAlert(displayAlertFor: string) {
  let header: string;
  let subHeader: string;
  let message: string;

  if (displayAlertFor === 'help') {
    header = 'Need Help?';
    subHeader = 'Helpful Information';
    message =
      '<img src="../../../assets/icon/information.png"><br>' +
      '';
  } else {
    header = 'About This Section';
    subHeader = 'Creating a New Account';
    message =
    '<img src="../../../assets/icon/about.png"><br>' +
    '';
  }

  const alert = await this.alertCtrl.create({
    header,
    subHeader,
    message,
    backdropDismiss: true,
    translucent: true,
    keyboardClose: true,
    buttons: ['Okay']
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
}

}
