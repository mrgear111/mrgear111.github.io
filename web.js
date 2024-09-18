// Your Three.js setup and animation code
function initThreeJS() {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500); // Adjust far value
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejsContainer').appendChild(renderer.domElement);

    // Load the moon texture from local file
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('moon.jpg'); // Ensure the correct path

    // Create moon material
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: moonTexture,
        side: THREE.DoubleSide
    });

    // Create the moon geometry with higher segments
    const moonGeometry = new THREE.SphereGeometry(2, 64, 64); // Increase segments for smoother sphere
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    // Add lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);

    // Position the camera
    camera.position.set(0, 0, 10);

    // Handle keyboard input to move the moon
    window.addEventListener('keydown', (event) => {
        const key = event.key;
        const moveAmount = 0.1; // Slower movement speed

        if (key === 'ArrowUp') {
            moon.position.y += moveAmount;
        } else if (key === 'ArrowDown') {
            moon.position.y -= moveAmount;
        } else if (key === 'ArrowLeft') {
            moon.position.x -= moveAmount;
        } else if (key === 'ArrowRight') {
            moon.position.x += moveAmount;
        }
    });

    // Handle slider input to adjust rotation speed
    const slider = document.getElementById('rotationSpeed');
    const speedValue = document.getElementById('speedValue');
    let rotationSpeed = parseFloat(slider.value);

    slider.addEventListener('input', () => {
        rotationSpeed = parseFloat(slider.value);
        speedValue.textContent = rotationSpeed.toFixed(3);
    });

    // Animate the scene
    function animate() {
        requestAnimationFrame(animate);
        moon.rotation.y += rotationSpeed; // Use rotation speed from slider
        renderer.render(scene, camera);
    }
    animate();

    // Adjust camera and renderer on window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
