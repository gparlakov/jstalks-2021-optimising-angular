import { UserService, User } from '../../core';
import { HeaderComponent } from './header.component';
import { autoSpy } from 'autoSpy';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    // expect(c).toEqual
  });
});

function setup() {
  const userService = autoSpy(UserService);
  const builder = {
    userService,
    default() {
      userService.currentUser = of({} as User);
      return builder;
    },
    build() {
      return new HeaderComponent(userService);
    }
  };

  return builder;
}
