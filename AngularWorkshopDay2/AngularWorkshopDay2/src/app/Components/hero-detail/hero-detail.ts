import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeroesService} from "../../Service/heroes.service";
import {Hero} from "../../Interfaces/hero.interface";

@Component({
  selector: 'app-hero-detail',
  imports: [],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.scss',
})
export class HeroDetail {
  heroId = signal<string | null>(null)
  hero = signal<Hero | null>(null)
  router = inject(Router)
  route = inject(ActivatedRoute)
  service = inject(HeroesService)

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.service.setSelectedHero(Number(id))
      const hero = this.service.getHero(id)
      this.heroId.set(id);
      this.hero.set(hero);
    });
  }

  protected ToHeroes = () => this.router.navigate(["/heroes"]);
}
