import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { Pagination } from 'src/app/@shared/interface/pagination'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input({ required: true }) items: number;
  @Input() activePage: number = 1;
  @Input() perPage: number = 100;
  @Input() size: "sm" | "lg" = null;

  @Output() onPageChange = new EventEmitter<Pagination>();;

  config: Pagination = null;
  perPageCtrl: FormControl;

  constructor() {
    this.perPageCtrl = new FormControl(this.perPage);

    this.perPageCtrl.valueChanges.pipe(distinctUntilChanged()).subscribe((val: number) => {
      this.perPage = val;
      this.config.activePage = 0;
      this.pageChange(1);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const items = changes['items'].currentValue;
    if (items) {
      this.pageChange(this.config?.activePage);
    }
  }

  pageChange(page: number = 1): void {
    if ((page < 1) || (page > this.config?.totalPages) || (page === this.config?.activePage)) {
      return;
    }

    this.config = this.getPaginator(this.items, page, this.perPage);
    this.onPageChange.emit(this.config);
  }

  getPaginator(totalItems: number, activePage: number, perPage: number): Pagination {
    const totalPages: number = Math.ceil(totalItems / perPage);
    let startPage: number, endPage: number, isStartEllipsesShow: boolean, isEndEllipsesShow: boolean;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
      isStartEllipsesShow = false;
      isEndEllipsesShow = false;
    } else if (activePage <= 3) {
      startPage = 1;
      endPage = 4;
      isStartEllipsesShow = false;
      isEndEllipsesShow = true;
    } else if ((activePage + 2) >= totalPages) {
      startPage = totalPages - 3;
      endPage = totalPages;
      isStartEllipsesShow = true;
      isEndEllipsesShow = false;
    } else {
      startPage = activePage - 1;
      endPage = activePage + 1;
      isStartEllipsesShow = true;
      isEndEllipsesShow = true;
    }

    return {
      activePage: activePage,
      perPage: perPage,
      totalItems: totalItems,
      totalPages: totalPages,
      isStartEllipsesShow: isStartEllipsesShow,
      isEndEllipsesShow: isEndEllipsesShow,
      pages: startPage <= endPage ? Array(endPage - startPage + 1).fill(0).map((x, i) => startPage + i) : []
    };
  }
}
