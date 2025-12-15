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

  save(file : any) {  
  file.value = '';  
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
    const img = new Image();
    img.onload = () => {
      const MAX_WIDTH = 800;  // larghezza massima
      const MAX_HEIGHT = 600; // altezza massima
      let width = img.width;
      let height = img.height;

      // Mantieni proporzioni
      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.floor((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.floor((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      // Disegna su canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Estrai Base64 compressa (puoi impostare qualità da 0 a 1 per JPEG)
        this.worksite.imageBase64 = canvas.toDataURL('image/jpeg', 0.7);
      }
    };
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
}

}
