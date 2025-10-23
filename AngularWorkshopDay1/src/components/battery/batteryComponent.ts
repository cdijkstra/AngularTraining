import {Component, output, model} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton} from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-battery',
  standalone: true,
  imports: [CommonModule, MatButton, MatIconModule, FormsModule, MatInputModule],
  templateUrl: './batteryComponent.html',
  styleUrl: './batteryComponent.scss'
})

export class BatteryComponent {
  fontSizeStyle = { 'font-size': '2rem' };

  batteryName = model.required<string>();
  batteryLevel = model<number>(100); // Example value, replace with your logic

  newBatteryLevel = output<number>();


  ResetBattery() {
    this.batteryLevel.set(0)
    this.newBatteryLevel.emit(this.batteryLevel());
  }

  IncreaseBattery(amount: number) {
    this.batteryLevel.update(value => value + amount);
    this.newBatteryLevel.emit(this.batteryLevel());
  }

  DecreaseBattery(amount: number) {
    this.batteryLevel.update(value => value - amount);
    this.newBatteryLevel.emit(this.batteryLevel());
  }
}

