class Cookie {
    constructor(document) {
        this.document = document;
        if (this.document.cookie === '')
            this.data = {};
        else
            this.data = this.document.cookie.split(';').reduce((result, item) => {
                const [key, value] = item.split('=').map(item2 => item2.trim());
                result[key] = value;
                return result;
            }, {});
    }
    get(key) {
        const rawValue = this.data[encodeURIComponent(key)];
        if (!rawValue) return null;
        return decodeURIComponent(rawValue);
    }
    set(key, value) {
        this.document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};`;
    }
    clear(key) {
        this.document.cookie = `${encodeURIComponent(key)};`;
    }
}

export default Cookie;