import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/servicios/facturas.service';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.css']
})
export class ListadoFacturasComponent implements OnInit {

  facturas: Array<object>;

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {
    this.cargarFras();
  }

  cargarFras() {
    this.facturasService.getFacturas()
    .subscribe((resp: any) => {
      this.facturas = resp.facturas;
    }, (error) => {
      console.log(error);
    });
  }

  eliminarFra(id) {
    this.facturasService.deleteFacturas(id)
            .subscribe((resp: any) => {
              console.log(resp);
              this.cargarFras();
            }, (error) => {
              console.log(error);
            });
  }

}
