import { Component, OnInit, ViewChild } from '@angular/core';
import { Lembrete } from '../../interfaces/lembrete';
import { LembreteService } from '../../services/lembrete.service';
import { ErrorMsgComponent } from '../../compartilhado/error-msg/error-msg.component';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-lembrete',
  templateUrl: './lista-lembrete.component.html',
  styleUrls: ['./lista-lembrete.component.css']
})
export class ListaLembreteComponent implements OnInit {

  public lembretes: Lembrete[];
  public email: string;
  @ViewChild(ErrorMsgComponent, { static: true }) errorMsgComponent: ErrorMsgComponent;

  constructor(private lembreteService: LembreteService,
    public userService: UserService,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    this.getListaLembretes();
  }

  getListaLembretes() {
    this.lembreteService.getListLembretes(this.email)
      .subscribe((lembretes: Lembrete[]) => {
        this.lembretes = lembretes;
      }, () => { this.errorMsgComponent.setError('Falha ao buscar lembretes.'); });
  }

  deletaLembrete(id: number) {
    this.lembreteService.deleteLembrete(id)
      .subscribe(() => {
        this.getListaLembretes();
      }, () => { this.errorMsgComponent.setError('Falha ao deletar lembrete.'); });
  }

  existemLembretes(): boolean {
    return this.lembretes && this.lembretes.length > 0;
  }

  logoff(): void {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }

}
