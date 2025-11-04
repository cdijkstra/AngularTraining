import { Routes } from '@angular/router';
import {HeroesList} from "./Components/heroes-list/heroes-list";
import {HeroDetail} from "./Components/hero-detail/hero-detail";

export const routes: Routes = [
    {
        path: 'heroes',
        component: HeroesList
    },
    {
        path: 'hero/:id',
        component: HeroDetail
    },
    {
        path: '', redirectTo: '/heroes', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/heroes'
    }
];
