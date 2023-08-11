import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeFlatDataSource, NzTreeFlattener, NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface Employee {
  id: string;
  name: string;
  type: string;
  allocation: number;
  subordinate?: Employee[];
}

const TREE_DATA: Employee[] = [
  {
    name: 'parent 1',
    id: '1',
    type: '',
    allocation: 0,
    subordinate: [
      {
        name: 'parent 1-0',
        id: '1-0',
        type: '',
        allocation: 0,
        subordinate: [
          { name: 'leaf', id: '1-0-0', type: '', allocation: 0 },
          { name: 'leaf', id: '1-0-1', type: '', allocation: 0 }
        ]
      },
      {
        name: 'parent 1-1',
        id: '1-1',
        type: '',
        allocation: 0,
        subordinate: [{ name: 'leaf', id: '1-1-0', type: '', allocation: 0 }]
      }
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  id: string;
  level: number;
}

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule, NzTreeViewModule, NzButtonModule, NzIconModule
  ],
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent {
  private transformer = (node: Employee, level: number): FlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.id === node.id
        ? existingNode
        : {
          expandable: !!node.subordinate && node.subordinate.length > 0,
          name: node.name,
          level,
          id: node.id
        };
    flatNode.name = node.name;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeData = TREE_DATA;
  flatNodeMap = new Map<FlatNode, Employee>();
  nestedNodeMap = new Map<Employee, FlatNode>();
  selectListSelection = new SelectionModel<FlatNode>(true);

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.subordinate
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.setData(this.treeData);
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  hasNoContent = (_: number, node: FlatNode): boolean => node.name === '';
  trackBy = (_: number, node: FlatNode): string => `${node.id}-${node.name}`;

  delete(node: FlatNode): void {
    const originNode = this.flatNodeMap.get(node);

    const dfsParentNode = (): Employee | null => {
      const stack = [...this.treeData];
      while (stack.length > 0) {
        const n = stack.pop()!;
        if (n.subordinate) {
          if (n.subordinate.find(e => e === originNode)) {
            return n;
          }

          for (let i = n.subordinate.length - 1; i >= 0; i--) {
            stack.push(n.subordinate[i]);
          }
        }
      }
      return null;
    };

    const parentNode = dfsParentNode();
    if (parentNode && parentNode.subordinate) {
      parentNode.subordinate = parentNode.subordinate.filter(e => e !== originNode);
    }

    this.dataSource.setData(this.treeData);
  }
  addNewNode(node: FlatNode): void {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      parentNode.subordinate = parentNode.subordinate || [];
      parentNode.subordinate.push({
        name: '',
        id: `${parentNode.id}-${parentNode.subordinate.length}`,
        type: '',
        allocation: 0,
      });
      this.dataSource.setData(this.treeData);
      this.treeControl.expand(node);
    }
  }

  saveNode(node: FlatNode, value: string): void {
    const nestedNode = this.flatNodeMap.get(node);
    if (nestedNode) {
      nestedNode.name = value;
      this.dataSource.setData(this.treeData);
    }
  }
}
