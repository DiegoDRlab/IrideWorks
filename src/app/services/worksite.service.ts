import { Injectable } from '@angular/core';
import { Database, ref, set, push, onValue, update, remove } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Worksite, WorkstiteStatus } from '../models/worksite';

@Injectable({
  providedIn: 'root'
})
export class WorksiteService {

  private basePath = 'worksites';

  constructor(private db: Database) {}

  /** 🔹 Converte dati Firebase in Worksite */
  private mapFirebaseToWorksite(key: string, data: any): Worksite {
    return {
      id: key,
      name: data.name,
      descriription: data.descriription,
      customer: data.customer,
      address: data.address,
      city: data.city,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      completedDate: data.completedDate ? new Date(data.completedDate) : undefined,
      workstiteStatus: data.workstiteStatus,
      manager: data.manager,
      notes: data.notes,
      imageBase64: data.imageBase64,
      activities: data.activities ? data.activities : []
    };
  }

  /** 🔹 Ottieni tutti i cantieri (realtime) */
  public getWorksite(): Observable<Worksite[]> {
    const worksitesRef = ref(this.db, this.basePath);

    return new Observable(sub => {
      onValue(worksitesRef, snapshot => {
        const data = snapshot.val();
        const list: Worksite[] = data
          ? Object.keys(data).map(key => this.mapFirebaseToWorksite(key, data[key]))
          : [];
        sub.next(list);
      });
    });
  }

  /** 🔹 Filtri per status */
  public getOngoingWorksite(): Observable<Worksite[]> {
    return this.getWorksite().pipe(
      map(list => list.filter(w => w.workstiteStatus === WorkstiteStatus.Ongoing))
    );
  }

  public getIncomingWorksite(): Observable<Worksite[]> {
    return this.getWorksite().pipe(
      map(list => list.filter(w => w.workstiteStatus === WorkstiteStatus.Incoming))
    );
  }

  public getCompletedWorksite(): Observable<Worksite[]> {
    return this.getWorksite().pipe(
      map(list => list.filter(w => w.workstiteStatus === WorkstiteStatus.Completed))
    );
  }

  /** 🔹 Aggiungi nuovo worksite */
  public addWorksite(worksite: Worksite): Promise<void> {
    const listRef = ref(this.db, this.basePath);
    const newRef = push(listRef);

    // assegna id generato da Firebase
    worksite.id = newRef.key!;

    return set(newRef, {
      ...worksite,
      startDate: worksite.startDate ? new Date(worksite.startDate).toISOString() : null,
      completedDate: worksite.completedDate ? new Date(worksite.completedDate).toISOString() : null
    });
  }

  /** 🔹 Aggiorna worksite esistente */
  public updateWorksite(worksite: Worksite): Promise<void> {
    if (!worksite.id) {
      console.warn('Worksite senza ID non può essere aggiornato');
      return Promise.resolve();
    }

    const worksiteRef = ref(this.db, `${this.basePath}/${worksite.id}`);

    return update(worksiteRef, {
      ...worksite,
      startDate: worksite.startDate ? new Date(worksite.startDate).toISOString() : null,
      completedDate: worksite.completedDate ? new Date(worksite.completedDate).toISOString() : null
    });
  }

  /** 🔹 Elimina worksite */
  public deleteWorksite(id: string): Promise<void> {
    const worksiteRef = ref(this.db, `${this.basePath}/${id}`);
    return remove(worksiteRef);
  }
}
