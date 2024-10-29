export type STAGE = ('idea' | 'prototype' | 'development' | 'ship');

export interface ProductStageItem {
  id: number,
  name: string,
  stage: STAGE
}