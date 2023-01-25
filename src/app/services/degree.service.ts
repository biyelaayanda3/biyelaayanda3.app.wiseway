/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Degrees, ProgrammeStructure } from '../modals/degrees.modal';

interface DegreeData {
  title: string;
  category: string;
  description: string;
  about: string;
  image: string;
  duration: string;
  saqa: string;
  nqf: string;
  credits: string;
  admissionRequirements: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  private databaseLocation = 'https://wiseway-349fb-default-rtdb.firebaseio.com/undergraduate/';

  private _degrees = new BehaviorSubject<Degrees[]>([]);

  constructor(private http: HttpClient) { }

  get degrees() {
    return this._degrees.asObservable();
  }

  fetchDegrees(type: string) {
    return this.http
      .get<{[key: string]: DegreeData}>(this.databaseLocation + type + '.json')
      .pipe(map(responseData => {
        const products =[];
        for(const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            products.push(
              new Degrees(
                key,
                responseData[key].title,
                responseData[key].category,
                responseData[key].description,
                responseData[key].about,
                responseData[key].image,
                responseData[key].duration,
                responseData[key].saqa,
                responseData[key].nqf,
                responseData[key].credits,
                responseData[key].admissionRequirements,
              ));
            }
          }
        return products;
      }), tap(products => {
        this._degrees.next(products);
      }));
  }

  getDegree(type: string, degreeId: string) {
    return this.http
      .get<DegreeData>(`https://wiseway-349fb-default-rtdb.firebaseio.com/undergraduate/${type}/${degreeId}.json`)
      .pipe(
        map(degreeData => new Degrees(
          degreeId,
          degreeData.title,
          degreeData.category,
          degreeData.description,
          degreeData.about,
          degreeData.image,
          degreeData.duration,
          degreeData.saqa,
          degreeData.nqf,
          degreeData.credits,
          degreeData.admissionRequirements,
        ))
      );
  }

  addDegree(degreeInfo: Degrees) {
    let generatedId: string;
    const newDegreeInformation = degreeInfo;

    return this.http
      .post<{name: string}>(this.databaseLocation, {... newDegreeInformation , id: null})
      .pipe(
        switchMap(responseData => {
          generatedId = responseData.name;
          return this.degrees;
        }),
        take(1),
        tap(degrees => {
          newDegreeInformation .id = generatedId;
          this._degrees.next(degrees.concat(newDegreeInformation ));
        })
      );
  }
}
