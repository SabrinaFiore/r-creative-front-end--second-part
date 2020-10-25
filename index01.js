// Three js exercise
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});
// background-color
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// make canvas responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
// MeshLamberMaterial - yellow
var material = new THREE.MeshLambertMaterial({color: '#384bf5'});

meshX = -10;

for(var i = 0; i <20; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x += (Math.random() -0.5) * 10;
    mesh.position.y += (Math.random() -0.5) * 10;
    mesh.position.z += (Math.random() -0.5) * 10;
    scene.add(mesh);
    meshX+1;
}

// color of the light - white
var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0, 0, 25);
scene.add(light);

var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function onMouseMove(event) {
    event.preventDefault();

    // documentation
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set('rgb(0, 8, 92)')
        this.tl = new TimelineMax(); 
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI*.5, ease: Expo.easeOut }, "=-1.5")
    }
}

render();

window.addEventListener('mousemove', onMouseMove);
