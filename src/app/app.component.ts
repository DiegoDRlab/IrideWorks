import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements AfterViewInit, OnInit {

  @ViewChild(IonRouterOutlet) routerOutlet!: IonRouterOutlet;

  constructor(private platform: Platform,private authService: AuthService) {
    this.platform.ready().then(() => {
      document.body.classList.add('disable-swipe-back');
    });
  }

  ngOnInit() {
  this.authService.loginAnonymous();
}

  ngAfterViewInit() {
    if (this.routerOutlet) {
      console.log(this.routerOutlet, this.routerOutlet.swipeGesture);
      this.routerOutlet.swipeGesture = false;
      console.log(this.routerOutlet.swipeGesture);
    }
  }
}
