class ListItemCard extends HTMLElement {
    static #cssPromise = null;
    static #htmlPromise = null;
    static #sheet = null;
    static #template = null;

    static get observedAttributes() {
        return ['tag', 'img', 'title', 'description', 'href'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._ready = this._loadResources();
    }

    async _loadResources() {
        if (!ListItemCard.#cssPromise) {
            ListItemCard.#cssPromise = this.get('/components/list-item/list-item.css')
                .then(async cssText => {
                    const sheet = new CSSStyleSheet();
                    await sheet.replace(cssText);
                    ListItemCard.#sheet = sheet;
                });
        }
        if (!ListItemCard.#htmlPromise) {
            ListItemCard.#htmlPromise = this.get('/components/list-item/list-item.html')
                .then(html => ListItemCard.#template = html);
        }

        await Promise.all([ListItemCard.#cssPromise, ListItemCard.#htmlPromise]);

        this.shadowRoot.adoptedStyleSheets = [ListItemCard.#sheet];
        this.shadowRoot.innerHTML = ListItemCard.#template;

        this.$ = {
            img: this.shadowRoot.getElementById('imgElm'),
            title: this.shadowRoot.getElementById('titleElm'),
            desc: this.shadowRoot.getElementById('descElm'),
            link: this.shadowRoot.getElementById('linkElm'),
        };

        this._render();
    }

    get(url) {
        return fetch(url).then(r => r.text());
    }

    connectedCallback() {
        this._ready.then(() => this._render());
    }

    attributeChangedCallback() {
        this._ready.then(() => this._render());
    }

    _render() {
        if (!this.$) {
            return;
        }

        this.$.img.src = this.getAttribute('img') || '';
        this.$.img.alt = this.getAttribute('title') || '';
        this.$.title.textContent = this.getAttribute('title') || '';
        this.$.desc.textContent = this.getAttribute('description') || '';

        const href = this.getAttribute('href');
        if (href) {
            this.$.link.href = href;
        } else {
            this.$.link?.remove();
        }
    }
}

customElements.define('list-item-card', ListItemCard);
