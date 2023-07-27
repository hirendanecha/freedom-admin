import { Component } from '@angular/core';

import { navItems } from './_nav';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
  }
}
