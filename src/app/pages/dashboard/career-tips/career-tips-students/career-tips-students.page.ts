import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-career-tips-students',
  templateUrl: './career-tips-students.page.html',
  styleUrls: ['./career-tips-students.page.scss'],
})
export class CareerTipsStudentsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
