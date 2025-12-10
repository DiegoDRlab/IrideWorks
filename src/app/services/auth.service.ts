import { Auth, signInAnonymously } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  loginAnonymous(): Promise<void> {
    return signInAnonymously(this.auth)
      .then(userCredential => {
        console.log('Utente anonimo loggato:', userCredential.user?.uid);
      })
      .catch(err => console.error('Errore login anonimo:', err));
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}