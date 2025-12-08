import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons, IonCard,
   IonCardHeader, IonCardContent, IonCardTitle, IonLabel, IonItem , IonIcon, IonList, IonCheckbox} from '@ionic/angular/standalone';
import { Activity, Worksite, WorkstiteStatus } from '../models/worksite';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { createOutline, addCircleOutline } from 'ionicons/icons';
import { WorksiteService } from '../services/worksite.service';

@Component({
  selector: 'app-worksite-details',
  templateUrl: './worksite-details.page.html',
  styleUrls: ['./worksite-details.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons, IonCard,
    IonCardHeader, IonCardContent, IonCardTitle, IonLabel, IonItem, IonIcon, IonList, IonCheckbox, CommonModule, FormsModule
  ],
  providers:[ModalController],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export class WorksiteDetailsPage implements OnInit {
  
  public worksite!: Worksite;

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private cdr : ChangeDetectorRef,
    private worksiteService : WorksiteService
  ) {}

ngOnInit() {
    addIcons({createOutline, addCircleOutline});
  const nav = this.router.getCurrentNavigation();
  if (nav?.extras?.state) {
    this.worksite = nav.extras.state['worksite'];
    this.cdr.markForCheck();
  }
}

changeWorksiteStatus() {
  if (!this.worksite) return;
  switch(this.worksite.workstiteStatus) {
    case WorkstiteStatus.Incoming:
      this.worksite.workstiteStatus = WorkstiteStatus.Ongoing;
      break;
    case WorkstiteStatus.Ongoing:
      this.worksite.workstiteStatus = WorkstiteStatus.Completed;
      break;
    default:
      this.worksite.workstiteStatus = WorkstiteStatus.Incoming;
  }
  this.cdr.markForCheck();
}

  async addActivity() {
    const alert = await this.alertCtrl.create({
      header: 'Nuova Attività',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nome attività' },
        { name: 'description', type: 'textarea', placeholder: 'Descrizione' },
      ],
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        {
          text: 'Aggiungi',
          handler: (res) => {
            const newAct = new Activity();
            newAct.name = res.name;
            newAct.description = res.description;
            newAct.startDate = new Date();
            newAct.endDate = new Date();
            (newAct as any).completed = false;

            this.worksite.activities.push(newAct);
            this.worksiteService.updateWorksite(this.worksite);
            this.cdr.markForCheck();
          }
        }
      ]
    });

    await alert.present();
  }

  async editActivity(activity: Activity) {
    const alert = await this.alertCtrl.create({
      header: 'Modifica Attività',
      inputs: [
        { name: 'name', type: 'text', value: activity.name },
        { name: 'description', type: 'textarea', value: activity.description },
      ],
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        {
          text: 'Salva',
          handler: (res) => {
            activity.name = res.name;
            activity.description = res.description;
            this.worksiteService.updateWorksite(this.worksite);
          }
        }
      ]
    });

    await alert.present();
  }
}
