import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LoginOublieComponent } from './login-oublie/login-oublie.component';
import { CompteComponent } from './compte/compte.component';

// Layout administrateur
import { AdminLayoutComponent } from './dashboard/admin-layout/admin-layout.component';

// Composants du dashboard
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdresseComponent } from './dashboard/adresse/adresse.component';
import { CategorieComponent } from './dashboard/categorie/categorie.component';
import { CommandeComponent } from './dashboard/commande/commande.component';
import { FruitComponent } from './dashboard/fruit/fruit.component';
import { GoutComponent } from './dashboard/gout/gout.component';
import { SauceComponent } from './dashboard/sauce/sauce.component';
import { TailleComponent } from './dashboard/taille/taille.component';
import { UserComponent } from './dashboard/user/user.component';
import { MoncompteComponent } from './dashboard/moncompte/moncompte.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'oublie', component: LoginOublieComponent },
  { path: 'compte', component: CompteComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,

    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'adresse', component: AdresseComponent },
      { path: 'categorie', component: CategorieComponent },
      { path: 'commande', component: CommandeComponent },
      { path: 'fruit', component: FruitComponent },
      { path: 'gout', component: GoutComponent },
      { path: 'sauce', component: SauceComponent },
      { path: 'taille', component: TailleComponent },
      { path: 'user', component: UserComponent },
      { path: 'moncompte', component: MoncompteComponent },
    ]
  }
];
