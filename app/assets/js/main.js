
    var container, scene, renderer, camera, light, clock, loader;
    var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

    container = document.querySelector('.viewport');
// var TWEEN = require('tween.js');
    clock = new THREE.Clock();

    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

    VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 10000;

    scene = new THREE.Scene();

    scene.rotation.x = 0;
    scene.rotation.y = 0;
    scene.rotation.z = 0;
    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    renderer.shadowMapAutoUpdate = true;
    renderer.setClearColor( 0xffffff, 1 );
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    mirrorCamera = new THREE.CubeCamera( 1, 10, 1024);
    camera.position.set( 0.9438040162673711, 10.003468049378036, -0.47581897317684135);
    camera.rotation.x = -Math.PI / 12;

    scene.add(camera);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.target.set(0,0,0);
		controls.update();
    controls.maxPolarAngle = Math.PI/2-0.094;
    controls.enablePan = false;
    controls.maxDistance = 13;
    controls.minDistance = 5.5;


    light = new THREE.DirectionalLight(0xffffff);
    light.intensity = 0.17;
    light.position.set(100, 100, -150);
    light.castShadow = true;
    light.shadowCameraLeft = -3;
    light.shadowCameraTop = -3;
    light.shadowCameraRight = 2;
    light.shadowCameraBottom = 2;
    light.shadowCameraNear = 1;
    light.shadowCameraFar = 400;
    light.shadowBias = -.0001
    light.shadowMapWidth = light.shadowMapHeight = 1024;
    light.shadowDarkness = .001;
    // light.shadow.bias = 1;


    var ambient = new THREE.AmbientLight( 0xFFFFFF);
    var point = new THREE.PointLight( 0xFFFFFF, 0.3, 1000 );
    // point.castShadow = true;
    point.shadowCameraLeft = -2;
    point.shadowCameraTop = -2;
    point.shadowCameraRight = 2;
    point.shadowCameraBottom = 2;
    point.shadowCameraNear = 1;
    point.shadowCameraFar = 1000;
    point.shadowBias = -.0001
    point.shadowMapWidth = point.shadowMapHeight = 256;
    point.shadowDarkness = .001;
    // point.intensity = 0.9;
    ambient.intensity = 0.9;
    scene.add(light);
    scene.add(ambient, point);
    point.position.x = 1;
    point.position.y = 3;
    point.position.z = 5;
    loader = new THREE.JSONLoader();
    scene.add(mirrorCamera);
    var mesh, container;
    var maxAnisotropy = renderer.getMaxAnisotropy();
    var floor_geometry = new THREE.BoxGeometry( 10, 0.001, 10);
    var floor_material = new THREE.MeshBasicMaterial( { envMap: mirrorCamera.renderTarget } );

        var planeGeo = new THREE.PlaneBufferGeometry( 100.1, 100.1 );
        var groundMirror = new THREE.Mirror( renderer, camera, { clipBias: 1, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0xECECEC } );
        var texture = groundMirror.material;
        var mirrorMesh = new THREE.Mesh( planeGeo, texture );
				mirrorMesh.add( groundMirror );
				mirrorMesh.rotateX( - Math.PI / 2 );


    var maze_geometry = new THREE.BoxGeometry(1,0.3,0.01);
    var maze_geometry2 = new THREE.BoxGeometry(5,0.3,0.01);
    var maze_material = new THREE.MeshLambertMaterial(
    { color: 0x000000}
    );
    var yellow_material = new THREE.MeshLambertMaterial(
    { color: 0x54D1AF}
    );
    var maze = new THREE.Mesh(
      maze_geometry,
      maze_material
    );
    var maze2 = new THREE.Mesh(
      maze_geometry,
      maze_material
    );
    var maze3 = new THREE.Mesh(
      maze_geometry,
      maze_material
    );
    var maze4 = new THREE.Mesh(
      maze_geometry,
      maze_material
    );
    var maze5 = new THREE.Mesh(
      maze_geometry2,
      maze_material
    );
    var maze6 = new THREE.Mesh(
      maze_geometry2,
      maze_material
    );
  // maze2
  var center = new THREE.Mesh();
  var center2 = new THREE.Mesh();
  var mazeLineGeom = new THREE.Geometry();
  var mazeLineGeom2 = new THREE.Geometry();
  var mazeLineGeom3 = new THREE.Geometry();

  var yellowGeom = new THREE.Geometry();

  mazeLineGeom.vertices.push(
    new THREE.Vector3(0, 0, 0 ),
    new THREE.Vector3( 0, 0, 1 ),
    // new THREE.Vector3( -1, 0, 1 ),
    new THREE.Vector3( -1, 0, 0 )
  );
  mazeLineGeom2.vertices.push(
    new THREE.Vector3(0, 0, 0 ),
    new THREE.Vector3( 0, 1, 0 ),
    new THREE.Vector3( 1, 1, 0 ),
    new THREE.Vector3( 1, 0, 0 )
  );
  mazeLineGeom3.vertices.push(
    new THREE.Vector3(0, 0, 0 ),
    new THREE.Vector3( 0, 0.10, 0 ),
    new THREE.Vector3( 8, 0.10, 0 ),
    new THREE.Vector3( 8, 0, 0 )
  );
  yellowGeom.vertices.push(
    new THREE.Vector3(0, 0, 0 ),
    new THREE.Vector3( 0, 0.15, 0 ),
    new THREE.Vector3( 7, 0.15, 0 ),
    new THREE.Vector3( 7, 0, 0 )
  );

  mazeLineGeom.faces.push( new THREE.Face4( 0, 1, 2, 3 ) );
  mazeLineGeom2.faces.push( new THREE.Face3( 0, 1, 2 ) );
  mazeLineGeom2.faces.push( new THREE.Face3( 0, 2, 3 ) );

  mazeLineGeom3.faces.push( new THREE.Face3( 0, 1, 2 ) );
  mazeLineGeom3.faces.push( new THREE.Face3( 0, 2, 3 ) );

  yellowGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
  yellowGeom.faces.push( new THREE.Face3( 0, 2, 3 ) );
  mazeLineGeom.computeBoundingSphere();
  mazeLineGeom2.computeBoundingSphere();
  mazeLineGeom3.computeBoundingSphere();
  yellowGeom.computeBoundingSphere();
  var mazeShape = new THREE.Mesh( mazeLineGeom, maze_material );
  var mazeShape2 = new THREE.Mesh( mazeLineGeom2, maze_material );
  var mazeShape3 = new THREE.Mesh( mazeLineGeom3, maze_material );
  var yellowShape = new THREE.Mesh( yellowGeom, yellow_material );


  mazeShape.position.y = 2;
  mazeShape2.position.y = 3;
  mazeShape2.position.x = 0;

  mazeShape3.position.x = -3
  // yellowShape.position.x = 1;
  // yellowShape.position.z = 2;
  yellowShape.position.set(-3, 1.5, -1);
  yellowShape.rotation.y = -Math.PI/4;

  var position = camera.position;
  center2.add(mazeShape, mazeShape2, mazeShape3, yellowShape, center);
  var tween =  new TWEEN.Tween( position ).to( {
  					x: 3.2082860101275177, y: 12.158120414010359, z: -3.299546768215996 }, 8000 )
  					.easing( TWEEN.Easing.Quartic.InOut ).delay(2000).start();
  var tween2 =  new TWEEN.Tween( position ).to( {
  					x: -4.217951970039052, y: 11.951513296555966, z: -2.8931317116041537 }, 8000 )
  					.easing( TWEEN.Easing.Quartic.InOut );
  var tween3 =  new TWEEN.Tween( position ).to( {
  					x: -0.000009226082225396355, y: 12.999999999993499, z: 0.000009158570126944982}, 8000 )
  					.easing( TWEEN.Easing.Quartic.InOut );



  tween.chain(tween2);
  tween2.chain(tween3);
  tween3.chain(tween);

