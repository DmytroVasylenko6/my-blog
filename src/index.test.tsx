import ReactDOM from 'react-dom';
import renderToDOM from './index';

describe('test ReactDOM.render', () => {
  const originalRender = ReactDOM.render;
  const originalGetElement = global.document.getElementById;
  beforeEach(() => {
    //@ts-ignore
    global.document.getElementById = () => true;
    //@ts-ignore
    ReactDOM.render = jest.fn();
  });
  afterAll(() => {
    global.document.getElementById = originalGetElement;
    //@ts-ignore
    ReactDOM.render = originalRender;
  });
  it('should call ReactDOM.render', () => {
    renderToDOM();
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
