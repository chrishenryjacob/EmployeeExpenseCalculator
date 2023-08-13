import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRoute } from '@angular/router';

import { EmployeeFormComponent } from './employee-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InvalidIdData } from '@shared/mocks/invalidIdData';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        EmployeeFormComponent,
        HttpClientTestingModule
      ],
      providers: [
        NzMessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '24fkzrw3487943uf358lovd' } }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove IDs including the employee and its references', () => {
    const data = InvalidIdData;
    const result = component.fetchInvalidIds(data);
    expect(result).toEqual(['id1', 'id3']);
  });

});
