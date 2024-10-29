import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductionStagesComponent } from "./production-stages/production-stages.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductionStagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'production-stage';
}
