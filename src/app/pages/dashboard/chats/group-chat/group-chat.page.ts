/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { orderBy, Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage implements OnInit {
  chatsf: any;
  uid: string;
  textInput: string;
  usersName: string;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore)
  {
    this.uid = localStorage.getItem('userID');
    this.usersName = localStorage.getItem('Username');
    this.chatsf = this.afs.collection('chatMessages', ref=> ref.orderBy('Atime')).valueChanges();
  }
  ngOnInit() {
  }

  async sendText(){

    if(this.textInput !== ''){
      this.afs.collection('chatMessages').add({
      Atime: Date.now() ,
      Username: (await this.afAuth.currentUser).displayName,
      Message: this.textInput,
      uID : (await this.afAuth.currentUser).uid,
    });

    this.textInput= '';
  }
  }
}
