import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-factura',
  templateUrl: './editar-factura.component.html',
  styleUrls: ['./editar-factura.component.css']
})
export class EditarFacturaComponent implements OnInit {

  formFra: FormGroup;
  fechaActual = new Date();
  factura: any;
  id: string;

  constructor(private fb: FormBuilder,
              private facturasService: FacturasService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.facturasService.getFactura(this.id)
            .subscribe( (res: any) => {
                this.factura = res.factura;
                this.formFra.get('razonSocial').setValue(this.factura.razonSocial);
                this.formFra.get('numero').setValue(this.factura.numero);
                this.formFra.get('fecha').setValue(this.factura.fecha);
                this.formFra.get('base').setValue(this.factura.base);
                this.formFra.get('tipo').setValue(this.factura.tipo);
                this.formFra.controls.cobro.get('vencimiento').setValue(this.factura.cobro.vencimiento);
                this.formFra.controls.cobro.get('formaPago').setValue(this.factura.cobro.formaPago);
              }, (error: any) => {
                console.log(error);
            });
    this.formFra = new FormGroup({
      razonSocial: new FormControl('', [Validators.required, Validators.minLength(4)]),
      numero: new FormControl('', [Validators.required]),
      fecha: new FormControl(null),
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
      total: this.formFra.get('total').value,
      cobro: this.formFra.get('cobro').value,
      contabilizado: 'Juan Pérez',
      fechaCont: this.fechaActual
    };
    this.facturasService.putFactura(this.id, factura)
          .subscribe( (res: any) => {
              this.router.navigate(['/']);
            }, (error: any) => {
              console.log(error);
          });
  }

}
