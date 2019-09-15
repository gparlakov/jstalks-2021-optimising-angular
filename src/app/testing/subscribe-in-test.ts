import { isObservable, Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

/**
* A helper function that subscribes to observable and aggregates the values in an array for ease of use.
* @param to$ The observable to subscribe to
* @param untilOrTimes The subscription ending count or other observable to signal the end of subscription
* @example
* // arrange
const values = subscribe(c.dealDocument$, destroy$);
// act
c.approveDocuments([{ docId: '1123' } as DocumentAndIcon]);
// assert
expect(values[1]).toEqual([{ docId: '1235', blobUrl: undefined, icon: 'assets/images/disclosure.svg' }]);
*/
export function subscribe<T>(to$: Observable<T>, untilOrTimes: number | Observable<any> = 1) {
  const values = [];

  const piped$ = isObservable(untilOrTimes)
    ? to$.pipe(takeUntil(untilOrTimes))
    : to$.pipe(take(untilOrTimes as number));
  piped$.subscribe(v => values.push(v), e => values.push({ error: e }));

  return values;
}
