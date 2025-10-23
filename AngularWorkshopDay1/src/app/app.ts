import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BatteryComponent } from '../components/battery/batteryComponent';
import { BatteriesService } from "../services/batteries";
import {MatLabel} from "@angular/material/form-field";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {Battery} from "../services/battery.model";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BatteryComponent, MatLabel, MatFormField, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  batteriesService = inject(BatteriesService);
  batteries = this.batteriesService.batteries;

  addBattery() {
    this.batteriesService.addBattery({ name: 'New BatteryComponent', level: 100 });
  }

  onNewBatteryLevel(battery: Battery, newBatteryLevel: number) {
    console.log('New battery level:', newBatteryLevel);
    this.batteriesService.updateBattery(battery.id, {
      level: newBatteryLevel,
      levels: [...battery.levels, newBatteryLevel],
    });
  }
}
