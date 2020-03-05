import {AfterViewInit, Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { SubirPage} from '../pages/subir/subir.page';
import { Post} from '../models/post.model';
import { CargarPostsService} from '../services/cargar-posts.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

    // tslint:disable-next-line:ban-types
    homePosts: Post[] = [];
    constructor( private modalController: ModalController, private cargarPostsService: CargarPostsService) {}

    async mostrarModal() {
        const modal = await this.modalController.create({
            component: SubirPage
        });
        return await modal.present();
    }

    ngAfterViewInit(): void {
        this.cargarPostsService.cargar().subscribe(
            resp => {
                console.log(resp);
                setTimeout(() => {
                    // loading.dismiss();
                    console.log('Recibi los post');
                    this.homePosts = resp;
                    // this.presentAlertSucces(resp);
                }, 2000);
            },
            (erro) => {
                console.log('Error al cargar los post');
                console.log(erro.toString());
                setTimeout(() => {
                    // loading.dismiss();
                    // this.presentAlertFailed(erro);
                }, 2000);
            }
        );

    }
}
