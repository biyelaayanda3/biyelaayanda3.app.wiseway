/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController, LoadingController } from '@ionic/angular';
import { InboxPage } from '../inbox/inbox.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { orderBy, Timestamp } from 'firebase/firestore';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage implements OnInit {
  chatsf: any;
  uid: string;
  textInput: string;
  senderName: string;
  usersPrivate: any;
  senderEmail: any;
  dud: any;
  userStatus: any;
  malesCount = 0;
  femalesCount = 0;
  activeCount = 0;
  offlineCount = 0;

  isNewGraduates = false;
  isNewGraduatesContent = false;
  isChallenges = false;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private nav: NavController
  ) {
    this.isLoading = true;

    this.senderEmail = localStorage.getItem('emails');
    this.uid = localStorage.getItem('usersid');
    this.senderName = localStorage.getItem('myName');
    this.chatsf = this.afs.collection('private-chatMessages', ref=> ref.orderBy('Atime')).valueChanges();
    this.usersPrivate = this.afs.collection('usersCollection').valueChanges();
    this.userStatus = this.afs.collection('userStatus').valueChanges();


    this.usersPrivate.forEach(element => {
        for(let x in element){
          if(this.senderEmail === element[x].Email) {
            localStorage.setItem('senderId',element[x].userID);
          }

          // Count gender
          if ((element[x].Gender === 'Male') && element[x].Email !== this.senderEmail) {
            this.malesCount++;
          }
          if ((element[x].Gender === 'Female') && element[x].Email !== this.senderEmail) {
            this.femalesCount++;
          }

          // Count active | offline
          if ((element[x].Status === 'Offline') && element[x].Email !== this.senderEmail) {
            this.offlineCount++;
          }
          if ((element[x].Status === 'Active') && element[x].Email !== this.senderEmail) {
            this.activeCount++;
          }
        }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  toggleNewGraduates() {
    this.isNewGraduates = !this.isNewGraduates;

    if (this.isNewGraduates) {
      setTimeout(() => {
        this.isNewGraduatesContent = this.isNewGraduates;
      }, 3000);
    } else {
      this.isNewGraduatesContent = false;
    }
  }

  inbox(sendermail,receiveID,receiverName){
    localStorage.setItem('senderEmail', sendermail);
    localStorage.setItem('receiverName', receiverName);
    localStorage.setItem('receiverID',receiveID);
    // this.nav.navigateForward(['/dashboard/tabs/chats/inbox']);
    this.presentPageModal(InboxPage);
  }

  // ngithi mina kumele

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
    this.nav.navigateForward(['/auth']);
   });
  }

  // Don't touch the code below
  async displayLoader() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true,
      duration: 2000,
      translucent: true,
      animated: true,
      backdropDismiss: true,
      keyboardClose: true
    });

    await loading.present();
    const { role } = await loading.onDidDismiss();

    this.presentPageModal(InboxPage);
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(1000)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => this.enterAnimation(baseEl).direction('reverse');

  private async presentPageModal(pageComponent: any) {
    const modal = await this.modalCtrl.create({
      component: pageComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      swipeToClose: true,
      keyboardClose: true,
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation,
      breakpoints: [0, 0.3, 0.5, 0.6, 0.8, 1],
      initialBreakpoint: 1,
    });

    await modal.present();
    const { role } = await modal.onDidDismiss();
  }


}
