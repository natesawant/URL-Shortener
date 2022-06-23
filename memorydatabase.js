class MemoryDatabase {
    constructor() {
        this.urls = new Map();
    }

    addLongURL(longurl) {
        let shorturl = "";
        let valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        do {
            shorturl = "";
            for (let i = 0; i < 5; i++) {
                shorturl += valid.charAt(Math.floor(Math.random() * valid.length));
            }
        } while (!this.urls.has(shorturl));

        return this.addLongURL(longurl, shorturl);
    }

    addLongURL(longurl, shorturl) {
        if (this.urls.has(shorturl)) {
            throw Error("Shortened URL is already taken.");
        } else {
            this.urls.set(shorturl, longurl);
        }

        return shorturl;
    }

    getLongURL(shorturl) {
        if (this.urls.has(shorturl)) {
            return this.urls.get(shorturl);
        } else {
            throw Error("Short URL is not valid.");
        }
    }
}

module.exports = MemoryDatabase;