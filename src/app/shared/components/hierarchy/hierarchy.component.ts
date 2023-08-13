import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule, NzButtonModule, NzIconModule, NzTreeModule, NzTagModule
  ],
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnChanges {
  @Input() data: any;
  @Input() type: any;

  nodes: any[] = [];

  ngOnChanges() {
    this.nodes = [this.createNodes(this.data, this.type)];
  }

  private createNodes(data: any, type: string = '') {
    const node: any = {
      title: data.name,
      key: data.id,
      expanded: true,
      expense: data.allocation ?? 0,
      children: []
    };
    const values = type === 'Department' ? data.children : data.children;
    if (values.length > 0) {
      node.children = values.map((child: any) => this.createNodes(child));
    } else {
      node.isLeaf = true;
    }

    return node;
  }
}
