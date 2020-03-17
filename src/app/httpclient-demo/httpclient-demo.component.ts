import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UsersService } from '../users.service'
import { ProductService, Product } from '../product.service';



@Component({
  selector: 'app-httpclient-demo',
  templateUrl: './httpclient-demo.component.html',
  styleUrls: ['./httpclient-demo.component.css']
})
export class HttpclientDemoComponent implements OnInit {

  userData : User;
  productData : Product[];
  product: Product = {name:'',description:'',price:0, id:0, imageUrl:'',quantity:0}
  @ViewChild('productForm') productForm : any;
  
  userData_async : Observable<User[]>;
  userData_with_response : Observable<HttpResponse<User[]>>;
  constructor(
    private httpClient : HttpClient,
    private userService : UsersService,
    private productService : ProductService
  ) { }

  ngOnInit(): void {

    // using async pipe to display list 
    this.userData_async = this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users')

    // manual handle the response
    /* this.httpClient.get<User>('https://jsonplaceholder.typicode.com/users')
    .subscribe((data:User) => {
      this.userData = data
    }) */

    //get details by User Service
    /* this.userService.getUsers()
    .subscribe((data:User) => {
      this.userData = data
    }) */

    // reading full response
    this.userData_with_response = this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users', {observe:'response'})
    this.userData_with_response.subscribe(resp => {
      const keys = resp.headers.keys();
      let headers = keys.map( key => `${key} : ${resp.headers.get(key)}`)
      console.log("FULL RESPONSE", resp)
      console.log("HEADERS keys", resp.headers.keys())
      console.log("HEADERS info", headers)
      console.log("userData", resp.body)

    })


    // show product list from Product Service
    this.productService.get()
    .subscribe(response => {
      console.log(typeof(response));
      this.productData = response
    })
  }

  addProduct(){
    let product = this.product
    product.id = this.productData.length + 1
    this.productService.post(product)
    .subscribe(response => {
      console.log("POST response:", response)
      this.productData.push(product);
    })
  }

  updateProduct(product: Product, id:number){
    let update_data:Product = {...product}
    update_data.name = 'updated POST :'+update_data.name; 
    this.productService.put(update_data, id)
    .subscribe(response => {
      console.log("UPDATE response:", response)
    })
  }

  deleteProduct(id:number){
    this.productService.delete(id)
    .subscribe(response => {
      console.log("DELETE response:", response)
    })
  }

}
