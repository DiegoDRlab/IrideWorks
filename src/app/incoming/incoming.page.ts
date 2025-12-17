import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, LoadingController, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Worksite } from '../models/worksite';
import { WorksiteService } from '../services/worksite.service';
import { WorksiteCardComponent } from '../components/worksite-card/worksite-card.component';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'incoming.page.html',
  styleUrls: ['incoming.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, WorksiteCardComponent, IonButtons, IonButton, IonIcon]
})
export class IncomingPage implements OnInit {

  public worksites: Worksite[] = [];
  public loading: any;

  constructor(private worksiteService: WorksiteService, private cdr: ChangeDetectorRef, private loadingCtrl: LoadingController) {

  }

  public ngOnInit(): void {
    addIcons({ chevronForwardOutline, refreshOutline });
    // this.worksiteService.getIncomingWorksite().subscribe(w=>{
    //   this.worksites = w;
    //   this.cdr.markForCheck();
    // })
  }

    async ionViewDidEnter() {
    await this.loadData();
  }

  async loadData(){
    await this.showLoading();
    this.worksiteService.getIncomingWorksite().subscribe(w => {
      this.worksites = w;
      this.hideLoading();
      this.cdr.markForCheck();
    })    
  }


  private loadingPromise: Promise<void> | null = null;
  async showLoading(message: string = 'Caricamento...') {
  if (this.loading) return;

  this.loading = await this.loadingCtrl.create({
    message,
    spinner: 'crescent',
    backdropDismiss: false
  });

  this.loadingPromise = this.loading.present();
  await this.loadingPromise;
}

async hideLoading() {
  if (!this.loading) return;

  // aspetta che il present sia completato
  if (this.loadingPromise) {
    await this.loadingPromise;
  }

  await this.loading.dismiss();
  this.loading = null;
  this.loadingPromise = null;
}
}
