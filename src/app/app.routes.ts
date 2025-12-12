import { Routes } from '@angular/router';
import { AdminComponent } from './back_office/modules/admin/admin.component';

export const routes: Routes = [
    {
        path: 'admin',
        component : AdminComponent,
        loadChildren : () => import('./back_office/modules/admin/admin.routes').then(m => m.adminRoutes)
    },
];
