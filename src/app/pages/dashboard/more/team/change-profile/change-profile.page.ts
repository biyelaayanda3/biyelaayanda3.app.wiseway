import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.page.html',
  styleUrls: ['./change-profile.page.scss'],
})
export class ChangeProfilePage implements OnInit {
  credentials: FormGroup;
  usersCollection: any;
  usersPrivate: any;
  senderEmail: string;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private alertCtrl: AlertController) {
      this.senderEmail = localStorage.getItem('senderEmail');
      this.usersCollection = this.afs.collection('usersCollection').valueChanges();
      this.usersPrivate = this.afs.collection('userStatus').valueChanges();
    }

  get username() {
    return this.credentials.get('username');
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  changeProfile() {
    this.usersPrivate.forEach(element => {
      for(const x in element){
        if(this.senderEmail === element[x].Email){
        this.afs.collection('usersCollection').doc(element[x].userDocId.id).update(
          {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Username: this.username.value
          }
        );}}
  });
  this.featureCurrentlyUnavailable();
  }

  featureCurrentlyUnavailable() {
    const subHeader = 'Edit Profile';
    const message =
      '<img src="../../../../../../assets/icon/information.png"><br>' +
      'Your username has been successfully changed.';

    this.presentAlert(subHeader, message);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Change UserName',
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

}
