import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent],
  providers: []
}) 

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => {
      this.heroes = heroes;
    });
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail() {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }

}
