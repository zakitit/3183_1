import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // users = [{ 'email': 'abc@com.au', 'pwd': '123' }, { 'email': 'abd@com.au', 'pwd': '123' }, { 'email': 'abe@com.au', 'pwd': '123' }];
  email: string = 'Email Address';
  password: string = 'password';
  error = false;
  hidemessage = true;

  constructor(private router: Router, private form: FormsModule, private http:HttpClient) { }

  uri:string = 'http://localhost:3000';
  vvv;

  ngOnInit() {
  }

  itemClicked(){

    const obj ={
      email: this.email,
      upwd : this.password
    }

    this.http.post(`${this.uri}/api/auth`, obj).
    subscribe(
      data => {this.vvv = data; 
        console.log(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        console.log(sessionStorage);
        // this.router.navigateByUrl('/account/'+ encodeURIComponent(JSON.stringify(data)));
      },
      ()=>{

      } 
    );

  }
}
