import {Injectable, signal} from '@angular/core';
import {Hero} from "../Interfaces/hero.interface";

@Injectable({
  providedIn: 'root'
})

export class HeroesService {
  heroes = signal<Hero[] | null>(null)
  selectedHero = signal<Hero | null>(null)

  constructor() {
    this.heroes.set([
      {
        id: 1,
        name: 'Me',
        power: 'Angular'
      },
      {
        id: 2,
        name: 'Superman',
        power: 'Spider Stuff'
      },
      {
        id: 3,
        name: 'Christian',
        power: 'Over 9000'
      },
    ])
  }

  setSelectedHero(id: number) {
    this.selectedHero.set(
        this.heroes()?.find(hero => hero.id === id) || null
    )
  }

  getHero(id: number) : Hero | null {
      return this.heroes()?.find(hero => hero.id === id) || null;
  }
}