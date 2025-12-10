import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, 
  IonSelect, IonSelectOption, IonButton, IonList, IonInput, IonTextarea, IonDatetime, IonThumbnail, IonToast } from '@ionic/angular/standalone';
import { Worksite, WorkstiteStatus } from '../models/worksite';
import { WorksiteService } from '../services/worksite.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonLabel, IonItem, IonSelect,IonSelectOption,IonButton,IonList, IonInput, IonTextarea, IonDatetime, IonThumbnail, IonToast]
})
export class AddPage implements OnInit {

  public worksite: Worksite = new Worksite();
  public statuses = Object.values(WorkstiteStatus);
  public isToastOpen = false;

  constructor(private worksiteService : WorksiteService, private cdr : ChangeDetectorRef) { }

  ngOnInit() {
  }

  save() {    
    this.worksite.startDate = this.worksite.startDate
    ? new Date(this.worksite.startDate)
    : undefined;
    this.worksite.completedDate = this.worksite.completedDate
    ? new Date(this.worksite.completedDate)
    : undefined;
    this.worksiteService.addWorksite(this.worksite);
    this.isToastOpen= true;
    this.worksite = new Worksite();
    this.cdr.markForCheck();
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  
  onImageSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.worksite.imageBase64 = reader.result as string;
  };
  reader.readAsDataURL(file);
}

}
