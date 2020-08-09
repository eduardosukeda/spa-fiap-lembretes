import { Component, ViewChild, OnInit } from '@angular/core';
import { ErrorMsgComponent } from '../../compartilhado/error-msg/error-msg.component';
import { LembreteService } from 'src/app/services/lembrete.service';
import { Router } from '@angular/router';
import { Lembrete } from 'src/app/interfaces/lembrete';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-criar-lembrete',
  templateUrl: './criar-lembrete.component.html',
  styleUrls: ['./criar-lembrete.component.css']
})
export class CriarLembreteComponent implements OnInit {
  
  public email: string;
  @ViewChild(ErrorMsgComponent, {static: true}) errorMsgComponent: ErrorMsgComponent;

  constructor(private lembreteService: LembreteService, private router: Router,
    public userService: UserService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
  }

  addLembrete(lembrete: Lembrete) {
    lembrete.email = this.email;
    this.lembreteService.addLembrete(lembrete)
      .subscribe(
        () => { this.router.navigateByUrl('/'); },
        () => { this.errorMsgComponent.setError('Falha ao adicionar lembrete.'); });
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
