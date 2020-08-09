import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lembrete } from '../interfaces/lembrete';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  constructor(private http: HttpClient) { }

  getListLembretes(email: string): Observable<Lembrete[]> {
    const url = `${environment.lembreteApiUrl}/lembretes` + "?email=" + `${email}`;
    return this.http.get<Lembrete[]>(url);
  }

  getLembrete(id: number): Observable<Lembrete> {
    const url = `${environment.lembreteApiUrl}/lembretes/${id}`;
    return this.http.get<Lembrete>(url);
  }

  addLembrete(lembrete: Lembrete): Observable<Lembrete> {
    const url = `${environment.lembreteApiUrl}/lembretes/`;
    return this.http.post<Lembrete>(url, lembrete);
  }

  atualizaLembrete(lembrete: Lembrete): Observable<Lembrete> {
    const url = `${environment.lembreteApiUrl}/lembretes/`;
    return this.http.put<Lembrete>(url, lembrete);
  }

  deleteLembrete(id: number): Observable<Lembrete> {
    const url = `${environment.lembreteApiUrl}/lembretes/${id}`;
    return this.http.delete<Lembrete>(url);
  }

}
