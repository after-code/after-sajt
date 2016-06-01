
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
    // renderer.shadowMapEnabled = true;
    // renderer.shadowMapSoft = true;
    // renderer.shadowMapType = THREE.PCFShadowMap;
    // renderer.shadowMapAutoUpdate = true;
    renderer.setClearColor( 0xffffff, 1 );
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    mirrorCamera = new THREE.CubeCamera( 1, 10, 1024);
    camera.position.set( 0.5105396863227961, 3.643376153074933, -1.3890251433637397);

    camera.rotation.x = -Math.PI / 12;

    scene.add(camera);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.target.set(0,0,0);
		controls.update();
    controls.maxPolarAngle = Math.PI/2-0.094;
    // controls.enablePan = false;
    controls.maxDistance = 13;
    // controls.minDistance = 5.5;

    //
    // light = new THREE.DirectionalLight(0xffffff);
    // light.intensity = 0.17;
    // light.position.set(100, 100, -150);
    // light.castShadow = true;
    // light.shadowCameraLeft = -3;
    // light.shadowCameraTop = -3;
    // light.shadowCameraRight = 2;
    // light.shadowCameraBottom = 2;
    // light.shadowCameraNear = 1;
    // light.shadowCameraFar = 400;
    // light.shadowBias = -.0001
    // light.shadowMapWidth = light.shadowMapHeight = 1024;
    // light.shadowDarkness = .001;
    // // light.shadow.bias = 1;


    var ambient = new THREE.AmbientLight( 0xFFFFFF);
    var point = new THREE.PointLight( 0xFFFFFF, 0.3, 1000 );
    // point.castShadow = true;
    // point.shadowCameraLeft = -2;
    // point.shadowCameraTop = -2;
    // point.shadowCameraRight = 2;
    // point.shadowCameraBottom = 2;
    // point.shadowCameraNear = 1;
    // point.shadowCameraFar = 1000;
    // point.shadowBias = -.0001
    // point.shadowMapWidth = point.shadowMapHeight = 256;
    // point.shadowDarkness = .001;
    // point.intensity = 0.9;
    ambient.intensity = 0.9;
    // scene.add(light);
    scene.add(ambient);
    point.position.x = 1;
    point.position.y = 3;
    point.position.z = 5;
    loader = new THREE.JSONLoader();
    scene.add(mirrorCamera);
    var mesh, container;
    var maxAnisotropy = renderer.getMaxAnisotropy();
    var floor_geometry = new THREE.BoxGeometry( 10, 0.001, 10);
    var floor_material = new THREE.MeshBasicMaterial( { envMap: mirrorCamera.renderTarget } );

        var planeGeo = new THREE.PlaneBufferGeometry( 10, 10 );
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
    { color: 0xff4646}
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
    new THREE.Vector3( 0, 0, 4 ),
    // new THREE.Vector3( -1, 0, 1 ),
    new THREE.Vector3( -4, 0, 0 )
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

