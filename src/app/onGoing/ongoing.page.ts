import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Worksite } from '../models/worksite';
import { WorksiteService } from '../services/worksite.service';
import { WorksiteCardComponent } from '../components/worksite-card/worksite-card.component';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ongoing',
  templateUrl: 'ongoing.page.html',
  styleUrls: ['ongoing.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, WorksiteCardComponent],
})
export class OngoingPage implements OnInit{

  public worksites : Worksite[] = [];

  constructor(private worksiteService : WorksiteService, private cdr : ChangeDetectorRef) {
    
  }

  public ngOnInit(): void {
      addIcons({chevronForwardOutline});
    // this.worksiteService.getOngoingWorksite().subscribe(w=>{
    //   this.worksites = w;
    //   this.cdr.markForCheck();
    // })
  }

  ionViewWillEnter() {
    this.worksiteService.getOngoingWorksite().subscribe(w=>{
      this.worksites = w;
      this.cdr.markForCheck();
    })
}
}
