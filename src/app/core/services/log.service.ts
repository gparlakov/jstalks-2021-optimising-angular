export class LogService {

  error(e?: Error) {
    console.log(e && e.message);
  }
}
