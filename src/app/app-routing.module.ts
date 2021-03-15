import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfilComponent } from './profil/profil.component';
import { TestComponent } from './test/test.component';
import { CreationColocComponent } from './creation-coloc/creation-coloc.component';




const routes: Routes = [
  {component: ConnexionComponent, path: 'connexion'},
  {component: TestComponent, path: 'test'},
  {component: InscriptionComponent, path: 'inscription'},
  {component: CreationColocComponent, path: 'creationColoc'},
  
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},
  {component: ConnexionComponent, path: 'connexion'},
  {component: ProfilComponent, path: 'profil'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
