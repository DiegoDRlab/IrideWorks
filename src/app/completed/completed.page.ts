import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, LoadingController, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { WorksiteService } from '../services/worksite.service';
import { Worksite } from '../models/worksite';
import { WorksiteCardComponent } from '../components/worksite-card/worksite-card.component';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'completed.page.html',
  styleUrls: ['completed.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, WorksiteCardComponent, IonButtons, IonButton, IonIcon],
})

export class CompletedPage implements OnInit {

  public worksites: Worksite[] = [];
  public loading: any;

  constructor(private worksiteService: WorksiteService, private cdr: ChangeDetectorRef, private loadingCtrl: LoadingController) {

  }

  public ngOnInit(): void {
    addIcons({ chevronForwardOutline, refreshOutline });
    // this.worksiteService.getCompletedWorksite().subscribe(w=>{
    //   this.worksites = w;
    //   this.cdr.markForCheck();
    // })
  }

  async ionViewDidEnter() {
    await this.loadData();
  }

  async loadData(){
    await this.showLoading();
    this.worksiteService.getCompletedWorksite().subscribe(w => {
      this.worksites = w;
      this.hideLoading();
      this.cdr.markForCheck();
    })    
  }


  async showLoading(message: string = 'Caricamento...') {
    // evita di crearne più di uno
    if (this.loading) {
      return;
    }

    this.loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      backdropDismiss: false
    });

    await this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
