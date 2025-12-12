import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './list/edit/edit.component';

export const filmRoutes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: ':id',
    children: [
      {
        path: 'edit',
        component: EditComponent,
      },
    ],
  },
] ;
