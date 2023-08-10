import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { Menu } from '@shared/models/menu.type';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    NzLayoutModule, NzIconModule, NzMenuModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;

  menuList: Menu[] = [
    { name: 'Menu 1', icon: 'home', url: '' },
    { name: 'Menu 2', icon: 'home', url: '' }
  ];
}