import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-undergrad-postgrad',
  templateUrl: './undergrad-postgrad.page.html',
  styleUrls: ['./undergrad-postgrad.page.scss'],
})
export class UndergradPostgradPage implements OnInit {
  isLoading = true;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ionViewDidEnter() {
    this.isLoading = true;
    this.navigate();
  }

  async navigate() {
    await this.delay(7000);
    this.isLoading = false;
  }


  delay(ms: number): Promise<any> {
    const observable = of();
    return observable.pipe(delay(ms)).toPromise();
  }
}
