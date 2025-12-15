import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController  } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons, IonCard,
   IonCardHeader, IonCardContent, IonCardTitle, IonFooter, IonLabel, IonItem , IonIcon, IonList, IonCheckbox, IonChip} from '@ionic/angular/standalone';
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
  imports: [IonHeader, IonToolbar, IonTitle, IonFooter, IonChip, IonContent, IonButton, IonBackButton, IonButtons, IonCard,
    IonCardHeader, IonCardContent, IonCardTitle, IonLabel, IonItem, IonIcon, IonList, IonCheckbox, CommonModule, FormsModule
  ],
  providers:[ModalController],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export class WorksiteDetailsPage implements OnInit {
  
  public worksite!: Worksite;
  public toSave = false;

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private cdr : ChangeDetectorRef,
    private worksiteService : WorksiteService,
    private navCtrl: NavController,
    private toastCtrl: ToastController

  ) {}

ngOnInit() {
    addIcons({createOutline, addCircleOutline});
  const nav = this.router.getCurrentNavigation();
  if (nav?.extras?.state) {
    this.worksite = nav.extras.state['worksite'];
    this.toSave = false;
    this.cdr.markForCheck();
  }
}

getStatusColor(status: string): string {
  switch (status) {
    case 'In Corso':
      return 'primary';   // blu
    case 'In Arrivo':
      return 'tertiary';  // viola/azzurro chiaro
    case 'Completato':
      return 'success';   // verde
    default:
      return 'medium';    // grigio neutro
  }
}

get orderedActivities() {
  if (!this.worksite?.activities) {
    return [];
  }

  return [...this.worksite.activities].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );
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
  this.toSave = true;
  //this.worksiteService.updateWorksite(this.worksite);
  this.cdr.markForCheck();
}

saveChanges() {
  this.toSave = false;
  this.worksiteService.updateWorksite(this.worksite);
  this.navCtrl.back();
}

  async addActivity() {
  this.toSave = true;
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
            //this.worksiteService.updateWorksite(this.worksite);
            this.cdr.markForCheck();
          }
        }
      ]
    });

    await alert.present();
  }

  async editActivity(activity: Activity) {
  this.toSave = true;
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
            //this.worksiteService.updateWorksite(this.worksite);
          }
        }
      ]
    });

    await alert.present();
  }

 async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Conferma eliminazione',
      message: 'Sei sicuro di voler eliminare questo cantiere?',
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        { 
          text: 'Elimina', 
          handler: async () => {
            await this.worksiteService.deleteWorksite(this.worksite.id);

            // Mostra toast
            const toast = await this.toastCtrl.create({
              message: 'Cantiere eliminato con successo',
              duration: 2000,
              color: 'danger'
            });
            toast.present();

            // Torna indietro come farebbe il back button
            this.navCtrl.back();
          } 
        }
      ]
    });

    await alert.present();
  }
}
