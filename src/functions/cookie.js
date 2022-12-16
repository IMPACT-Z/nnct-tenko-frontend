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
        console.log('this.data', this.data);
    }
    pop(key) {
        const rawValue = this.data[encodeURIComponent(key)];
        if (!rawValue) return null;
        this.document.cookie = `${encodeURIComponent(key)};`;
        return decodeURIComponent(rawValue);
    }
    push(key, value) {
        this.document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};`;
        // this.document.cookie = `expires=${(new Date(new Date().getTime()+2000)).toUTCString()}`
        console.log('push', this.document.cookie);
    }
}

export default Cookie;