import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductActionsTypes} from '../../state/product.state';
import {EventDriverService} from '../../state/event.driver.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  formGroupEditProduct?: FormGroup; // = new FormGroup({});
  productId: number ;
  submitted: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private formbuilder: FormBuilder,
              private eventDriveService: EventDriverService ) {
    // activatedRoute.snapshot.params.id permet de recuperer l'id dans url
    this.productId = activatedRoute.snapshot.params.id;
    this.submitted = false;
    console.log(this.productId);
  }


  ngOnInit(): void {
     this.productsService.getProduct(this.productId).
    subscribe(editPrd =>
      {
        // alert("sucesss");
      console.log(editPrd);
      this.formGroupEditProduct = this.formbuilder.group({
          name: [editPrd.name, Validators.required],
          price: [editPrd.price, Validators.required],
          selected: [editPrd.selected, Validators.required],
          id: [editPrd.id, Validators.required],
          available: [editPrd.available, Validators.required],
          quantity: [editPrd.quantity, Validators.required]
       });

      console.log(this.formGroupEditProduct);

    });
  }


  onUpdateProduct(): void{
    console.log(this.formGroupEditProduct);
    console.log(this.formGroupEditProduct?.value);
    this.submitted = true;
    if ( this.formGroupEditProduct?.invalid) { return ; }
    this.productsService.updateProducts(this.formGroupEditProduct?.value).
    subscribe(data => {
      this.eventDriveService.publishEvent({type: ProductActionsTypes.PRODUCT_UPDATED});
      alert('sucesss');
      console.log(data);
    });
  }


}
