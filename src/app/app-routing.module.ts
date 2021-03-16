import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilSansColocComponent } from './accueil-sans-coloc/accueil-sans-coloc.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfilComponent } from './profil/profil.component';
import { TestComponent } from './test/test.component';
import { CreationColocComponent } from './creation-coloc/creation-coloc.component';
import { PublicColocComponent } from './public-coloc/public-coloc.component';
import {ExplorationComponent} from './exploration/exploration.component';
import { MaColocComponent } from './ma-coloc/ma-coloc.component';
import { CreationTacheComponent } from './creation-tache/creation-tache.component';


const routes: Routes = [
  {component: ConnexionComponent, path: 'connexion'},
  {component: TestComponent, path: 'test'},
  {component: InscriptionComponent, path: 'inscription'},
  {component: AccueilSansColocComponent, path: 'accueilSansColoc'},
  {component: CreationColocComponent, path: 'creationColoc'},
  {component: PublicColocComponent, path: 'public-coloc'},
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},
  {component: ConnexionComponent, path: 'connexion'},
  {component: ProfilComponent, path: 'profil'},
  {component: ExplorationComponent, path :'exploration'},
  {component: MaColocComponent, path : 'macoloc'},
  {component: CreationTacheComponent, path : 'creationTache'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
