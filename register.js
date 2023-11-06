/*
 * @Author: liuye liuye@shinho.net.cn
 * @Date: 2023-11-05 23:11:34
 * @LastEditors: liuye liuye@shinho.net.cn
 * @LastEditTime: 2023-11-06 20:53:36
 * @FilePath: \my-micro-app\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as singleSpa from './micro.js';

//main.js
const name1 = 'app1';
const app1 = () => import('./app1/app1.js');
const activeWhen1 = '/app1';
singleSpa.registerApplication({ name: name1, app: app1, activeWhen: activeWhen1 });

const name2 = 'app2';
const app2 = () => import('./app2/app2.js');
const activeWhen2 = '/app2';
singleSpa.registerApplication({ name: name2, app: app2, activeWhen: activeWhen2 });

singleSpa.start();