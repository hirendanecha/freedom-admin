import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoggedIn = false;
  loginMessage = '';
  errorMessage = '';
  isLoginFailed = false;
  position = 'top-end';
  visible = false;
  percentage = 0;
  type = '';
  @ViewChild(ToasterComponent) toaster!: ToasterComponent;
  placement = ToasterPlacement.TopEnd;
  constructor(
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange(event: boolean) {
    console.log(event);
    this.visible = event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate([`/home`]);
    }

    this.loginForm = this.fb.group({
      Email: [null, [Validators.required]],
      Password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    // this.spinner.show();
    this.userService.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data) {
          // this.spinner.hide();
          this.tokenStorage.saveToken(data?.accessToken);
          this.tokenStorage.saveUser(data.user);
          // window.sessionStorage.user_level_id = 2;
          // window.sessionStorage.user_level_id = 2;
          window.sessionStorage['user_id'] = data.user.Id;
          window.sessionStorage['user_country'] = data.user.Country;
          window.sessionStorage['user_zip'] = data.user.Zip;
          this.isLoggedIn = true;
          // let lastloc = Utils.getLastLoc();
          // this.router.navigate([lastloc ? lastloc : 'home']);
          this.type = 'success';
          this.errorMessage = 'Login successfully';
          this.router.navigate([`/dashboard`]);
        } else {
          this.loginMessage = data.mesaage;
          this.visible = true;
          this.type = 'danger';
          this.errorMessage =
            'Invalid Email and Password. Kindly try again !!!!';
        }

        //this.reloadPage();
      },
      error: (err) => {
        // this.spinner.hide();
        console.log(err.error);
        this.visible = true;
        this.type = 'danger';
        this.errorMessage = err.error.message; //err.error.message;
        // this.isLoginFailed = true;
        // this.errorCode = err.error.errorCode;
      },
    });
  }
}
