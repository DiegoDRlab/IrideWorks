import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Database,
  ref,
  set,
  push,
  update,
  remove,
  get
} from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Worksite, WorkstiteStatus } from '../models/worksite';

@Injectable({
  providedIn: 'root'
})
export class WorksiteService {

  private basePath = 'worksites';

  constructor(
    private db: Database,
    private injector: EnvironmentInjector
  ) {}

  /* ============================
     🔹 MAPPER
     ============================ */

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
      activities: data.activities ?? []
    };
  }

  /* ============================
     🔹 READ (ONE SHOT)
     ============================ */

  /** Tutti i cantieri (NO realtime) */
  public getWorksite(): Observable<Worksite[]> {
    return runInInjectionContext(this.injector, () => {
      const worksitesRef = ref(this.db, this.basePath);

      return from(get(worksitesRef)).pipe(
        map(snapshot => {
          const data = snapshot.val();
          return data
            ? Object.keys(data).map(key =>
                this.mapFirebaseToWorksite(key, data[key])
              )
            : [];
        })
      );
    });
  }

  /** Cantieri in arrivo */
  public getIncomingWorksite(): Observable<Worksite[]> {
    return this.getWorksite().pipe(
      map(list => list.filter(w => w.workstiteStatus === WorkstiteStatus.Incoming))
    );
  }

  /** Cantieri in corso */
  public getOngoingWorksite(): Observable<Worksite[]> {
    return this.getWorksite().pipe(
      map(list => list.filter(w => w.workstiteStatus === WorkstiteStatus.Ongoing))
    );
  }

  /** Cantieri completati */
  public getCompletedWorksite(): Observable<Worksite[]> {
    return this.getWorksite().pipe(
      map(list => list.filter(w => w.workstiteStatus === WorkstiteStatus.Completed))
    );
  }

  /* ============================
     🔹 WRITE
     ============================ */

  /** Aggiungi nuovo worksite */
  public addWorksite(worksite: Worksite): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const listRef = ref(this.db, this.basePath);
      const newRef = push(listRef);

      worksite.id = newRef.key!;

      return set(newRef, {
        ...worksite,
        startDate: worksite.startDate
          ? worksite.startDate.toISOString()
          : null,
        completedDate: worksite.completedDate
          ? worksite.completedDate.toISOString()
          : null
      });
    });
  }

  /** Aggiorna worksite */
  public updateWorksite(worksite: Worksite): Promise<void> {
    if (!worksite.id) {
      console.warn('Worksite senza ID');
      return Promise.resolve();
    }

    return runInInjectionContext(this.injector, () => {
      const worksiteRef = ref(this.db, `${this.basePath}/${worksite.id}`);

      return update(worksiteRef, {
        ...worksite,
        startDate: worksite.startDate
          ? worksite.startDate.toISOString()
          : null,
        completedDate: worksite.completedDate
          ? worksite.completedDate.toISOString()
          : null
      });
    });
  }

  /** Elimina worksite */
  public deleteWorksite(id: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const worksiteRef = ref(this.db, `${this.basePath}/${id}`);
      return remove(worksiteRef);
    });
  }
}
