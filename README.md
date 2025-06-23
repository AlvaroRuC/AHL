# Atlas Historique du Limousin

Système de projection privilégié : EPSG : 3857

## Conversion de l’AHL en Maplibre ?

### Fait

- [x] Définir une emprise pour la fenêtre de carte.

- [x] Prévoir un volet latéral pour afficher des informations.

### À faire facilement

- [X] Afficher des couches web (google, osm, ign -> BD Ortho, cadastre, éléments BD Topo):

Couches vectorielles ?

- [] Parcelles cadastrales,
- [] Limites administratives (communes ou d'autres?): sur OpenFreeMap

WMS:

- [] Carte topographique ??
- [] Carte topographique en noire et blanc ?? Voir geoportail. https://www.geoportail.gouv.fr/carte
- [X] Photographie aerienne 2017 ->  2023
- [?] Photographie aerienne 1965-1980
- [X] Photographie aerienne 1950-1965
- [X] Carte de l'État-Major

- [] Altitude MNT

Projections EPSG : 3857

Ça marche pour des couches wms, et pas (?) pour des couches vecteur.

- [] Afficher des couches en 3D en fonction du relief (ajouter des bâtiments).

J'ai besoin du Terrain RGB tile

- [ ] Afficher des couches vectoriel avec des étiquettes éventuelles et/ou infobulle.

### Le plus compliqué

- [ ] Gérer l’affichage de ces couches:

- [/] afficher/masquer,
- [/] opacité,  
- [?] changer l’ordre, 

- [/] afficher légende si disponible, 

- [/] slider si possible, 

- [ ] zoomer sur l’emprise de la couche, 

- [ ] gérer l’affichage de la couche en fonction du zoom si nécessaire. ??

Minumum, afficher/masquer, et opacité 
avec 
https://github.com/mug-jp/maplibre-gl-opacity 
ou
https://www.npmjs.com/package/mapbox-layer-control

### Plugins à tester

Creer de points
https://maplibre.org/maplibre-gl-js/docs/examples/maplibre-gl-terradraw/

Gerer opacité des couches
https://github.com/mug-jp/maplibre-gl-opacity

Swipe between maps
https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-compare/
https://github.com/maplibre/maplibre-gl-compare

Une autre possibilité:
https://maplibre.org/maplibre-gl-js/docs/examples/sync-move/

https://github.com/Beilinson/mapbox-layer-groups

Maputnik
https://geoservices.ign.fr/documentation/services/utilisation-sig/tutoriel-maputnik

WMS IGN ici: 
https://data.geopf.fr/wms-r?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities


2 :  Gestion des photos

Prévoir un modèle de BDD intégrant les infos sur les photos (datation, localisation prise de vue, auteur, thématique/mot clé, liste des lieux vu)
Photos déjà géolocalisées -> affiche une couche avec la localisation de la prise de vue
Réfléchir à un moyen de visualiser ce qui est vu sur la photo (bâtiment/objet, emprise ?)
Interagir avec les points pour afficher la photo et les infos
Compléter les informations sur les photos (autre interface ? galerie photo ? formulaire ? Système de validation ou modération ?)

https://github.com/JamesLMilner/terra-draw

3 : Tutoriel
Prévoir un tutoriel pour l’utilisation de(s) interface(s)


