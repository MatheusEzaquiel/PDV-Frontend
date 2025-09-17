import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
}
