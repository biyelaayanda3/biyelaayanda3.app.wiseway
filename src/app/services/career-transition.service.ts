/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CareerTransitionModel } from '../modals/career-transition.modal';

interface CareerTransitionData {
  title: string;
  subTitle: string;
  description: string;
  image: string;
  proTip1: string;
  keepMind: string;
  proTip2: string;
}

@Injectable({
  providedIn: 'root'
})
export class CareerTransitionService {
  private databaseLocation = 'https://wiseway-349fb-default-rtdb.firebaseio.com/career-transition.json';
  private _careerTransition = new BehaviorSubject<CareerTransitionModel[]>([]);

  constructor(private http: HttpClient) { }

  get careerTransition() {
    return this._careerTransition.asObservable();
  }

  fetchCareerTransitionItems() {
    return this.http
      .get<{[key: string]: CareerTransitionData}>(this.databaseLocation)
      .pipe(map(responseData => {
        const careerTransition =[];
        for(const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            careerTransition.push(
              new CareerTransitionModel(
                key,
                responseData[key].title,
                responseData[key].subTitle,
                responseData[key].description,
                responseData[key].image,
                responseData[key].proTip1,
                responseData[key].keepMind,
                responseData[key].proTip2,
              ));
            }
          }
        return careerTransition;
      }), tap(careerTransition => {
        this._careerTransition.next(careerTransition);
    }));
  }

  getCareerTransitionItem(careerTransitionId: string) {
    return this.http
      .get<CareerTransitionData>(`https://wiseway-349fb-default-rtdb.firebaseio.com/career-transition/${careerTransitionId}.json`)
      .pipe(
        map(careerTransitionData => new CareerTransitionModel(
          careerTransitionId,
          careerTransitionData.title,
          careerTransitionData.subTitle,
          careerTransitionData.description,
          careerTransitionData.image,
          careerTransitionData.proTip1,
          careerTransitionData.keepMind,
          careerTransitionData.proTip2
        )
      )
    );
  }

  addCareerTransition(careerTransition: CareerTransitionModel) {
    let generatedId: string;
    const newCareerTransition = careerTransition;

    return this.http
      .post<{name: string}>(this.databaseLocation, {... newCareerTransition, id: null})
      .pipe(
        switchMap(responseData => {
          generatedId = responseData.name;
          return this.careerTransition;
        }),
        take(1),
        tap(careerTransitionData => {
          newCareerTransition.id = generatedId;
          this._careerTransition.next(careerTransitionData.concat(newCareerTransition));
        })
      );
  }
}
