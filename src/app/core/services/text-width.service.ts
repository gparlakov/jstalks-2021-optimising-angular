import { Injectable } from '@angular/core';

@Injectable()
export class TextWidthService {
  constructor() {}

  fitTextIn(text: string, maxWidthPx: number, maxHeightPx: number) {
    const w = 5.88235294;
    const h = 8;
    const length = text.length;

    let row = 0;
    let width = 0;
    let i = 0;
    while (i < length) {
      width += w;
      if (width >= maxWidthPx) {
        width = 0;
        row += 1;
      }
      if (row * h >= maxHeightPx) {
        return text.slice(0, i);
      }
      i += 1;
    }

    // we never returned from above so just return the text
    return text;
  }
}
