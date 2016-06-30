import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

import { HeroService }     from './hero.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HeroService
  ]
})

export class AppComponent {
  title = 'Super List!';
}
