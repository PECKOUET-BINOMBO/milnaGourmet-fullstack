import { Injectable, inject } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  UserCredential,
  User,
  signOut,
  deleteUser,
  updatePassword as firebaseUpdatePassword,
  fetchSignInMethodsForEmail,
  updateEmail as firebaseUpdateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "@angular/fire/auth";

import { Firestore, doc, setDoc, getDoc, updateDoc, deleteDoc} from "@angular/fire/firestore";
import { from, Observable, of, throwError, switchMap, map, catchError } from "rxjs";
import { UserInterface } from './user.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  register(user: UserInterface): Observable<void> {
    return from(createUserWithEmailAndPassword(this.firebaseAuth, user.email, user.password)).pipe(
      switchMap((userCredential) =>
        from(updateProfile(userCredential.user, { displayName: user.name })).pipe(
          map(() => userCredential.user)
        )
      ),
      switchMap((firebaseUser) => this.saveUserToFirestore(firebaseUser.uid, user)),
      catchError((error) => {
        console.error('Error in registration process:', error);
        throw error;
      })
    );
  }

  private saveUserToFirestore(uid: string, user: UserInterface): Observable<void> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    const userData = {
      name: user.name,
      email: user.email,
      tel: user.tel,
      adresse: user.adresse,
    };
    return from(setDoc(userDoc, userData)).pipe(
      catchError((error) => {
        console.error('Error saving user to Firestore:', error);
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password)).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        throw error;
      })
    );
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((subscriber) => {
      const unsubscribe = this.firebaseAuth.onAuthStateChanged(
        (user) => subscriber.next(user),
        (error) => {
          console.error('Error in auth state change:', error);
          subscriber.error(error);
        }
      );
      return unsubscribe;
    });
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth)).pipe(
      tap(() => {
        localStorage.removeItem('user');
      }),
      catchError((error) => {
        console.error('Error during logout:', error);
        throw error;
      })
    );
  }

  getUserData(uid: string): Observable<UserInterface> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userDoc)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return docSnapshot.data() as UserInterface;
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => {
        console.error('Error fetching user data:', error);
        throw error;
      })
    );
  }

  updateUser(user: Partial<UserInterface>, currentPassword?: string): Observable<void> {
    return this.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          return throwError(() => new Error('No authenticated user'));
        }
        const userDoc = doc(this.firestore, `users/${currentUser.uid}`);
        const updatePromises: Promise<any>[] = [updateDoc(userDoc, user)];

        if (user.name && user.name !== currentUser.displayName) {
          updatePromises.push(updateProfile(currentUser, { displayName: user.name }));
        }

        if (user.email && user.email !== currentUser.email) {
          if (!currentPassword) {
            return throwError(() => new Error('Current password required to change email'));
          }
          if (!currentUser.email) {
            return throwError(() => new Error('Current user email is not defined'));
          }
          const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
          return from(reauthenticateWithCredential(currentUser, credential)).pipe(
            switchMap(() => {
              // Ici, nous savons que user.email est défini grâce à la vérification précédente
              return firebaseUpdateEmail(currentUser, user.email as string);
            }),
            switchMap(() => Promise.all(updatePromises))
          );
        }

        return from(Promise.all(updatePromises));
      }),
      map(() => undefined),
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => error);
      })
    );
  }

  updatePassword(newPassword: string): Observable<void> {
    return this.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          return throwError(() => new Error('No authenticated user'));
        }
        return from(firebaseUpdatePassword(currentUser, newPassword));
      }),
      catchError(error => {
        console.error('Error updating password:', error);
        return throwError(() => error);
      })
    );
  }

  isEmailAvailable(email: string): Observable<boolean> {
    return from(fetchSignInMethodsForEmail(this.firebaseAuth, email)).pipe(
      map(methods => methods.length === 0),
      catchError(error => {
        console.error('Error checking email availability:', error);
        return throwError(() => error);
      })
    );
  }

  deleteAccount(): Observable<void> {
    return this.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          throw new Error('No authenticated user');
        }
        const userDoc = doc(this.firestore, `users/${currentUser.uid}`);
        return from(deleteDoc(userDoc)).pipe(
          switchMap(() => from(deleteUser(currentUser)))
        );
      }),
      catchError(error => {
        console.error('Error deleting account:', error);
        throw error;
      })
    );
  }
}
