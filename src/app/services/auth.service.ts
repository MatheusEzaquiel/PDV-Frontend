import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private http = inject(HttpClient);
    private API_URL = 'http://127.0.0.1:8080';

    login(email: string, password: string) {
        console.log("credentials: " + email + " " + password);
        return this.http.post<{
            accessToken: string;
            expiresIn: number;
        }>(
            `${this.API_URL}/auth/login`,
            { email, password }
        ).pipe(
            tap(response => {
                localStorage.setItem('token', response.accessToken);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
