import { Injectable } from '@angular/core';
import { STAGE } from '../models/product-stage.model';
import { ProductStageItem } from '../models/product-stage.model';


@Injectable()
export class ProductionStageService{

  constructor() { }

  private items: ProductStageItem[] = [];
  stages: STAGE[] = ['idea', 'prototype', 'development', 'ship'];

  addItem(itemName: string): void {
    if (itemName.trim()) {
      const item: ProductStageItem = {
        id: Date.now(),
        name: itemName.trim(),
        stage: 'idea'
      };
      this.items.push(item);
    }
  }

  removeItem(currentItem: ProductStageItem): void{
    this.items = this.items.filter(item => item.id !== currentItem.id);
  }

  getItemsByStage(stage: string): ProductStageItem[] {
    return this.items.filter(item => item.stage === stage);
  }

  moveForward(item: ProductStageItem): void {
    const currentIndex = this.stages.indexOf(item.stage);
    if (currentIndex < this.stages.length - 1) {
      item.stage = this.stages[currentIndex + 1];
    }
  }

  moveBackward(item: ProductStageItem): void {
    const currentIndex = this.stages.indexOf(item.stage);
    if (currentIndex > 0) {
      item.stage = this.stages[currentIndex - 1];
    }
  }
}

