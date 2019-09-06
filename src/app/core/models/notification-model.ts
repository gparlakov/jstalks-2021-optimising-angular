export class NotificationModel {
  constructor(public text: string, public type: 'success' | 'error' = 'success') {}
}
