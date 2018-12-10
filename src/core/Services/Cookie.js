import CookiesManager from 'universal-cookie';
import { COOKIE_PREFIX } from '~core/constants';
import { cookieConfig } from '~core/defaults';

class Cookie {
    static instance = {};
    isAllowed;
    CookiesManager;
    options;
    nameSpace;

    constructor(config = {}) {
        const {
                  isAllowed = cookieConfig.isAllowed,
                  maxAge    = cookieConfig.maxAge,
                  nameSpace = cookieConfig.nameSpace
              } = config;

        if (Cookie.instance[nameSpace]) {
            return Cookie.instance[nameSpace];
        }
        Cookie.instance[nameSpace] = this;

        this.nameSpace = nameSpace;
        this.isAllowed = isAllowed;
        this.options   = {
            path:   '/',
            maxAge: maxAge * 3600 // converting from hours to the seconds
        };

        if (this.isAllowed) {
            this.CookiesManager = new CookiesManager();
            if (!this.getAll()) {
                this.CookiesManager.set([COOKIE_PREFIX + this.nameSpace], {}, this.options);
            }
        }
    }

    get(name) {
        if (!this.isAllowed) {
            return undefined;
        }

        return this.getAll()[name];
    }

    getAll() {
        if (!this.isAllowed) {
            return undefined;
        }

        return this.CookiesManager.get([COOKIE_PREFIX + this.nameSpace]);
    }

    set(name, value) {
        if (this.isAllowed) {
            const cookieObj = this.getAll();
            cookieObj[name] = value;
            this.CookiesManager.set([COOKIE_PREFIX + this.nameSpace], cookieObj, this.options);
        }

        return this;
    }

    setAll(obj) {
        if (this.isAllowed) {
            Object.entries(obj).forEach(([name, value]) => this.set(name, value));
        }

        return this;
    }
}

export default Cookie;