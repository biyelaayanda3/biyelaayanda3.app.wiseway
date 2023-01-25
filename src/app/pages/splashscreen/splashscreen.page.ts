import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor(private router: Router) {
    this.navigate();
  }

  ngOnInit() {
  }

  async navigate() {
    await this.delay(3000);
    this.router.navigateByUrl('/landing');
  }

  delay(ms: number): Promise<any> {
    const observable = of();
    return observable.pipe(delay(ms)).toPromise();
  }

}
