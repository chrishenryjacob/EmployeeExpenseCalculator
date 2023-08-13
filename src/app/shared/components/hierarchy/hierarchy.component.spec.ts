import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyComponent } from './hierarchy.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExpectedTreeData, HierarchyData } from '@shared/mocks/hierarchyData';

describe('HierarchyComponent', () => {
  let component: HierarchyComponent;
  let fixture: ComponentFixture<HierarchyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HierarchyComponent
      ]
    });
    fixture = TestBed.createComponent(HierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should converts a hierarchy object to tree structure.', () => {
    const data = HierarchyData;
    const result = component.createNodes(data);
    expect(result).toEqual(ExpectedTreeData);
  });

});
