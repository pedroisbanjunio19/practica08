import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  url = environment.urlFactura;

  constructor(private http: HttpClient) { }

  postFactura(factura) {
    return this.http.post(this.url, factura)
                .pipe(
                  map((resp: any) => {
                    return resp.ok;
                  })
                );
  }

  getFacturas() {
    return this.http.get(this.url)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getFactura(id) {
    return this.http.get(this.url + `/${id}`)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getFacturaNro(nro) {
    return this.http.get(this.url + `/${nro}`)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  putFactura(id, factura) {
    return this.http.put(this.url + `/${id}`, factura)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  deleteFacturas(id) {
    return this.http.delete(this.url + `/${id}`)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

}
