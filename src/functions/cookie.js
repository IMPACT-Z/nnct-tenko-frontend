class Cookie {
    constructor(document) {
        this.document = document;
        if (this.document.cookie === '')
            this.data = {};
        else
            this.data = this.document.cookie.split(';').slice(0, -1).reduce((result, item) => {
                const [key, value] = item.split('=').map(item2 => item2.trim());
                result[key] = value;
                return result;
            }, {});
    }
    pop(key) {
        const rawValue = this.data[encodeURIComponent(key)];
        if (!rawValue) return null;
        return decodeURIComponent(rawValue);
    }
    push(key, value) {
        this.document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};`;
    }
}

export default Cookie;