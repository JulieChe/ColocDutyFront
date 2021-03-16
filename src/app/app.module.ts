import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { TestComponent } from './test/test.component';
import { AccueilSansColocComponent } from './accueil-sans-coloc/accueil-sans-coloc.component';
import { CreationColocComponent } from './creation-coloc/creation-coloc.component';
import { ProfilComponent } from './profil/profil.component';
import { ExplorationComponent } from './exploration/exploration.component';
import { PublicColocComponent } from './public-coloc/public-coloc.component';
import { MaColocComponent } from './ma-coloc/ma-coloc.component';
import { ViewGraphComponent } from './view-graph/view-graph.component';
import { MurComponent } from './mur/mur.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    TestComponent,
    AccueilSansColocComponent,
    ProfilComponent,
    ExplorationComponent,
    CreationColocComponent,
    ProfilComponent,
    PublicColocComponent,
    MaColocComponent,
    ViewGraphComponent,
    MurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
