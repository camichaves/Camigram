import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {SubirPage} from '../pages/subir/subir.page';
import {SubirPageModule} from '../pages/subir/subir.module';
// tENGO QUE IMPORTAR DE ALGUNA MANERA EL PIPE

@NgModule({
  entryComponents: [ SubirPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      SubirPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
