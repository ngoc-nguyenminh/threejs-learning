// precision mediump float;

// uniform vec3 uColor;
// uniform sampler2D uTexture;

// varying float vRandom;
varying vec2 vUv;
varying float vElevation;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    // vec4 textureColor = texture2D(uTexture, vUv);
    // textureColor.rgb *= vElevation * 2.0 + 0.5;

    // float strength = (mod(vUv.x * 10.0, 1.0)) < 0.8 && mod(vUv.y * 10.0, 1.0) < 0.8 ? 0.0 : 1.0;
    
    // float strength = (step(0.4, mod(vUv.x * 10.0 - 0.1, 1.0)) * step(0.8, mod(vUv.y * 10.0 + 0.1, 1.0)));
    // strength += (step(0.8, mod(vUv.x * 10.0 + 0.1, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.1, 1.0)));
    
    // float strength = max(abs(vUv.y - 0.5), abs(vUv.x - 0.5));

    // float strength = step(0.2, max(abs(vUv.y - 0.5), abs(vUv.x - 0.5)));
    
    // float strength = round(vUv.x * 20.0) / 20.0;
    // strength *= round(vUv.y * 20.0) / 20.0;

    // vec2 gridUv =  vec2(round(vUv.x * 20.0) / 20.0, round(vUv.y * 20.0) / 20.0);
    // float strength = random(gridUv);

    // vec2 gridUv =  vec2(
    //     round(vUv.x * 20.0) / 20.0, 
    //     round((vUv.y + vUv.x * 0.5)  * 20.0) / 20.0
    // );
    // float strength = random(gridUv);

    // float strength = 1.0 - length(vUv - 0.5);

    // float strength = 0.02 / length(vUv - 0.5);

    // vec2 lightUvX = vec2(vUv.x * 0.2 + 0.4, vUv.y);
    // float strengthX = 0.02 / length(lightUvX - 0.5);
    // vec2 lightUvY = vec2(vUv.y * 0.2 + 0.4, vUv.x );
    // float strengthY = 0.02 / length(lightUvY - 0.5);
    // float strength = strengthX * strengthY;

    vec2 lightUvX = vec2(vUv.x * 0.2 + 0.4, vUv.y);
    float strengthX = 0.02 / length(lightUvX - 0.5);
    vec2 lightUvY = vec2(vUv.y * 0.2 + 0.4, vUv.x );
    float strengthY = 0.02 / length(lightUvY - 0.5);
    float strength = strengthX * strengthY;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
    // gl_FragColor = textureColor;
}