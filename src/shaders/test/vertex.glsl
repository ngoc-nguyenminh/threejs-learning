// uniform mat4 projectionMatrix; // Transforms coordinate into clip space coordinate
// uniform mat4 viewMatrix; // Transforms camera (position, rotation, near, far, fov)
// uniform mat4 modelMatrix; // Transforms mesh (position, rotation, scale)
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
// varying float vElevation;
// varying float vRandom;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // float elevation = sin(modelPosition.x * uFrequency.x - uTime * 0.001) * 0.1;
    // elevation += sin(modelPosition.y * uFrequency.y - uTime * 0.001) * 0.1;

    // modelPosition.z += elevation;
    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    // vRandom = aRandom;
    vUv = uv;
    // vElevation = elevation;
}