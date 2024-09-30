import { Component, OnInit, effect, inject } from '@angular/core';
import { ProductService } from 'src/app/servicio/product.service';
import { productoM } from '../home/productModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
servi = inject(ProductService)
lista : productoM[] = []
total : number = 0
toast = inject(ToastrService)
constructor(){
  effect(()=>{
this.lista= this.servi.listaProductosSignal()
this.total = this.servi.totalsignal()
console.log(this.lista)
  })
}
  ngOnInit(): void {
    
    this.lista= this.servi.listaProductosSignal()
    this.total = this.servi.totalsignal()
    console.log(this.lista)
  }

  disminuir(id:any,pro:productoM){
    console.log(id)
    this.servi.disminuirCantidad(id,pro)
    console.log(this.lista)
  }

  aumentar(id:any,pro:productoM){
    console.log(id)
    this.servi.aumentarCantidad(id,pro)
    console.log(this.lista)
  }
  pago(){
    console.log("pago")
    this.servi.pagarfactura()
    console.log("Factura Pagada exitosamente")

  }
}
