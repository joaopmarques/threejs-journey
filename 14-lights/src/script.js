import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
const lightsFolder = gui.addFolder('Lights')
const pointLightFolder = gui.addFolder('Point Light')
const rectAreaLightFolder = gui.addFolder('RectArea Light')
const spotLightFolder = gui.addFolder('Spot Light')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

// Ambient Light
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffeecc)
ambientLight.intensity = 0.25

scene.add(ambientLight)
lightsFolder.add(ambientLight, 'intensity').min(0).max(2).step(0.05).name('ambientLight intensity')

// Directional Light
const directionalLight = new THREE.DirectionalLight()
directionalLight.position.set(1, 0.25, 0)
directionalLight.color = new THREE.Color(0x00fffc)
directionalLight.intensity = 0.9

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false

scene.add(directionalLight)
lightsFolder.add(directionalLight, 'intensity').min(0).max(2).step(0.05).name('directionalLight intensity')
lightsFolder.add(directionalLightHelper, 'visible').name('show helper')

// Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight()
hemisphereLight.position.set(0, 0.25, 2)
hemisphereLight.color = new THREE.Color(0xff0000)
hemisphereLight.groundColor = new THREE.Color(0x0000ff)
hemisphereLight.intensity = 0.9

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)
hemisphereLightHelper.visible = false

scene.add(hemisphereLight)
lightsFolder.add(hemisphereLight, 'intensity').min(0).max(2).step(0.05).name('hemisphereLight intensity')
lightsFolder.add(hemisphereLightHelper, 'visible').name('show helper')

// Point Light
const pointLight = new THREE.PointLight()
pointLight.position.set(1, -0.5, 1)
pointLight.color = new THREE.Color(0xff9000)
pointLight.intensity = 1.5
pointLight.distance = 0
pointLight.decay = 2

scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)
pointLightHelper.visible = false

pointLightFolder.add(pointLight, 'intensity').min(0).max(8).step(0.05).name('intensity')
pointLightFolder.add(pointLight, 'distance').min(0).max(5).step(0.5).name('distance')
pointLightFolder.add(pointLight, 'decay').min(0).max(4).step(0.05).name('decay')
pointLightFolder.add(pointLightHelper, 'visible').name('show helper')

// RectArea Light
const rectAreaLight = new THREE.RectAreaLight()
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())

rectAreaLight.color = new THREE.Color(0x4e00ff)
rectAreaLight.intensity = 6
rectAreaLight.width = 1
rectAreaLight.height = 1

scene.add(rectAreaLight)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)
rectAreaLightHelper.visible = false

rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(20).step(0.05).name('intensity')
rectAreaLightFolder.add(rectAreaLight, 'width').min(0).max(5).step(0.05).name('width')
rectAreaLightFolder.add(rectAreaLight, 'height').min(0).max(5).step(0.05).name('height')
rectAreaLightFolder.add(rectAreaLightHelper, 'visible').name('show helper')

// Spot Light
const spotLight = new THREE.SpotLight()
spotLight.position.set(0, 2, 3)
spotLight.color = new THREE.Color(0x78ff00)
spotLight.intensity = 5
spotLight.distance = 10
spotLight.angle = Math.PI * 0.075
spotLight.penumbra = 0.18
spotLight.decay = 1

scene.add(spotLight)
scene.add(spotLight.target)
spotLight.target.position.x = - 0.5
spotLight.target.position.y = -0.5

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
spotLightHelper.visible = false

spotLightFolder.add(spotLight, 'intensity').min(0).max(20).step(0.05).name('intensity')
spotLightFolder.add(spotLight, 'distance').min(0).max(20).step(0.5).name('distance')
spotLightFolder.add(spotLight, 'angle').min(0).max(Math.PI).step(0.05).name('angle')
spotLightFolder.add(spotLight, 'penumbra').min(0).max(1).step(0.05).name('penumbra')
spotLightFolder.add(spotLight, 'decay').min(0).max(4).step(0.05).name('decay')
spotLightFolder.add(spotLight.target.position, 'x').min(-5).max(5).step(0.05).name('target x')
spotLightFolder.add(spotLight.target.position, 'y').min(-5).max(5).step(0.05).name('target y')
spotLightFolder.add(spotLight.target.position, 'z').min(-5).max(5).step(0.05).name('target z')
spotLightFolder.add(spotLightHelper, 'visible').name('show helper')

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.5
material.metalness = 0.2

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()