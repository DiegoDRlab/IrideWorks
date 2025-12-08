import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { WorksiteService } from '../services/worksite.service';
import { Worksite } from '../models/worksite';
import { WorksiteCardComponent } from '../components/worksite-card/worksite-card.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'completed.page.html',
  styleUrls: ['completed.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, WorksiteCardComponent],
})

export class CompletedPage implements OnInit{

  public worksites : Worksite[] = [];

  constructor(private worksiteService : WorksiteService, private cdr : ChangeDetectorRef) {

  }

  public ngOnInit(): void {
    // this.worksiteService.getCompletedWorksite().subscribe(w=>{
    //   this.worksites = w;
    //   this.cdr.markForCheck();
    // })
  }

  ionViewWillEnter(){
    this.worksiteService.getCompletedWorksite().subscribe(w=>{
      this.worksites = w;
      this.cdr.markForCheck();
    })
  }
}
