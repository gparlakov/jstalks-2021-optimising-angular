import { LogService } from './log.service';

describe('LogServices', () => {
  it('should be constructed ', () => {
    const l = new LogService();
    expect(l).toBeDefined();
  });

  it('when error method called should call the console.log ', () => {
    console.log = jest.fn();
    const l = new LogService();
    l.error();
    expect(console.log).toHaveBeenCalled();
  });

  it('when error called should call the console.log with error message', () => {
    console.log = jest.fn();
    const l = new LogService();
    l.error(new Error('test message'));
    expect(console.log).toHaveBeenCalledWith('test message');
  });
});
