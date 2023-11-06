/*
 * @Author: liuye liuye@shinho.net.cn
 * @Date: 2023-11-06 00:09:50
 * @LastEditors: liuye liuye@shinho.net.cn
 * @LastEditTime: 2023-11-06 20:53:53
 * @FilePath: \my-micro-app\micro.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let started = false;
let apps = [];

function pathToActiveWhen(testPath) {
  // 当前路径是否以path开头
  return function (location) {
      // 移除 URL 中的协议、主机和端口部分
    const path = location.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/g, '');

    // 检查剩余的部分是否包含给定的路由
    return path.includes(testPath);
  };
}

export function registerApplication(options) {
  const {
    name,
    app,
    customProps
  } = options
  let { activeWhen } = options
  activeWhen = typeof activeWhen === "function" ? activeWhen : pathToActiveWhen(activeWhen)
  apps.push({
    name: name,
    loadApp: app,
    activeWhen,
    customProps: customProps,
    status: 'NOT_LOADED'
  });
}

export function start() {
  started = true;
  reroute();
}

export function reroute() {
  const activeApps = [];
  const inactiveApps = [];

  apps.forEach(app => {
    if (app.activeWhen(window.location.href)) {
      activeApps.push(app);
    } else {
      inactiveApps.push(app);
    }
  });

  activeApps.forEach(async app => {
    if (app.status === 'NOT_LOADED') {
      app.loadApp().then(result => {
        app.status = 'NOT_BOOTSTRAPPED';
        app.bootstrap = result.bootstrap;
        app.mount = result.mount;
        app.unmount = result.unmount;
      }).then(() => {
        app.bootstrap().then(() => {
          app.status = 'NOT_MOUNTED';
        }).then(() => {
          app.mount();
          app.status = 'NOT_MOUNTED';
        }).then(() => {
          app.status = 'MOUNTED';
        });
      })
    }
  });

  inactiveApps.forEach(async app => {
    if (app.status === 'MOUNTED') {
      app.status = 'UNMOUNTING';
      app.unmount().then(() => {
        app.status = 'NOT_LOADED';
      });
    }
  });
}

window.addEventListener('hashchange', reroute);
window.addEventListener('popstate', reroute);