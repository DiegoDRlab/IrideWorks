import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements AfterViewInit {

  @ViewChild(IonRouterOutlet) routerOutlet!: IonRouterOutlet;

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      document.body.classList.add('disable-swipe-back');
    });
  }

  ngAfterViewInit() {
    if (this.routerOutlet) {
      console.log(this.routerOutlet, this.routerOutlet.swipeGesture);
      this.routerOutlet.swipeGesture = false;
      console.log(this.routerOutlet.swipeGesture);
    }
  }
}
