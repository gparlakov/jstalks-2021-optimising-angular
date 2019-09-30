import { BehaviorSubject } from 'rxjs';

export interface Config {
  repetitions: number;
}

export const config = new BehaviorSubject<Config>({ repetitions: 1 });
