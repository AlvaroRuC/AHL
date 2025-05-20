<!-- Template de carte -->
<template id="card-template">
    <style>
        .card-image img {
            max-width: 100%;
            border-radius: 8px;
            display: block;
            margin: 0 auto;
        }

        .card-content {
            margin-top: 10px;
        }

        .card-content .title {
            font-size: 1.2em;
            color: #333;
        }

        .card-content .info {
            color: #666;
            font-size: 1em;
        }
    </style>
    <div class="card-image">
        <slot name="image">Image par défaut</slot>
    </div>
    <div class="card-content">
        <div class="title">
            <slot name="title">Titre par défaut</slot>
        </div>
        <div class="info">
            <slot name="date">Date par défaut</slot><br>
            <slot name="location">Lieu par défaut</slot><br>
            <slot name="cote_aml">Cote AML par défaut</slot>
        </div>
    </div>
</template>