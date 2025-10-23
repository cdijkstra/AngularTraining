import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import {Battery} from "./battery.model";

@Injectable({
  providedIn: 'root'
})

export class BatteriesService {
  private _batteries = signal<Battery[]>([
      { id: '1', name: 'Battery 1', level: 100, levels: [] }
      ]);

  addBattery(battery: { name: string, level: number }) {
    const batteries = this._batteries();
    const maxId = batteries.length
        ? Math.max(...batteries.map(b => Number(b.id)))
        : 0;
    const newId = String(maxId + 1);

    this._batteries.set([...batteries, { ...battery, id: newId, levels: [] }]);
  }
}
