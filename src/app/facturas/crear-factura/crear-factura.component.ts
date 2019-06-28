import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  formFra: FormGroup;
  fechaActual = new Date();

  constructor(private fb: FormBuilder,
              private facturasService: FacturasService,
              private router: Router) { }

  ngOnInit() {
    this.formFra = new FormGroup({
      razonSocial: new FormControl('', [Validators.required, Validators.minLength(4)]),
      numero: new FormControl('', [Validators.required]),
      fecha: new FormControl(this.fechaActual),
      base: new FormControl(null, Validators.required),
      tipo: new FormControl(0.21),
      importeIVA: new FormControl(0),
      total: new FormControl(0),
      cobro: new FormGroup ({
        vencimiento: new FormControl(180),
        formaPago: new FormControl('confirming')
      })
    });
    this.onChanges();
  }

  onChanges(): void {
    this.formFra.valueChanges.subscribe(objetoForm => {
      this.formFra.get('importeIVA').patchValue(objetoForm.base * objetoForm.tipo, {emitEvent: false});
      this.formFra.get('total').patchValue(this.formFra.get('base').value + this.formFra.get('importeIVA').value, {emitEvent: false});
    });
  }

  onSubmit() {
    const factura = {
      razonSocial: this.formFra.get('razonSocial').value,
      numero: this.formFra.get('numero').value,
      fecha: this.formFra.get('fecha').value,
      base: this.formFra.get('base').value,
      tipo: this.formFra.get('tipo').value,
      importeIVA: this.formFra.get('importeIVA').value,
      // total: this.formFra.get('total').value,
      // cobro: this.formFra.get('cobro').value,
      contabilizado: 'Juan Pérez',
      // fechaCont: this.fechaActual
    };
    this.facturasService.postFactura(factura)
            .subscribe((res: any) => {
              console.log(res);
              this.router.navigate(['/']);
              // this.mensajesService.setMensaje('Factura contabilizada');
            }, (error: any) => {
              console.log(error);
            });
  }

}
