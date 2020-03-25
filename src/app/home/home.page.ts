import {AfterViewInit, Component} from '@angular/core';
import {LoadingController, ModalController, Platform} from '@ionic/angular';
import { SubirPage} from '../pages/subir/subir.page';
import { Post} from '../models/post.model';
import { CargarPostsService} from '../services/cargar-posts.service';
import {Observable} from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {AutenticarService} from '../services/autenticar.service';
import {error} from 'util';
import {environment} from '../../environments/environment.prod';

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
    disScroll = false;

    constructor(private modalController: ModalController, private cargarPostsService: CargarPostsService,
                private loadingController: LoadingController, private socialSharing: SocialSharing,
                private autenticarService: AutenticarService) {
        this.lastpage = 0;
    }


    async mostrarModal() {
        const modal = await this.modalController.create({
            component: SubirPage
        });
        let mod = await modal.present();
        return await modal.onDidDismiss().finally(() => {
            console.log('cerro modal');
            this.homePosts = [];
            this.lastpage = 0;
            this.disScroll = false;
            this.cargaDePostInicio();
        });
    }

    ionViewWillEnter() {
        this.acceder().then( (resp: any) => {
            if (resp){this.cargaDePostInicio(); } else {console.log('No se pudo autenticar');}
            console.log('ionViewWillEnter');
        });
    }

    cargaDePost() {
        return new Promise((resolve, reject) => {
            this.cargarPostsService.cargar(this.lastpage).subscribe(
                respu => {
                    console.log(respu);
                    let resp: any = respu;
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
                    }, 200);
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
            respu => {
                console.log(respu);
                let resp: any = respu;
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
        setTimeout(() => {
            console.log('Done');
            // tslint:disable-next-line:triple-equals
            this.cargaDePost().then((hayMas) => {
                console.log(hayMas);
                if (!hayMas) {
                    // event.target.disabled = true;
                    this.disScroll = true;
                    console.log('Disabled del scroll');
                    return;
                }
                event.target.complete();
            });
        }, 2000);
    }

    compartirPost(p: any) {
        this.socialSharing.shareViaFacebook(
            'Te comparto una Imagen de Camigram: ' + p.titulo, p.img, p.img)
            .then(() => {
            })
            .catch();
    }

    async acceder() {
        // const loading = await this.loadingController.create({
        //     message: 'Iniciando Sesion'
        // });
        return new Promise((resolve, reject) => {
            this.autenticarService.iniciar().subscribe(respu => {
                console.log(respu);
                let resp: any = respu;
                setTimeout(() => {
                    console.log('Me autentique');
                    environment.token = resp.id_token;
                    console.log('token: ' + environment.token)
                    console.log('Guarde el token');
                    // loading.dismiss();
                    resolve(true);
                }, 2000);
            }, erro => {
                console.log('Error al iniciar sesion');
                console.log(error);
                setTimeout(() => {
                    // loading.dismiss();
                });
                resolve(false);
            });
        });
    }
}
