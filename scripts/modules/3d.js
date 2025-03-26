import { map } from "./carte.js";

//Pour charger le 3D de la Boucherie

const modelOrigin = [1.25763, 45.82858];
const modelAltitude = 0;
const modelRotate = [Math.PI / 2, 0, 0];

const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
);

// transformation parameters to position, rotate and scale the 3D model onto the map
const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since our 3D model is in real world meters, a scale transform needs to be
    * applied since the CustomLayerInterface expects units in MercatorCoordinates.
    */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
};

const THREE = window.THREE;

const modeles3d = {
    id: 'boucherie-3d',
    type: 'custom',
    renderingMode: '3d',
    onAdd(map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // create two three.js lights to illuminate the model
        const sunLight = new THREE.DirectionalLight(0xffdd99, 0.5); // Couleur jaune, intensité 1
        sunLight.position.set(0, 100, 100); // Position du soleil
        sunLight.target.position.set(0, 0, 0); // Cible la scène (ou le centre de la scène)
        sunLight.castShadow = true;
        this.scene.add(sunLight);

        // lumière d'ambiance
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Couleur blanche, intensité 0.5
        this.scene.add(ambientLight);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        const loader = new THREE.GLTFLoader();
        loader.load(
            '/donnees/3d/boucherie.glb',
            // '/donnees/3d/B-22-36.glb',
            (gltf) => {
                this.scene.add(gltf.scene);
            }
        );
        // S'il faut carger plus de modèles:
        // loader.load(
        //     '/donnees/3d/B-32.glb',
        //     (gltf) => {
        //         this.scene.add(gltf.scene);
        //     }
        // );

        this.map = map;

        // use the MapLibre GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });

        this.renderer.autoClear = false;
    },
    render(gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
            .makeTranslation(
                modelTransform.translateX,
                modelTransform.translateY,
                modelTransform.translateZ
            )
            .scale(
                new THREE.Vector3(
                    modelTransform.scale,
                    -modelTransform.scale,
                    modelTransform.scale
                )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
};

export { modeles3d }