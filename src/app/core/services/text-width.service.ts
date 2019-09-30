import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class TextWidthService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  fitTextIn(text: string, maxWidthPx: number, maxHeightPx: number) {
    document = this.document;
    const p = document.createElement('p');
    p.innerText = text;
    p.style.width = maxWidthPx + 'px';
    p.style.maxWidth = maxWidthPx + 'px';

    p.style.height = maxHeightPx + 'px';
    p.style.maxHeight = maxHeightPx + 'px';

    p.style.overflowY = 'hidden';
    p.style.textOverflow = 'ellipsis';

    p.style.visibility = 'hidden';
    document.body.appendChild(p);
    const cutOffText = p.innerText;

    document.body.removeChild(p);
    return cutOffText;
  }
}
