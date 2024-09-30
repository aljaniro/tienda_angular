import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { productoM } from '../component/home/productModel';
import { ToasterService } from 'src/app/toaster.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productosignal = signal<productoM>({
    title: '',
    category: '',
    description: '',
    price: 0,
    image: '',
    discount: 0,
    cantidad: 0,
  });
  listaProductosSignal = signal<productoM[]>([]);
  lista: productoM[] = [];
  totalsignal = signal<number>(0);
  cantidadsignal = signal<number>(0);
  constructor(
    private http: HttpClient,
    private ToasterService: ToasterService
  ) {}

  getproductos(): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products');
  }

  saveProducto(product: productoM) {
    this.productosignal.set(product);
  }

  saveinList(prod: productoM) {
    const pru = this.listaProductosSignal().filter((val) => val.id == prod.id);
    if (pru.length > 0) {
      console.log('si esta');
      this.ToasterService.info(
        'Producto fue agregado anteriormente a la lista',
        'Info'
      );
    } else {
      this.cantidadsignal.update((val) => val + 1);
      this.totalsignal.update(
        (val) => val + (prod.price - prod.price * (prod.discount / 100))
      );
      //this.lista.push(prod);
      this.listaProductosSignal.update(val=>[...val,prod])
     // this.listaProductosSignal.set(this.lista);
      this.ToasterService.success(
        'Producto fue agregado a la lista',
        'Success'
      );
    }
  }

  disminuirCantidad(id: any, prod: productoM) {
    this.cantidadsignal.update((val) => val - 1);

    this.totalsignal.update(
      (val) => val - +(prod.price - prod.price * (prod.discount / 100))
    );
    this.listaProductosSignal.mutate((val) => {
      val[id].cantidad = val[id].cantidad - 1;
      if (val[id].cantidad < 1) {
        console.log("me fui",val[id])
        val.splice(id,1)
       
        // this.lista.splice(id, 1);
        // this.listaProductosSignal.set(this.lista);
        this.cantidadsignal.set(0);
      }
    });
  }

  aumentarCantidad(id: any, prod: productoM) {
    this.cantidadsignal.update((val) => val + 1);
    this.totalsignal.update(
      (val) => val + (prod.price - prod.price * (prod.discount / 100))
    );
    this.listaProductosSignal.mutate((val) => {
      val[id].cantidad = val[id].cantidad + 1;
    });
  }

  pagarfactura() {
    const lista =this.listaProductosSignal()
    var total=0
    
    this.listaProductosSignal.set([]);
    this.cantidadsignal.set(0);
    this.totalsignal.set(0);
    this.ToasterService.success('Factura pagada exitosamente', 'Success');
  }

  actualizar(lista: productoM[]) {
    this.listaProductosSignal.set(lista);
  }
}
