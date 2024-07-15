const panorama = new PANOLENS.ImagePanorama( 'images/panel1.jpeg' );
const panorama2 = new PANOLENS.ImagePanorama('images/pano5.jpg');
const panorama1 = new PANOLENS.ImagePanorama('images/img.jpg');
let imageContainer = document.querySelector('.image-container')


var infospotPositions = [
    new THREE.Vector3(-2136.06, 16.30, 890.14),
    new THREE.Vector3(-3136.06, 296.30, -4290.14),
    
  ];

const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: true,
});

panorama1.link( panorama2, infospotPositions[0]);
panorama2.link( panorama, infospotPositions[1]);
panorama.link( panorama, infospotPositions[2]);

viewer.add( panorama1,panorama2,panorama );

