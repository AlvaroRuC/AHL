// Définition du composant personnalisé
class MyCard extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Style de la carte */
                .carte {
                    position: relative;
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    margin: 10px;
                    overflow: hidden;
                }

                .etiquette {
                    position: relative;
                }

                .carte img {
                    max-width: 75%;
                }

                .carte-title {
                    font-size: 1.2em;
                    color: #333;
                    margin-right: 5px;
                }

                .carte-info {
                    color: #666;
                    margin-right: 5px;

                }

                /* Petite taille */
                @media (max-width: 600px) {
                    .etiquette {
                        position: absolute;
                        bottom: 0px;
                        background-color: rgb(0, 0, 0);
                        padding: 5px;
                        display: flex;
                        align-items: baseline;
                    }
                    .carte-title {
                        font-size: 1.2em;
                        color: #ffffff;
                        font-family: Roboto-condensed;
                    }
                    .carte-info {
                        color: #ffffff;
                        font-family: Roboto;
                        font-weight: 300;
                    }
                }
            </style>
            <div class="carte">
                <img src="" alt="Image de la carte">
                <div class="etiquette">
                    <div class="carte-title">Titre par défaut</div>
                    <div class="carte-info date">Date par défaut</div>
                </div>
            </div>
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    setCardData(imageSrc, title, date, lieu) {
        const shadow = this.shadowRoot;
        shadow.querySelector('img').src = imageSrc;
        shadow.querySelector('.carte-title').textContent = title;
        shadow.querySelector('.date').textContent = date;  // Mise à jour de la date
    }
}

// Enregistrement du composant
customElements.define('my-card', MyCard);
