import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Battery } from "./battery.model";

@Injectable({
  providedIn: 'root'
})

export class BatteriesService {
    private _batteries = signal<Battery[]>([
        { id: '1', name: 'BatteryComponent 1', level: 100, levels: [] },
        { id: '2', name: 'BatteryComponent 20', level: 100, levels: [] },
        { id: '3', name: 'BatteryComponent 3', level: 40, levels: [] }
    ]);

    batteries = this._batteries.asReadonly();

    addBattery(battery: { name: string, level: number }) {
        const newBattery = {
            ...battery,
            id: crypto.randomUUID(),
            levels: [],
        };
        this._batteries.update((batteries) => [...batteries, newBattery]);
        return newBattery;
    }

    // Read
    getBatteryById(id: string) {
        return this._batteries().find((battery) => battery.id === id);
    }

    // Update
    updateBattery(
        id: string,
        battery: { name?: string; level?: number; levels?: number[] }
    ) {
        this._batteries.update((batteries) =>
            batteries.map((existingBattery) =>
                existingBattery.id === id
                    ? { ...existingBattery, ...battery }
                    : existingBattery
            )
        );
    }

    // Delete
    deleteBattery(id: string) {
        this._batteries.update((batteries) =>
            batteries.filter((battery) => battery.id !== id)
        );
    }
}
