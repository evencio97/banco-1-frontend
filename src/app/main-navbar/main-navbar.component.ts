import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
    selector: 'main-navbar',
    templateUrl: './main-navbar.component.html',
    styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {

    public token = true;
    public user;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver, private _userService: UserService, private _auth: AuthService, private _router: Router, ) { }

    ngOnInit() {
        this.token = this._userService.getToken();
    }

    ngDoCheck() {
        this.user = this._userService.getSession();
        this.token = this._userService.getToken();
    }

    logout() {
        Swal.fire({
            showCancelButton: false,
            showConfirmButton: false,
            background: 'transparent',
            html: '<div class = "animated fadeIn fa-child-ss" style="color:#ffffff"><i class="fas fa-circle-notch fa-spin fa-3x"></i></div>',
            allowOutsideClick: false
        });
        this._auth.logout(this.token).subscribe(
            response => {
                Swal.close();
                // Swal.fire('Hasta luego!', response['message'], 'success').then(() => {
                    this._userService.tokenFailsOrExp();
                // }    
            }, err => {
                if (err.error['token_fail'] || err.error['token_exp'])
                    Swal.fire('Ups', err.error['message'], 'warning').then(() => {
                        this._userService.tokenFailsOrExp();
                    });
            });
    }

    editPerfil: boolean = true;
    transfer: boolean = false;
    facturas: boolean = false;
}
