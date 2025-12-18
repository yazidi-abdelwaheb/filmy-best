import { Routes } from '@angular/router';
import { AdminComponent } from './back_office/modules/admin/admin.component';
import { adminGuard } from './back_office/shared/gards/admin.guard';
import { LoginComponent } from './back_office/modules/admin/login/login.component';
import { ClientComponent } from './back_office/modules/client/client.component';

export const routes: Routes = [
    {
        path: 'sign-in',
        component : LoginComponent,
    },
    {
        path: 'admin',
        component : AdminComponent,
        loadChildren : () => import('./back_office/modules/admin/admin.routes').then(m => m.adminRoutes),
        canActivate:[adminGuard],
    },
    {
        path: '',
        component : ClientComponent,
        loadChildren : () => import('./back_office/modules/client/client.routes').then(m => m.clientRoutes),
    },
];
