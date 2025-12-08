import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Worksite } from 'src/app/models/worksite';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { arrowForwardOutline, chevronForwardOutline, addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-worksite-card',
  templateUrl: './worksite-card.component.html',
  styleUrls: ['./worksite-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonButton, IonIcon],
  standalone: true
})

export class WorksiteCardComponent  implements OnInit {

  @Input()
  public worksite : Worksite | undefined;

  public expanded = false;

  constructor(private router : Router, private cdr : ChangeDetectorRef) { }

  ngOnInit() {
    addIcons({arrowForwardOutline,chevronForwardOutline, addCircleOutline});
  }

public goToDetailPage(worksite: Worksite) {
  this.cdr.markForCheck();
  this.router.navigate(
    ['worksite-details'],
    { state: { worksite } }
  );
  this.cdr.markForCheck();
}
}
