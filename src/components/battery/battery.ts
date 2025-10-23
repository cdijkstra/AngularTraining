import {signal, Component, output, model} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-battery',
  standalone: true,
  imports: [CommonModule, MatButton, MatIconModule, FormsModule, MatInputModule],
  templateUrl: './battery.html',
  styleUrl: './battery.scss'
})

export class Battery {
  batteryName = model.required<string>();
  newBatteryLevel = output<number>();

  fontSizeStyle = { 'font-size': '2rem' };

  batteryLevel = signal(100); // Example value, replace with your logic

  constructor() {
    setInterval(() => this.newBatteryLevel.emit(this.batteryLevel()), 1000);
  }

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