// new position
  tween.onUpdate(function(){
      camera.position.x = position.x;
      camera.position.y = position.y;
      camera.position.z = position.z;
  });
  tween2.onUpdate(function(){
      camera.position.x = position.x;
      camera.position.y = position.y;
      camera.position.z = position.z;
  });
  tween3.onUpdate(function(){
      camera.position.x = position.x;
      camera.position.y = position.y;
      camera.position.z = position.z;
  });
  maze2.position.x = -0.5;
  maze2.position.z = -0.5;
  maze2.rotation.y = Math.PI/2;

  maze3.position.x = 0.5;
  maze3.position.z = -0.5;
  maze3.rotation.y = Math.PI/2;

  maze4.position.z = -1;
  maze5.position.z = -0.5;
  maze5.rotation.y = Math.PI/4;

  maze5.position.z = -0.5;
  maze5.rotation.y = Math.PI/4;

  maze6.position.z = 0.5;
  maze6.rotation.y = Math.PI/4;
  center.position.z = 0.5;
  center.add(maze, maze2, maze3, maze4, maze5, maze6);
  scene.add(center2);

      floor = new THREE.Mesh(
        floor_geometry,
        floor_material
      );
      mirrorCamera.position = floor.position;
      floor.receiveShadow = true;
      // mesh.add(line);
      center2.add(floor);
center2.add( mirrorMesh );
      scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
      vasa = 0;
      render();
    // });
    center2.direction = 1;
    function render() {
     var time = clock.getElapsedTime();
      camera.lookAt(center2.position);
    	floor.visible = true;

      floor.visible = false;
      mirrorCamera.position.copy( floor.position );
      mirrorCamera.rotation.set (0,0,0);
      //Render the scene
      // center2.rotation.y += 0.003;
      // if (center2.rotation.x > 0.2){
      //   center2.rotation.x-= 0.001;
      // } else {
      //   center2.rotation.x+= 0.001;
      // }
      //
      // if (center2.rotation.y > 1){
      //   center2.direction =-1;
      // } else {
      //   center2.direction =1;
      // }
      // center2.rotation.y +=  center2.direction * 0.003;
      groundMirror.updateTextureMatrix();
      groundMirror.render();
      renderer.render( scene, camera );
     TWEEN.update();

     vasa++;
     if(vasa<4){
      //  console.log(cameraPath);
     }
     requestAnimationFrame(render);
    }
