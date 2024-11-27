import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ApiControllerService } from '../servicios/api-controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  isLoading: boolean = false;
  usuarios: any[] = [];

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private loadingController: LoadingController,
    private api: ApiControllerService
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    // Obtener usuarios desde el API y almacenarlos en el local storage
    this.api.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios)); // Guardar en localStorage
        console.log("Los usuarios son: ", this.usuarios);
      },
      (error) => {
        console.log("Error al obtener usuarios", error);
      }
    );
  }

  async ingresar() {
    const f = this.formularioLogin.value;
  
    // Busca el usuario en el array de usuarios obtenidos de la API
    const usuarioEncontrado = this.usuarios.find(usuario =>
      usuario.nombre === f.nombre && usuario.contrasena === f.password
    );
  
    if (usuarioEncontrado) {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        spinner: 'crescent',
        duration: 2000 
      });
  
      await loading.present();
  
      setTimeout(async () => {
        await loading.dismiss();
        localStorage.setItem('ingresado', 'true');
        localStorage.setItem('nombreUsuario', f.nombre);
        this.navCtrl.navigateRoot('inicio');
      }, 2000);
    } else {
      const alert = await this.alertController.create({
        message: 'Datos Incorrectos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
  
}
