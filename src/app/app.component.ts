/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  userStatus: any;
  senderEmail: any;

  constructor(
    private menu: MenuController,
    private alertCtrl: AlertController,
    public afs: AngularFirestore,
    private router: Router,
    private nav: NavController) {
      this.senderEmail = localStorage.getItem('emails');
      this.userStatus = this.afs.collection('userStatus').valueChanges();
    }

  async presentAlert(displayAlertFor: string) {
    let header: string;
    let subHeader: string;
    let message: string;

    if (displayAlertFor === 'help') {
      header = 'Need Help?';
      subHeader = 'Helpful Information';
      message =
        '<img src="../../assets/icon/information.png"><br>' +
        'Welcome to <strong>Wiseway</strong>. This is an MVP prototype of the fully fledged application we ' +
        'are intending on creating. Please use the application extensively and give us your feedback. ' +
        'We would like to hear from all our current and future users.';
    } else {
      header = 'Wiseway?';
      subHeader = 'Brief Description';
      message =
      '<img src="../../assets/icon/information.png"><br>' +
      'Picture a dedicated comprehensive career guidance, based on the students interests, skills ' +
      'and personality characteristics. Over the years, many career guidance facilities have ' +
      'achieved amazing results helping students achieve the best they can. Their successes ' +
      'mixed with our research, hard work and determination to help as many students as we can ' +
      'will ensure that students follow a career path that is best suited to their individual career ' +
      'orientation. Helping them make informed, realistic choices to get a head start in life. ';
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

  closeSideDrawer(selectedMenu: string) {
    this.menu.enable(true, selectedMenu);

    if (this.menu.isOpen(selectedMenu)) {
      this.menu.close(selectedMenu);
    }
  }

  logOff(){
    //update status when logging in
     this.userStatus.forEach(element => {
       for(let x in element){
         if(this.senderEmail === element[x].Email){
         this.afs.collection('usersCollection').doc(element[x].userDocId.id).update(
           {
             Status:'offline'
           });
       }}
      //  this.nav.navigateForward(['/auth']);
      this.router.navigateByUrl('/auth');
      });
     }

  featureCurrentlyUnavailable() {
    const subHeader = 'Feature Currently Unavailable';
    const message =
      '<img src="../../assets/icon/warning.png"><br>' +
      'This feature is currently unavailable. It will be available once ' +
      'you have a valid subscription. However, if you have a currently ' +
      'running subscription please email: <strong>wiseway.info@gamil.com</strong> ' +
      'with your account details.';

    this.presentAlertMessage(subHeader, message);
  }

  async presentAlertMessage(subHeader: string, message: string) {
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
}
