import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [` 
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent {

  publishers = [
    {
      id: "DC Comics",
      desc: "DC-Comics"
    },
    {
      id: "Marvel Comics",
      desc: "Marvel"
    }
  ];

  heroe: Heroe = {
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               public dialog: MatDialog ) {}

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ){
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorID( id ) )
      )
      .subscribe( ( heroe ) => this.heroe = heroe );
  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0) {
      return;
    } 

    if (this.heroe.id) {
      // actulizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( heroe => this.mostrarSnackbar('Registro actualizado') );
    } else {
      // crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackbar('Registro creado')
        });
    }
  }

  borrarHeroe(){

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe( resp => {
        if (resp) {
          this.heroesService.borrarHeroe( this.heroe.id! )
            .subscribe( resp => {
              this.router.navigate(['/heroes']);
            })
        }
      })

  }

  mostrarSnackbar( mensaje: string){

    this.snackbar.open( mensaje, 'Cerrar', {
      duration: 1900
    })

  }
}
