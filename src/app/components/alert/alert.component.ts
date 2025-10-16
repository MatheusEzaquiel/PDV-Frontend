import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusAlertEnum } from '../../enum/StatusAlertEnum';


export interface IAlertComponent {
  title: string;
  message: string;
  type: StatusAlertEnum;
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() alertData: IAlertComponent | null = null;
}
