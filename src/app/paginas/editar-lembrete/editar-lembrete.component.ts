import { Component, ViewChild, OnInit } from '@angular/core';
import { ErrorMsgComponent } from '../../compartilhado/error-msg/error-msg.component';
import { LembreteService } from '../../services/lembrete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lembrete } from '../../interfaces/lembrete';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-editar-lembrete',
  templateUrl: './editar-lembrete.component.html',
  styleUrls: ['./editar-lembrete.component.css']
})
export class EditarLembreteComponent implements OnInit {

  public lembrete: Lembrete;
  public email: string;
  @ViewChild(ErrorMsgComponent, {static: true}) errorMsgComponent: ErrorMsgComponent;

  constructor(private lembreteService: LembreteService,
    private activatedRoute: ActivatedRoute,
    public userService: UserService,
    public authService: AuthService,
    private router: Router) { 
      this.getLembrete(this.activatedRoute.snapshot.params.id);
    }

    ngOnInit(): void {
      this.email = localStorage.getItem("email");
    }

  getLembrete(id: number) {
    this.lembreteService.getLembrete(id)
      .subscribe((lembrete: Lembrete) => {
        this.lembrete = lembrete;
      }, () => { this.errorMsgComponent.setError('Falha ao buscar lembrete.'); });
  }

  atualizaLembrete(lembrete: Lembrete) {
    this.lembreteService.atualizaLembrete(lembrete)
      .subscribe(
        () => { this.router.navigateByUrl('/'); },
        () => { this.errorMsgComponent.setError('Falha ao atualizar lembrete.'); })
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