var mazeCont = new THREE.Mesh();
  mazeShape.position.y = 2;
  mazeShape2.position.y = 3;
  mazeShape2.position.x = 0;

  mazeShape3.position.x = -3
  // yellowShape.position.x = 1;
  // yellowShape.position.z = 2;
  yellowShape.position.set(-3, 1.5, -1);
  yellowShape.rotation.y = -Math.PI/4;
  var view = {
    position: camera.position,
    rotation : {
      x: camera.rotation.x,
      y:camera.rotation.y,
      z:camera.rotation.z
    }
  };
  var rotation = {
    x: -3.047493474219677 ,
    y: -0.04584905340038268,
    z: -3.137267058875789
  }
  //  view.position = camera.position;
  //  view.rotation = camera.rotation;

  var fov = {};
  fov.uno = 10;
  var position2 = {
    x:0,
    y:0,
    z:0
  }
  camera.fov =10;
  var vasa = 40;
  camera.updateProjectionMatrix();
  center2.add(mazeShape, mazeShape2, mazeShape3, yellowShape, center);
  var tween =  new TWEEN.Tween( view.position).to( {
  					z: -10  }, 1400 )
  					.easing( TWEEN.Easing.Quadratic.Out );

  var tween5 =  new TWEEN.Tween( view.position ).to({ y:15.24936767630562154},1200 )
  					.easing( TWEEN.Easing.Quadratic.In );

  var tween7 =  new TWEEN.Tween( rotation ).to({x: -2.2554387824359834},1200 )
  					.easing( TWEEN.Easing.Quadratic.In );

  var tween8 =  new TWEEN.Tween( rotation ).to({x: -1.8876330848263423, y: 0.30203039260633513, z: 2.4048065724721672 -Math.PI *2},1500 )
  					.easing( TWEEN.Easing.Quartic.Out );

  var tween6 =  new TWEEN.Tween( view.position ).to({	x: 5,  z: -5}, 1500 )
  					.easing( TWEEN.Easing.Quartic.Out );

  var tween9 =  new TWEEN.Tween( rotation ).to({x: -1.570797026242877, y: 7.053619697217657e-7, z: 2.3586584817828173 -Math.PI *2},1500 )
  					.easing( TWEEN.Easing.Quartic.In );

  var tween10 =  new TWEEN.Tween( view.position ).to({	x: 0.18717662734015728, y:13.039731858009107,  z: 0.04883000162822242}, 1500 )
  					.easing( TWEEN.Easing.Quartic.In );

  var tween11 =  new TWEEN.Tween( position2 ).to({	x: 2, y:0 , z:2}, 1500 )
  					.easing( TWEEN.Easing.Quartic.Out );

  var tween2 =  new TWEEN.Tween( view.position ).to( {
  					x: -4.217951970039052, y: 11.951513296555966, z: -2.8931317116041537 }, 3000 )
  					.easing( TWEEN.Easing.Quartic.InOut );
  var tween3 =  new TWEEN.Tween( view.position ).to( {
  					x: -0.000009226082225396355, y: 12.999999999993499, z: 0.000009158570126944982}, 3000 )
  					.easing( TWEEN.Easing.Quartic.InOut );

  var tween4 =  new TWEEN.Tween( fov ).to( {uno:40}, 1400 )
            .easing( TWEEN.Easing.Quadratic.In );

  tween4.delay(2500).start();
  tween4.chain(tween);
  tween.chain(tween5, tween7);
  tween7.chain(tween6, tween8);
  tween8.chain(tween9, tween10);
  tween10.chain(tween11);
  // tween4.chain(tween5, tween6);
  // tween6.chain(tween);
  // tween.chain(tween7);
  // tween.chain(tween2);
  // tween2.chain(tween3);
  // tween3.chain(tween);

// new position
tween11.onUpdate(function(){
  mazeCont.position.x = position2.x;
  mazeCont.position.y = position2.y;
  mazeCont.position.z = position2.z;
});
  tween.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;

      //
      // camera.rotation.x = rotation.x;
      // camera.rotation.y = rotation.y;
      // camera.rotation.z = rotation.z;
      // console.log(rotation);
      // camera.lookAt(mazeShape2.position);
  });
  tween6.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;
  });
  tween5.onUpdate(function(){
      camera.rotation.x = rotation.x;
      camera.rotation.y = rotation.y;
      camera.rotation.z = rotation.z;
      // camera.lookAt(center2.position);
  });
  tween7.onUpdate(function(){
      camera.rotation.x = rotation.x;
      camera.rotation.y = rotation.y;
      camera.rotation.z = rotation.z;
      // camera.lookAt(center2.position);
  });
  tween8.onUpdate(function(){
      camera.rotation.x = rotation.x;
      camera.rotation.y = rotation.y;
      camera.rotation.z = rotation.z;

      // camera.lookAt(center2.position);
  });
  tween9.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;
  });
  tween10.onUpdate(function(){
      camera.rotation.x = rotation.x;
      camera.rotation.y = rotation.y;
      camera.rotation.z = rotation.z;

      // camera.lookAt(center2.position);
  });
  tween2.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;
      camera.lookAt(center2.position);
  });
  tween3.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;
      camera.lookAt(center2.position);
  });
  tween4.onUpdate(function(){
    // console.log(fov);
      camera.fov = fov.uno;
      camera.updateProjectionMatrix();
        // camera.lookAt(mazeShape2.position);
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
  var mazeCont = new THREE.Mesh();
  mazeCont.add(maze, maze2, maze3, maze4, maze5, maze6);
  center.add(mazeCont);
  scene.add(center2);

  var cameraPosX = 0.44426790438853775;
  var cameraPosY = 3.6624066401248725;
  var cameraPosZ =  -1.9126542045900217;
  camera.position.set(0.44426790438853775,3.6624066401248725,  -1.9126542045900217);
  camera.rotation.set(-3.047493474219677, -0.04584905340038268, -3.137267058875789);

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
    // camera.lookAt(mazeShape2.position);
    function render() {
     var time = clock.getElapsedTime();
      // camera.lookAt(center2.position);
      floor.visible = false;
      mirrorCamera.position.copy( floor.position );
      mirrorCamera.rotation.set (0,0,0);
      groundMirror.render();
      renderer.render( scene, camera );
     TWEEN.update();

     vasa++;
     if(vasa<4){
      //  console.log(cameraPath);
     }
     requestAnimationFrame(render);
    }
