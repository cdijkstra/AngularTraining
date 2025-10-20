import { signal, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-battery',
  standalone: true,
  imports: [CommonModule, MatButton, MatIconModule],
  templateUrl: './battery.html',
  styleUrl: './battery.scss'
})

export class Battery {
  batteryName = input.required<string>();
  batteryLevel = signal(100); // Example value, replace with your logic
  fontSizeStyle = { 'font-size': '2rem' };
  today = new Date();

  ResetBattery() {
    this.batteryLevel.set(0)
  }
  IncreaseBattery(amount: number) {
    this.batteryLevel.update(value => value + amount);
  }
  DecreaseBattery(amount: number) {
    this.batteryLevel.update(value => value - amount);
  }
}

