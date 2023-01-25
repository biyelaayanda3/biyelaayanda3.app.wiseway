import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CareerTransitionService } from '../../../../services/career-transition.service';
import { CareerTransitionModel } from '../../../../modals/career-transition.modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-career-transition-item',
  templateUrl: './career-transition-item.page.html',
  styleUrls: ['./career-transition-item.page.scss'],
})
export class CareerTransitionItemPage implements OnInit, OnDestroy {
  loadedCareerTransitionItem: CareerTransitionModel;
  careerTransitionSubscription: Subscription;
  showWhyItem = false;
  showWhatItem = false;
  showWhenItem = false;
  iconDirectory = '../../../../../assets/icon/';
  // ../../../../../

  constructor(
    private careerTransitionService: CareerTransitionService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('careerTransitionId')) {
        this.router.navigateByUrl('dashboard/tabs/career-transition');
        return;
      }

      this.careerTransitionSubscription = this.careerTransitionService
        .getCareerTransitionItem(paramMap.get('careerTransitionId')).subscribe(careerTransitionItem => {
          this.loadedCareerTransitionItem = careerTransitionItem;
      });
    });
  }

  showMoreContent() {
    // Why
    if(this.loadedCareerTransitionItem.title === 'Why') {
      this.showWhyItem = !this.showWhyItem;
    }
    // What
    if(this.loadedCareerTransitionItem.title === 'What') {
      this.showWhatItem = !this.showWhatItem;
    }
    // When
    if(this.loadedCareerTransitionItem.title === 'When') {
      this.showWhenItem = !this.showWhenItem;
    }
  }

  ngOnDestroy(): void {
    if (this.careerTransitionSubscription) {
      this.careerTransitionSubscription.unsubscribe();
    }
  }

}
