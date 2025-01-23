# Janvier:



# Changements décembre :
[X] Bug: les photos n'affichent pas leur emprise mais toutes les emprises.
[X] Bug: quelques emprises ont plusieurs photos.
[X] Les images qui se montrent sur le volet sont les plus proches à la caméra
[] Volet dynamique:
    [X] Côté volet:s
        [X] Selection
        [X] Pas d'image repétée
        [X] Hover
    [] Côté carte
        [] Selection
        [X] Hover

[/] Moteur de recherche
[] Cluster
[] Exclure les photos qui sont cachés par le volet de la liste qui s'affiche sur le volet.
[] Ouvrir formulaire depuis le volet
[] Ouverture d'un formulaire de saisi de points et d'emprises.
[] Pour modifier les images: créer un API côté serveur qui accepte des requêtes de mise à jour (PUT, PATCH, ou POST), et cette API permettra de modifier le GeoJSON. Node.js et Express pour gérer l'API serveur??

Quel système pour geolocaliser ? Nouvelle page ou à travers la carte ?

# Changements novembre :

[x] Ajouter les modèles qui restent.
[x] Optimiser les bâtiments en 3D. Question. Où ratacher les 3D ? Couches actuelles ou couches anciennes ?
[x] Améliorer lumières.
[x] Chercher positron (tuiles vectorielles).
[x] Ajouter les 3D OSM/cadastre à sa place.
[x] Bug checkbox.js.
[x] Bug formulaire.js: Uncaught TypeError: document.getElementById(...) is null 1:10
[x] Rendre les contrôles visibles lors de l'ouverture du sidebar.

Intégrer les bâtiments 3D sur le 3D du cadastre.

# Réunion 5 novembre :

 [] Caler les 3D.
 [] Ajouter des catégories

# Réunion 14 octobre :

[] Creer de clusters pour afficher les photos (peut-être pas nécessaire si je fait le airbnb sidebar).
[] Publier des commentaires sur la photo sans inscription. Géoreferencer.
[] Posibilité d'ouvrir un formulaire.
[] Sidebar.

# Idées

[] Popup translucide (je laisse tomber cette idée)
[] Airbnb sidebar.
[] Ajouter des etiquettes sur les cartes anciennes et orthophotos.

# Index

##

### Sidebar

Propre.


Fonds de carte positron ?

Pour utiliser une base de données (comme MongoDB ou PostgreSQL avec PostGIS), il faut adapter le code serveur pour interagir.