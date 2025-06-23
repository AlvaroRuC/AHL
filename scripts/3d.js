//3D
const modelOrigin = [1.25762, 45.82857];
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
  scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
};

const THREE = window.THREE;

const models3d = {
  id: "boucherie",
  type: "custom",
  renderingMode: "3d",
  modelLoaded: true,
  onAdd(map, gl) {
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.map = map;

    // Lumières
    const sunLight = new THREE.DirectionalLight(0xffdd99, 0.5);
    sunLight.position.set(0, 100, 100);
    this.scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    // Position et transformation du modèle
    const modelOrigin = [1.25762, 45.82857];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
    const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    this.modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    });
    this.renderer.autoClear = false;

    // Chargement du modèle
    const loader = new THREE.GLTFLoader();
    loader.load(
      "./donnees/3d/boucherie.glb",
      (gltf) => {
        this.scene.add(gltf.scene);
        this.modelLoaded = true;
        map.triggerRepaint();
      },
      undefined,
      (error) => {
        console.error("Erreur de chargement GLB :", error);
      }
    );
  },

  render(gl, { defaultProjectionData }) {
    if (!this.modelLoaded) return;

    const rotationX = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(1, 0, 0),
      this.modelTransform.rotateX
    );
    const rotationY = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 1, 0),
      this.modelTransform.rotateY
    );
    const rotationZ = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 0, 1),
      this.modelTransform.rotateZ
    );

    const m = new THREE.Matrix4().fromArray(defaultProjectionData.mainMatrix);
    const l = new THREE.Matrix4()
      .makeTranslation(
        this.modelTransform.translateX,
        this.modelTransform.translateY,
        this.modelTransform.translateZ
      )
      .scale(
        new THREE.Vector3(
          this.modelTransform.scale,
          -this.modelTransform.scale,
          this.modelTransform.scale
        )
      )
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.resetState();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  },
};

map.on("style.load", () => {

  if (!THREE.GLTFLoader) {
    console.error(
      "⚠️ GLTFLoader n'est pas disponible. Vérifie le chargement du script !"
    );
    return; // on empêche d'ajouter la couche si le loader n'est pas prêt
  }

  // Ajout de la couche 3D seulement si tout est prêt
  map.addLayer(models3d);

  // Optionnel : rendre visible si masqué
  map.setLayoutProperty("boucherie", "visibility", "none");
});
