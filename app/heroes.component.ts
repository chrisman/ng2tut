import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector:    'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:   ['app/heroes.component.css'],
  directives:  [HeroDetailComponent],
  providers:   []
}) 

export class HeroesComponent implements OnInit {
  selectedHero: Hero; // TODO do these values default to private?
  addingHero: Boolean = false;
  heroes: Hero[];
  error: any;:

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

  addHero() {
    this.addingHero = true;
    this.selectHero = null;
  }

  close(savedHero: Hero = null) {
    this.addingHero = false;
    if (savedHero)
      this.getHeroes();
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
      .deleteHero(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => hero !== h);
        if (this.selectedHero === hero)
          this.selectedHero = null;
      })
      .catch(e => this.error = e);
  }

  gotoDetail() {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }

}
