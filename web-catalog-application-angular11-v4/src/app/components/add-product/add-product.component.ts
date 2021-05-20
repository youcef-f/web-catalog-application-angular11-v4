import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
import {EventDriverService} from '../../state/event.driver.service';
import {ProductActionsTypes} from '../../state/product.state';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  formGroupAddProduct?: FormGroup = new FormGroup({});
  submitted: boolean  ;
  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private eventDriveService: EventDriverService ) {

    this.submitted = false ;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroupAddProduct = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required] });
  }


  onSaveProduct(): void {
    console.log(this.formGroupAddProduct);
    this.submitted = true;
    if ( this.formGroupAddProduct?.invalid) { return ; }
    this.productsService.saveProduct(this.formGroupAddProduct?.value).
      subscribe(data => {
        this.eventDriveService.publishEvent({type: ProductActionsTypes.PRODUCT_ADDED});
        alert('sucesss');
        console.log(data);
      });
  }
}
