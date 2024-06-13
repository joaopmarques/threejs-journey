import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI({
    width: 220,
    title: "Mess around with The Cube",
    closeFolders: true,
})
const debugObject = {}
const cubeTweaks = gui.addFolder('Cube Tweaks').close()
const funCubeActivities = gui.addFolder('Fun Cube Activities')

window.addEventListener('keydown', (e) => {
    if (e.key == 'h') {
        gui.show(gui._hidden)
    }
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#ffff00'
debugObject.wireframe = true
debugObject.subdivision = 2

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
    color: debugObject.color,
    wireframe: debugObject.wireframe,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

cubeTweaks.add(mesh.position, 'y', -1.5, 1.5)
cubeTweaks.addColor(debugObject, 'color')
    .onChange(() => {
        material.color.set(debugObject.color)
    })

cubeTweaks.add(material, 'wireframe')
cubeTweaks.add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1,
            1,
            1,
            debugObject.subdivision,
            debugObject.subdivision,
            debugObject.subdivision,
        )
    })

debugObject.spin = () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}

debugObject.jump = () => {
    gsap.to(mesh.position, { duration: 0.3, y: mesh.position.y + 0.3, yoyo: true, repeat: 1 })
}

debugObject.barrelRoll = () => {
    gsap.to(mesh.rotation, { duration: 1, z: mesh.rotation.z + Math.PI * 2 })
}

funCubeActivities.add(debugObject, 'spin')
funCubeActivities.add(debugObject, 'jump')
funCubeActivities.add(debugObject, 'barrelRoll').name('do a barrel roll!')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()