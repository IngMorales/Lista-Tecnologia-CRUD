import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-add-technology',
  templateUrl: 'add-technology.html'
})
export class AddTechnologyPage {

   public form                   : FormGroup;
   public Nombre         : any;
   public Whatsapp         : any;
   public Municipio         : any;
   public Ocupacion         : any;
   public RedSocial         : any;
   public Lider         : any;
   public Voluntario         : any;
   //public technologyName         : any;
   //public technologyDescription  : any;
   public isEdited               : boolean = false;
   public hideForm               : boolean = false;
   public pageTitle              : string;
   public recordID               : any      = null;
   private baseURI               : string  = "https://ionic.asesoriaseducate.com/";




   // Initialise module classes
   constructor(public navCtrl    : NavController,
               public http       : HttpClient,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "nombre"                  : ["", Validators.required],
         "whatsapp"                  : ["", Validators.required],
         "municipio"                  : ["", Validators.required],
         "ocupacion"                  : ["", Validators.required],
         "redsocial"                  : ["", Validators.required],
         "lider"                  : ["", Validators.required],
         "voluntario"                  : ["", Validators.required],
         //"nombre"                  : ["", Validators.required],
         //"descripcion"           : ["", Validators.required]
      });
   }

   ionViewWillEnter() : void
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Modificar';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Crear';
      }
   }

   selectEntry(item : any) : void
   {
      this.Nombre        = item.nombre;
      this.Whatsapp        = item.whatsapp;
      this.Municipio        = item.municipio;
      this.Ocupacion        = item.ocupacion;
      this.RedSocial        = item.redsocial;
      this.Lider        = item.lider;
      this.Voluntario        = item.voluntario;
      //this.technologyName        = item.nombre;
      //this.technologyDescription = item.descripcion;
      this.recordID              = item.id;
   }

   createEntry( nombre: string, whatsapp : number, municipio : number, ocupacion: string, redsocial:number, lider:number, voluntario:number/*nombre : string, descripcion : string*/) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "nombre" : nombre, "whatsapp" : whatsapp, "municipio" : municipio, "ocupacion" : ocupacion, "redsocial" : redsocial, "lider" : lider, "voluntario" : voluntario /*"nombre" : nombre, "descripcion" : descripcion*/ },
          url       : any      	= this.baseURI + "manage-data.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`La persona: ${nombre} fue agregada`);
      },
      (error : any) =>
      {
         this.sendNotification('Algo salio mal al insertar!');
      });
   }

   updateEntry(nombre: string, whatsapp : number, municipio : number, ocupacion: string, redsocial:number, lider:number, voluntario:number/*nombre : string, descripcion : string*/) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "update", "nombre" : nombre, "whatsapp" : whatsapp, "municipio" : municipio, "ocupacion" : ocupacion, "redsocial" : redsocial, "lider" : lider, "voluntario" : voluntario, /*"nombre" : nombre, "descripcion" : descripcion*/ "recordID" : this.recordID},
          url       : any      	= this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         this.hideForm  =  true;
         this.sendNotification(`La persona: ${nombre} fue actualizada`);
      },
      (error : any) =>
      {
         this.sendNotification('Algo salio mal al actualizar!');
      });
   }

   deleteEntry() : void
   {
      let nombre      : string 	= this.form.controls["nombre"].value,
          headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "delete", "recordID" : this.recordID},
          url       : any      	= this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         this.hideForm     = true;
         this.sendNotification(`La persona : ${nombre} fue eliminada`);
      },
      (error : any) =>
      {
         this.sendNotification('Algo salio mal al eliminar!');
      });
   }

   saveEntry() : void
   {
     /* let nombre          : string = this.form.controls["nombre"].value,
          descripcion   : string    = this.form.controls["descripcion"].value;
      */
      let nombre : string = this.form.controls["nombre"].value,
      whatsapp : number = this.form.controls["whatsapp"].value,
      municipio : number = this.form.controls["municipio"].value,
      ocupacion : string = this.form.controls["ocupacion"].value,
      redsocial : number = this.form.controls["redsocial"].value,
      lider : number = this.form.controls["lider"].value,
      voluntario : number = this.form.controls["voluntario"].value;

      if(this.isEdited)
      {
         this.updateEntry(nombre, whatsapp, municipio, ocupacion, redsocial, lider, voluntario);
      }
      else
      {
         this.createEntry(nombre, whatsapp, municipio, ocupacion, redsocial, lider, voluntario);
      }
   }

   resetFields() : void
   {
      this.Nombre           = "";
      this.Whatsapp           = "";
      this.Municipio           = "";
      this.Ocupacion           = "";
      this.RedSocial           = "";
      this.Lider           = "";
      this.Voluntario           = "";

      /*this.technologyName           = "";
      this.technologyDescription    = "";*/
   }

   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }
}