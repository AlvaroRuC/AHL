const component = "ahl-toggle-switch";
const template = document.createElement("template");

template.innerHTML = `
    <style>
      /* The switch - the box around the slider */
      .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 23px;
      }

      /* Hide default HTML checkbox */
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider */
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #2196f3;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }

      slot {
        margin-left: 10px;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
      }

      .toggle-swich {
        display: inline-flex;
        align-items: center;
      }

      slot {
        margin-left: 10px; /* Pour ajouter un petit espacement entre le slider et le texte */
        display: inline-block;
        vertical-align: middle; /* Assure que le slot est aligné avec l'input */
        font-size: 14px; /* Ajuster la taille de la police si nécessaire */
      }
    </style>
    <div class="toggle-swich">
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
      <slot name="etiquette">Activer la comparaison</slot>
    </div>
`;

customElements.define(
  component,

  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.append(template.content.cloneNode(true));

      const input = this.shadowRoot.querySelector('input');
      input.addEventListener('change', () => {
        // Déclenche un événement 'change' personnalisé sur le composant
        this.dispatchEvent(new Event('change'));
      });
    }
  }
);