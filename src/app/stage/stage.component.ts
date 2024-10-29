import { Component, inject, input, OnInit} from '@angular/core';
import { ProductStageItem } from '../models/product-stage.model';
import { ProductionStageService } from '../services/production-stage-service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-stage',
  standalone: true,
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css'
})
export class StageComponent{
  readonly stageName = input.required<string>();
  readonly stageItems = input<ProductStageItem[]>([]);
  
  private lastClick = 0;
  private readonly DOUBLE_CLICK_THRESHOLD = 200;

  private ngZone = inject(NgZone);
  private stageService = inject(ProductionStageService);

  handleClick(item: ProductStageItem): void {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - this.lastClick;
    if (timeDiff < this.DOUBLE_CLICK_THRESHOLD) {
      this.moveBackward(item);
      this.lastClick = 0;
    }
    else {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          if (this.lastClick === currentTime) {
            this.ngZone.run(() => {
              this.moveForward(item);
            })
          }
        }, this.DOUBLE_CLICK_THRESHOLD);
      })
      this.lastClick = currentTime;
    }
  }

  removeItem(event: Event, item: ProductStageItem): void{
    event.stopPropagation();
    this.stageService.removeItem(item);
  }

  moveForward(item: ProductStageItem): void{
    this.stageService.moveForward(item);
  }

  moveBackward(item: ProductStageItem): void{
    this.stageService.moveBackward(item);
  }
}
