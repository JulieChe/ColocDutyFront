import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { TestComponent } from './test/test.component';
import { PublicColocComponent } from './public-coloc/public-coloc.component';


const routes: Routes = [
  {component: ConnexionComponent, path: 'connexion'},
  {component: TestComponent, path: 'test'},
  {component: InscriptionComponent, path: 'inscription'},
  {component: PublicColocComponent, path: 'public-coloc'},
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
