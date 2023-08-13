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

  nodes: any[] = [];

  ngOnChanges() {
    this.nodes = [this.createNodes(this.data)];
  }

  /**
 * Converts a hierarchy object to an array supporting a tree array structure.
 * @param hierarchy The hierarchy object to be converted.
 */
  private createNodes(hierarchy: any) {
    const node: any = {
      title: hierarchy.name,
      key: hierarchy.id,
      expanded: true,
      expense: hierarchy.allocation ?? 0,
      children: []
    };

    if (hierarchy.children.length > 0) {
      node.children = hierarchy.children.map((child: any) => this.createNodes(child));
    } else {
      node.isLeaf = true;
    }

    return node;
  }
}
