import { Component, OnInit, effect, inject } from '@angular/core';
import { ProductService } from 'src/app/servicio/product.service';
import { productoM } from './productModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listaProductos: Array<any> = [];
  opcionSeleccionado = 'Seleccione una categoria';
  serviprodu = inject(ProductService);
  category: any[] = [];
  aux: Array<any> = [];
  indice: any;
  listaP : productoM[] = []
  pro!:productoM
  constructor() {
    effect(() => {
      this.pro = this.serviprodu.productosignal()
      this.listaP = this.serviprodu.listaProductosSignal()

    });
  }

  ngOnInit(): void {
    this.serviprodu.getproductos().subscribe({
      next: (value) => {
        this.listaProductos = value.products;
        this.aux = value.products;
        console.log(value);
        console.log(this.listaProductos);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        const prueba = this.listaProductos.map((val) => {
          return val.category;
        });

        for (var i = 0; i < prueba.length; i++) {
          const elemento = prueba[i];

          if (!this.category.includes(prueba[i])) {
            this.category.push(elemento);
          }
        }
        console.log(this.category);
        console.log('Operacion completada', this.category);
      },
    });
  }
  enviar(item: any) {
    console.log(item);
    const pro: productoM = {
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      price: item.price,
      image: item.images[0],
      discount: item.discountPercentage,
      cantidad: 1,
    };
    console.log(pro);
    this.serviprodu.saveProducto(pro);
  }
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    console.log(this.opcionSeleccionado);
    if(this.opcionSeleccionado === "All"){
      console.log(this.aux)
      this.listaProductos = this.aux
    }else{
      const pru = this.aux.filter(
        (val) => val.category == this.opcionSeleccionado
      );
      console.log(pru);
      this.listaProductos = pru;
    }

  }
  comprar(item:any){

    const produ : productoM = ({
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      price: item.price,
      image: item.images[0],
      discount: item.discountPercentage,
      cantidad: 1,
    })


   this.serviprodu.saveinList(produ)

  }
}
