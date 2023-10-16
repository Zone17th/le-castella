import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {StaffService} from "../../../services/staff-service/staff.service";

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  staffList: any[] = [];
  searchOptions: string = '';
  dataLoaded = false;
  role: string = '';
  page: number = 0;
  size: number = 5;
  totalElements: number = 0;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _staffService: StaffService,
              private _notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this.page = Number(params['page']) || 0;
      this.size = Number(params['size']) || 10;
      this.searchOptions = params['query'] || '';
    });
    this.loadData();
  }

  paging(newPage: number) {
    this.page = newPage - 1;
    this.reGenerateUrl();
    this.loadData();
  }

  reGenerateUrl() {
    const navigationExtras: NavigationExtras = {
      queryParams: {query: this.searchOptions, page: this.page, size: this.size}
    };
    this._router.navigate([], navigationExtras);
  }

  loadData() {
    this._staffService.getStaffList(this.searchOptions, this.page, this.size).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: res => {
        this.staffList = res.content;
        this.totalElements = res.totalElements;
        this.dataLoaded = true;
      },
      error: error => {

      }
    });
  }

  delete(id: number): void {
    this._staffService.deleteStaff(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.createNotification('success', 'Success deleted!', '');
          this.loadData();
        },
        error: error => {
        }
      });
  }

  search() {
    this.reGenerateUrl();
    this.loadData();
  }

  createNotification(type: string, title: string, message: string): void {
    this._notification.create(
      type,
      title, message
    );
  }
}
