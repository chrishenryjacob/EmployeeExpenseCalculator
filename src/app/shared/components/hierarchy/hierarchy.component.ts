import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule, NzButtonModule, NzIconModule, NzTreeModule
  ],
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnChanges {
  @Input() data: any;

  nodes: NzTreeNodeOptions[] = [];

  ngOnChanges() {
    this.nodes = [this.createNodes(this.data)];
  }

  private createNodes(employee: any) {
    const node: any = {
      title: employee.name,
      key: employee.id,
      expanded: true,
      children: []
    };

    if (employee.subordinates.length > 0) {
      node.children = employee.subordinates.map((subordinate: any) => this.createNodes(subordinate));
    } else {
      node.isLeaf = true;
    }

    return node;
  }
}
