import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, Platform, ToastController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { SubirPostService} from '../../service/subir-post.service';
@Component({
  selector: 'app-subir',
  templateUrl: './subir.page.html',
  styleUrls: ['./subir.page.scss'],
})
export class SubirPage implements OnInit {
  titulo: string;
  imgPreview: string;
  imgBase: string;
  device: string;
  imgWeb: string = null;

  cameraOptions: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private modalController: ModalController, private camera: Camera,
              private imagePicker: ImagePicker, private platform: Platform,
              private subirPostService: SubirPostService, private toastController: ToastController,
              private loadingController: LoadingController) {
    this.imgPreview = null;
    this.imgBase = null;
    this.titulo = '';
  }

  ngOnInit() {
    if (!this.platform.is('cordova')) {
      // tslint:disable-next-line:max-line-length
      this.imgPreview = null;
      this.device = 'web';
    } else {
        this.device = 'mobile';
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  abrirCamara() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI

      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgPreview = base64Image;
      this.imgBase = imageData;
    }, (err) => {

      console.log(err);
      // Handle error
    });
  }

  abrirGaleria() {
    const options: ImagePickerOptions = {
      quality: 40,
      outputType: 1,
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.imgPreview = 'data:image/jpeg;base64,' + results[i];
        this.imgBase = results[i];
      }
    }, (err) => { });
  }

  async subirPost() {
    const loading =  await this.loadingController.create({
      message: 'Subiendo Post'
    });
    loading.present();
    this.subirPostService.cargar(this.titulo, this.imgBase).subscribe(
        resp => {
          console.log(resp);
          setTimeout(() => {
            console.log('SUBIO el post');
            // this.presentAlertSucces(resp);
            loading.dismiss();
            this.presentToast('Imagen subida!');
            this.cerrarModal();
          }, 2000);
        },
        (erro) => {
          console.log('Error al cargar el post');
          console.log(erro);
          setTimeout(() => {
             loading.dismiss();
            // this.presentAlertFailed(erro);
             this.presentToast(erro);
             this.cerrarModal();
          }, 2000);
        },
    );
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();
    console.log(mensaje);
  }
}
