import { Component, OnInit, effect, inject } from '@angular/core';
import { productoM } from '../home/productModel';
import { ProductService } from 'src/app/servicio/product.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'src/app/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],

})

export class ProductoComponent implements OnInit {
  product !: productoM
  listaP : productoM[] = []
  servicioproduct = inject(ProductService)
  toast = inject(ToastrService)
constructor(private ruta:Router){
  effect(()=>{
    this.product = this.servicioproduct.productosignal()
    this.listaP = this.servicioproduct.listaProductosSignal()
    console.log(this.product)
  })
}

  ngOnInit(): void {
    this.product=this.servicioproduct.productosignal()
    console.log(this.product)
    if(this.product.title == ''){
      this.ruta.navigate(['/home'])
    }
  }
  showSuccess() {


    console.log(this.listaP.includes(this.product))
    this.servicioproduct.saveinList(this.product)

      }

}
