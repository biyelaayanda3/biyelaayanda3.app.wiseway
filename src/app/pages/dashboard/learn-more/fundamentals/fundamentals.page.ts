import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fundamentals',
  templateUrl: './fundamentals.page.html',
  styleUrls: ['./fundamentals.page.scss'],
})
export class FundamentalsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
