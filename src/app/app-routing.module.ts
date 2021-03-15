import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
<<<<<<< HEAD
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {component: ConnexionComponent, path: 'connexion'},
  {component: TestComponent, path: 'test'}
  
=======
import { InscriptionComponent } from './inscription/inscription.component';

const routes: Routes = [
  {component: ConnexionComponent, path: 'connexion'},
  {component: InscriptionComponent, path: 'inscription'}
>>>>>>> 5a09c6f39d13ce0d88b22cf27840fbd6f4237732
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
