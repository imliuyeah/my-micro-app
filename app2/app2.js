//app2.js
let domEl;
export function bootstrap(props) {
    return Promise
      .resolve()
      .then(() => {
        domEl = document.createElement('div');
        domEl.innerHTML = '我是app2的内容';
        domEl.id = 'app2';
    });
}
export function mount(props) {
  return Promise
  .resolve()
  .then(() => {
      // 在这里通常使用框架将ui组件挂载到dom。
      document.querySelector('#app').appendChild(domEl);
    });
}
export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
        // 在这里通常是通知框架把ui组件从dom中卸载。
        const target = document.querySelector('#app2')
        target.remove()
    })
}