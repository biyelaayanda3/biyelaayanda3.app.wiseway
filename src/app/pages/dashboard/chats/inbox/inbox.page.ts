/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  chatsf: any;
  senderId: any;
  textInput: string;
  usersName: string;
  senderEmail: any;
  receiverName: any;
  senderName: any;
  receiverID: any;

  constructor(
    private modalCtrl: ModalController,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore) {
         // this.senderId = localStorage.getItem('senderId');
    this.senderEmail = localStorage.getItem('senderEmail');
    this.senderName = localStorage.getItem('senderName');
    this.receiverName = localStorage.getItem('receiverName');
    this.receiverID = localStorage.getItem('receiverID');
    this.senderId = localStorage.getItem('senderId');
    console.log(this.senderId);
    this.chatsf = this.afs.collection('private-chatMessages', ref=> ref.orderBy('Atime')).valueChanges();
     }

  ngOnInit() {
  }

  async sendText(){
    if(this.textInput!==''){
      this.afs.collection('private-chatMessages').add({
      Atime : Date.now() ,
      SenderName : (await this.afAuth.currentUser).displayName,
      Message : this.textInput,
      SenderID : (await this.afAuth.currentUser).uid,
      SenderEmail : this.senderEmail,
      ReceiverID : this.receiverID,
      ReceiverName : this.receiverName

    });

    this.textInput= '';
  }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
