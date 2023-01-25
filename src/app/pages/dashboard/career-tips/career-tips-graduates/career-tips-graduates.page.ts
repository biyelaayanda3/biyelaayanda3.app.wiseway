import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-career-tips-graduates',
  templateUrl: './career-tips-graduates.page.html',
  styleUrls: ['./career-tips-graduates.page.scss'],
})
export class CareerTipsGraduatesPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
