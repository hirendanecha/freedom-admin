import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from './delete-confirmation-dialog/delete-dialog.component';
import { Pagination } from 'src/app/@shared/interface/pagination';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  activeTab = 0;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
  onTabChange(event): void {
    this.activeTab = event
    console.log('tab event ==>', event);
  }
}
