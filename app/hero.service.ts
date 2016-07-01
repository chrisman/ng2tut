import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const head = (a) => a[0];
const filter = (f) => (a) => a.filter(f);
const compose = (...fs) => (init) => fs.reduceRight((result, f) => f(result), init);

@Injectable() 
export class HeroService {
  private heroesUrl = 'app/heroes';

  constructor(private http: Http) { }

  handleError(error: any) {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }

  save(hero: Hero): Promise<Hero> {
    return (hero.id) 
      ? this.putHero(hero) 
      : this.postHero(hero);
  }

  ////////////
  // CREATE //
  ////////////
  
  private postHero(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(
        this.heroesUrl,
        JSON.stringify(hero),
        {headers: headers}
      )
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  //////////
  // READ //
  //////////
  
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getHero(id) {
    const _getHero = compose(
      head,
      filter(hero => id === hero.id)
    );
    return this.getHeroes().then(heroes => _getHero(heroes));
  }

  ////////////
  // UPDATE //
  ////////////

  private putHero(hero: Hero) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroesUrl}/${hero.id}`;
    
    return this.http
      .put(
        url,
        JSON.stringify(hero),
        {headers: headers}
      )
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  ////////////
  // DELETE //
  ////////////

  deleteHero(hero: Hero) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroesUrl}/${hero.id}`;
    
    return this.http
      .delete(
        url,
        headers
      )
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }
};
