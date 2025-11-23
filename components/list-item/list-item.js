class ListItemCard extends HTMLElement {
    static #css = '';
    static #template = '';
    static get observedAttributes() {
        return ['tag', 'img', 'title', 'description', 'href'];
    }

     constructor() {
        super();
        this.attachShadow({mode: 'open'});
         this._ready = this._loadResources();
    }

    async _loadResources() {
        if (!ListItemCard.#css || !ListItemCard.#template) {
            const [css, html] = await Promise.all([
                ListItemCard.#css
                    ? Promise.resolve(ListItemCard.#css)
                    : fetch('/components/list-item/list-item.css').then(r => r.text()),
                ListItemCard.#template
                    ? Promise.resolve(ListItemCard.#template)
                    : fetch('/components/list-item/list-item.html').then(r => r.text())
            ]);

            ListItemCard.#css = css;
            ListItemCard.#template = html;
        }

        // dopiero po załadowaniu
        this.shadowRoot.innerHTML = `
            <style>${ListItemCard.#css}</style>
            ${ListItemCard.#template}
        `;

        this.$ = {
            img: this.shadowRoot.getElementById('imgElm'),
            title: this.shadowRoot.getElementById('titleElm'),
            desc: this.shadowRoot.getElementById('descElm'),
            link: this.shadowRoot.getElementById('linkElm'),
        };

        this._render();
    }
    connectedCallback() {
        this._ready.then(() => this._render());
    }

    attributeChangedCallback() {
        this._ready.then(() => this._render());
    }


    _render() {
        if (!this.$) return;

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
