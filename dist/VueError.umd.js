/*!
 vue-error-plugin v1.0.0
 * 
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.VueError = factory());
}(this, function () { 'use strict';

    function isPromise(ret) {
        return (ret && typeof ret.then === 'function' && typeof ret.catch === "function")
    }
    const errorHandler = (error, vm, info) => {
        console.error('抛出全局异常');
        console.error(vm);
        console.error(error);
        console.error(info);
    };
    function registerActionHandle(actions) {
        Object.keys(actions).forEach(key => {
            let fn = actions[key];
            actions[key] = function (...args) {
                let ret = fn.apply(this, args);
                if (isPromise(ret)) {
                    return ret.catch(errorHandler)
                } else { // 默认错误处理
                    return ret
                }
            };
        });
    }
    const registerVuex = (instance) => {
        if (instance.$options['store']) {
            let actions = instance.$options['store']['_actions'] || {};
            if (actions) {
                let tempActions = {};
                Object.keys(actions).forEach(key => {
                    tempActions[key] = actions[key][0];
                });
                registerActionHandle(tempActions);
            }
        }
    };
    const registerVue = (instance) => {
        if (instance.$options.methods) {
            let actions = instance.$options.methods || {};
            if (actions) {
                registerActionHandle(actions);
            }
        }
    };

    let VueError = {
        install: (Vue, options) => {
            /**
             * 全局异常处理
             * @param {
             * } error 
             * @param {*} vm 
             */
            console.log('VueErrorInstallSuc');
            Vue.config.errorHandler = errorHandler;
            Vue.mixin({
                beforeCreate() {
                    registerVue(this);
                    registerVuex(this);
                }
            });
            Vue.prototype.$throw = errorHandler;
        }
    };

    return VueError;

}));
//# sourceMappingURL=VueError.umd.js.map
