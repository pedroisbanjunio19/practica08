import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearFacturaComponent } from './facturas/crear-factura/crear-factura.component';
import { HttpClientModule } from '@angular/common/http';
import { ListadoFacturasComponent } from './facturas/listado-facturas/listado-facturas.component';
import { EditarFacturaComponent } from './facturas/editar-factura/editar-factura.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearFacturaComponent,
    ListadoFacturasComponent,
    EditarFacturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
