import { UserService } from './core';
import { AppComponent } from './app.component';
import { PusherService } from './core/services/pusher.service';
import { NotificationsService } from './core/services/notifications.service';

describe('AppComponent', () => {
  it('when ngOnInit is called it should call populate on UserService', () => {
    // arrange
    const userService: UserService & { populate: jest.Mock<any> } = { populate: jest.fn() } as any;

    const notify: NotificationsService & { success: jest.Mock<any> } = {
      success: jest.fn
    } as any;

    const c = new AppComponent(userService, notify);
    // act
    c.ngOnInit();
    // assert
    expect(userService.populate).toHaveBeenCalledTimes(1);
  });

  it('when ngOnInit is called it should call populate on UserService', () => {
    // arrange
    const userService: UserService & { populate: jest.Mock<any> } = { populate: jest.fn() } as any;
    const notify: NotificationsService & { success: jest.Mock<any> } = {
      success: jest.fn()
    } as any;

    const c = new AppComponent(userService, notify);
    // act
    c.ngOnInit();
    // assert
    expect(notify.success).toHaveBeenCalledWith('Welcome!');
  });
});
