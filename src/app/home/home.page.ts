import {AfterViewInit, Component} from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import { SubirPage} from '../pages/subir/subir.page';
import { Post} from '../models/post.model';
import { CargarPostsService} from '../services/cargar-posts.service';
import {Observable} from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    // tslint:disable-next-line:ban-types
    homePosts: any[] = [];
    lastpage: number;
    numPostCargados = 0;
    constructor( private modalController: ModalController, private cargarPostsService: CargarPostsService,
                 private loadingController: LoadingController, private socialSharing: SocialSharing) {
        this.lastpage = 0;
    }

    async mostrarModal() {
        const modal = await this.modalController.create({
            component: SubirPage
        });
        let mod = await modal.present();
        return  await modal.onDidDismiss().finally(() => {
            this.cargaDePost();
        });
    }

    ionViewWillEnter() {
        this.cargaDePostInicio();
        console.log('ionViewWillEnter');
    }

        cargaDePost() {
        return new Promise((resolve, reject) =>{
            this.cargarPostsService.cargar(this.lastpage).subscribe(
                resp => {
                    console.log(resp);
                    setTimeout(() => {
                        console.log('Recibi los post');
                        console.log('Resp.lenght: ' + resp.length)
                        if (resp.length > 0) {
                            for (var i = 0; i < resp.length; i++) {
                                this.homePosts.push(resp[i]);
                            }
                            this.lastpage++;
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                        }, 200 );
                }
            );
        });
    }

        async cargaDePostInicio() {
            const loading = await this.loadingController.create({
                message: 'Cargando Posts'
            });
            loading.present();
            this.cargarPostsService.cargar(this.lastpage).subscribe(
                resp => {
                    console.log(resp);
                    setTimeout(() => {
                        console.log('Recibi los post');
                        console.log('Resp.lenght: ' + resp.length);
                        if (resp.length > 0) {
                            for (var i = 0; i < resp.length; i++) {
                                this.homePosts.push(resp[i]);
                            }
                            this.lastpage++;
                        } else {
                            this.lastpage = -2;
                        }
                        loading.dismiss();
                    }, 2000);
                },
                (erro) => {
                    console.log('Error al cargar los post');
                    console.log(erro);
                    setTimeout(() => {
                        loading.dismiss();
                        // this.presentAlertFailed(erro);
                    }, 2000);
                }
            );
        }

    loadData(event) {
        setTimeout( () => {
            console.log('Done');
            // tslint:disable-next-line:triple-equals
            this.cargaDePost().then((hayMas) => {
                console.log(hayMas);
                if (!hayMas){
                    event.target.disabled = true;
                    console.log('Disabled del scroll');
                    return;
                }
                event.target.complete();
            });
        }, 2000 );
    }

    compartirPost(p: any) {
        this.socialSharing.shareViaFacebook(
            'Te comparto una Imagen de Camigram: ' + p.titulo , p.img, p.img)
            .then(() => {})
            .catch();
    }
}
