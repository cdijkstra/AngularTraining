import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {HeroesService} from "../../Service/heroes.service";

@Component({
  selector: 'app-heroes-list',
  imports: [],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.scss',
})
export class HeroesList {
  router = inject(Router);
  service = inject(HeroesService)

  protected ToHero = (heroId: number) =>
  {
    this.service.setSelectedHero(heroId);
    this.router.navigate(["/hero", heroId]);
  }
}
