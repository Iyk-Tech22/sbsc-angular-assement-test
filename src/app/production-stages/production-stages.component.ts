import { Component, HostListener, inject } from '@angular/core';
import { ProductionStageService } from '../services/production-stage-service';
import { StageComponent } from '../stage/stage.component';
import { ProductStageItem, STAGE } from '../models/product-stage.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-production-stages',
  standalone: true,
  imports: [FormsModule, StageComponent],
  templateUrl: './production-stages.component.html',
  styleUrl: './production-stages.component.css',
  providers: [
    {
      provide: ProductionStageService, useClass:  ProductionStageService
    }
  ]
})
export class ProductionStagesComponent {
  itemName= "";
  private productionStageService = inject(ProductionStageService);

  get stages(): STAGE[] {
    return this.productionStageService.stages;
  }

  
  addItem(event?:KeyboardEvent){
    if(!this.itemName) return;
    
    if(event){
      const notEnterKey = event.key !== "Enter";
      if(notEnterKey) return;
    }
    this.productionStageService.addItem(this.itemName);
  }

  getItemsByStage(stageName: string): ProductStageItem[] {
    return this.productionStageService.getItemsByStage(stageName);
  }

}
