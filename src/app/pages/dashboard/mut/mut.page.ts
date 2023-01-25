import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-mut',
  templateUrl: './mut.page.html',
  styleUrls: ['./mut.page.scss'],
})
export class MutPage implements OnInit {
  isLoading = false;

  constructor(
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
  }

  async navigate() {
    await this.delay(3000);
    this.isLoading = false;
    // this.router.navigateByUrl('/landing');
  }

  delay(ms: number): Promise<any> {
    const observable = of();
    return observable.pipe(delay(ms)).toPromise();
  }

  ionViewDidEnter() {
    this.isLoading = true;
    this.navigate();
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu');
    this.menu.open('mainMenu');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Degrees & Diplomas:',
      subHeader: 'Conferred By The University',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
