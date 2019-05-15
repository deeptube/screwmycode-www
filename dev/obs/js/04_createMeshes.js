/**
 * scene elements
 */

let backgroundGroup
let intermediateGroup
let frontGroup

/**
 * Mesh Controller
 * @type {Function}
 */

const createMeshController = () => {

  /**
   * START
   */

  /**
   * creating groups
   * @type {Group}
   */

  backgroundGroup = new THREE.Group()
  intermediateGroup = new THREE.Group()
  frontGroup = new THREE.Group()

  scene.add(
    backgroundGroup,
    intermediateGroup,
    frontGroup,
  )

  /**
   * creating materials
   * @type {material}
   */

  // let uniforms = {
  //       colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
  //       colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
  //   }

  // let uniforms = {
  //       time: {type: "f", value: 0.0},
  //   }

  var textureLoader = new THREE.TextureLoader()

  uniforms = {
          "fogDensity": { value: 0.45 },
          "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
          "time": { value: 1.0 },
          "uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
          "texture1": { value: textureLoader.load( 'js/vendor/texture/cloud.png' ) },
          "texture2": { value: textureLoader.load( 'js/vendor/texture/lavatile.jpg' ) }
        };

  uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
  uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

  shaderMaterial =  new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  })


  /**
   * creating background geometries
   * @type {SphereBufferGeometry}
   */

  const backgroundSphere = new THREE.SphereBufferGeometry(
    _scale.default,
    10,
    10,
  )

  /**
   * creating background materials
   * Different material 
   */

  // const backgroundMaterial = new THREE.MeshLambertMaterial( { color: _grad.color[0], side: THREE.DoubleSide, flatShading: true, } )
  const backgroundMaterial = new THREE.MeshBasicMaterial( { color: _grad.color[0], side: THREE.DoubleSide, flatShading: true, transparent: true, opacity: 0.25} )
  var wireframeMaterial = new THREE.MeshBasicMaterial( { color: _grad.color[0],  wireframe: true, transparent: false, opacity: 1 } )
  var lineDashMaterial = new THREE.LineDashedMaterial({ color: 0x210123, dashSize: 1, gapSize: 1 })

  /**
   * creating meshes
   * geometry + material
   * @type {Mesh}
   */

  const backgroundSphereMesh = new THREE.Mesh( backgroundSphere, wireframeMaterial )
  var wireframe = new THREE.Mesh( backgroundSphere, wireframeMaterial )
  var lineDash = new THREE.Line( backgroundSphere, lineDashMaterial )
  lineDash.computeLineDistances()

  // backgroundSphereMesh.add(wireframe)
  // backgroundSphereMesh.add(lineDash)

  /**
   * adding meshes to background group
   */

  backgroundGroup.add(backgroundSphereMesh)

  /**
   * creating intermediate geometries
   * @type {SphereBufferGeometry}
   */

  const intermediateSphere = new THREE.SphereBufferGeometry(
    _scale.intermediate,
    10,
    10,
  )

  /**
   * creating intermediate materials
   * Wireframe + Solide
   */

  const intermediateMaterial = new THREE.MeshBasicMaterial( { color: 0x0c0119, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } )
  wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xdfd0e0,  wireframe: true, transparent: true } )

  /**
   * creating meshes
   * geometry + material
   * @type {Mesh}
   */

  const intermediateSphereMesh = new THREE.Mesh( intermediateSphere, wireframeMaterial) 
  // wireframe = new THREE.Mesh( intermediateSphere, wireframeMaterial )
  // intermediateSphereMesh.add(wireframe)

  /**
   * adding meshes to background group
   */

  intermediateGroup.add(intermediateSphereMesh)

  /**
   * creating front geometries
   * @type {BoxBufferGeometry}
   */
  
  // const frontCube = new THREE.BoxBufferGeometry(
  //   _scale.default * _scale.front,
  //   _scale.default * _scale.front,
  //   _scale.default * _scale.front,
  // )
  const frontCube = new THREE.TorusBufferGeometry( 0.65, 0.3, 30, 30 )
  // const frontCube = new THREE.SphereBufferGeometry(
  //    _scale.default * _scale.front,
  //   10,
  //   10,
  // )

  /**
   * creating fromt material
   * material
   * @type {Standard materail}
   */

  const frontCubeMaterial =  new THREE.MeshStandardMaterial({ 'color': 0x110000, flatShading: true, })

  /**
   * creating meshes
   * geometry + material
   * @type {Mesh}
   */

  const frontCubeMesh = new THREE.Mesh(frontCube,shaderMaterial)

  /**
   * adding meshes to front group
   */

  frontGroup.add(frontCubeMesh)

  /**
   * END
   */

}