import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaLembreteComponent } from './paginas/lista-lembrete/lista-lembrete.component';
import { CriarLembreteComponent } from './paginas/criar-lembrete/criar-lembrete.component';
import { EditarLembreteComponent } from './paginas/editar-lembrete/editar-lembrete.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { UserResolver } from './user/user.resolver';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'lembrete', component: ListaLembreteComponent},
  { path: 'lembrete/criar', component: CriarLembreteComponent},
  { path: 'lembrete/editar/:id', component: EditarLembreteComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
