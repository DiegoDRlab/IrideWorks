import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Worksite } from '../models/worksite';
import { WorksiteService } from '../services/worksite.service';
import { WorksiteCardComponent } from '../components/worksite-card/worksite-card.component';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'incoming.page.html',
  styleUrls: ['incoming.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, WorksiteCardComponent]
})
export class IncomingPage implements OnInit{

  public worksites : Worksite[] = [];

  constructor(private worksiteService : WorksiteService, private cdr : ChangeDetectorRef) {
    
  }

  public ngOnInit(): void {
        addIcons({chevronForwardOutline});
    // this.worksiteService.getIncomingWorksite().subscribe(w=>{
    //   this.worksites = w;
    //   this.cdr.markForCheck();
    // })
  }

  ionViewWillEnter() {
    this.worksiteService.getIncomingWorksite().subscribe(w=>{
      this.worksites = w;
      this.cdr.markForCheck();
    })
}
}
