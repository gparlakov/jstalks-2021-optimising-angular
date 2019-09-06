import { UserService } from './core';
import { AppComponent } from './app.component';
import { autoSpy } from 'autoSpy';

describe('AppComponent', () => {
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
      return builder;
    },
    build() {
      return new AppComponent(userService);
    }
  };

  return builder;
}
