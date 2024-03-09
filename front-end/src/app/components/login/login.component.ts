import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { authenticateUser } from './auth-mock';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit() {
    this.activatedRoute.queryParamMap
      .subscribe((params: any) => {
        // this.retUrl = params.get('retUrl'); 
        // console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
      });
  }
  

  authDetail = this.formbuilder.group({
    email: new FormControl("", Validators.required),
    password: new FormControl("")
  });

  get email() {
    return this.authDetail.get('email');
  }
  get password() {
    return this.authDetail.get('password');
  }

  auth = () => {
    const email: string = this.email?.value;
    const password: string = this.password?.value;

    console.log(email, password)
    if (email && password) {
      this.authService.authenticateUser({
        email : email,
        password: password
      }).subscribe((data:any) => {
        localStorage.setItem('token',data.token)
        this.authService.setAuth(true);
        this.router.navigate(['']);
      },() => {
        alert('Invalid Creadential')
      })
    }
    else {
      alert("invalid user!")
    }

    return false;

  }


}
