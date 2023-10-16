import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements OnInit {

  role!: any;
  avatarUrl: any;

  constructor(private _authService: AuthService) {
  }
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.avatarUrl = localStorage.getItem('avatarUrl');

    const btns = document.querySelectorAll('.menu-item');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.autoClose();
        btns.forEach(e => {
          e.classList.add('effect');
        });
        btn.classList.remove('effect');
      })
    })

    document.getElementById('content')?.addEventListener('click', () => {
      this.autoClose();
    });
  }

  isCollapsed = false;

  toggleCollapsed(): void {
    const menu = document.querySelector('#sidebar');
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsed ? menu?.classList.add('expand') : menu?.classList.remove('expand');
  }

  autoClose(): void {
    this.isCollapsed = true;
    this.toggleCollapsed();
  }

}
