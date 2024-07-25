const panorama = new PANOLENS.ImagePanorama( 'images/loby1.jpeg' );
const panorama2 = new PANOLENS.ImagePanorama('images/loby2.jpeg');
const panorama1 = new PANOLENS.ImagePanorama('images/panel1.jpeg');
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
    controlButtons: [],            // Buttons array in the control bar. Default to ['fullscreen', 'setting', 'video']
    autoHideControlBar: false,        // Auto hide control bar
    autoHideInfospot: true,            // Auto hide infospots
    horizontalView: false,            // Allow only horizontal camera control
    cameraFov: 60,                // Camera field of view in degree
    reverseDragging: false,            // Reverse orbit control direction
    enableReticle: false,            // Enable reticle for mouseless interaction
    dwellTime: 1500,            // Dwell time for reticle selection in millisecond
    autoReticleSelect: true,        // Auto select a clickable target after dwellTime
    viewIndicator: false,            // Adds an angle view indicator in upper left corner
    indicatorSize: 30,            // Size of View Indicator
    output: 'console'
});

panorama1.link( panorama2, infospotPositions[0]);
panorama2.link( panorama, infospotPositions[1]);
panorama.link( panorama1, infospotPositions[2]);

viewer.add( panorama1,panorama2,panorama );

