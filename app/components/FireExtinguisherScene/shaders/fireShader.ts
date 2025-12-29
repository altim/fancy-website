export const fireVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fireFragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  varying vec2 vUv;

  // Improved noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise based on Morgan McGuire
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;

    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;

    // Create upward moving fire effect
    vec2 fireUv = uv;
    fireUv.y -= uTime * 0.12; // Upward movement

    // Multiple layers of noise for more complex fire
    float fireNoise1 = fbm(fireUv * 2.5 + vec2(uTime * 0.3, 0.0));
    float fireNoise2 = fbm(fireUv * 5.0 + vec2(-uTime * 0.5, -uTime * 0.3));
    float fireNoise3 = fbm(fireUv * 8.0 + vec2(uTime * 0.4, -uTime * 0.6));

    // Combine noise layers
    float fireNoise = fireNoise1 * 0.5 + fireNoise2 * 0.3 + fireNoise3 * 0.2;

    // Create fire shape - stronger at bottom, fading at top
    float heightGradient = 1.0 - smoothstep(0.0, 0.8, uv.y);

    // Add variation to the height gradient
    heightGradient += fireNoise * 0.3;
    heightGradient = clamp(heightGradient, 0.0, 1.0);

    // Create fire intensity
    float fireIntensity = heightGradient * (0.5 + fireNoise * 0.5);

    // Fire color gradient based on intensity
    vec3 darkRed = vec3(0.1, 0.0, 0.0);
    vec3 red = vec3(0.9, 0.15, 0.0);
    vec3 orange = vec3(1.0, 0.4, 0.0);
    vec3 yellow = vec3(1.0, 0.85, 0.15);

    // Create color based on fire intensity with more variation
    vec3 fireColor = mix(darkRed, red, smoothstep(0.1, 0.35, fireIntensity));
    fireColor = mix(fireColor, orange, smoothstep(0.25, 0.5, fireIntensity));
    fireColor = mix(fireColor, yellow, smoothstep(0.4, 0.75, fireIntensity));

    // Add flickering effect
    float flicker = sin(uTime * 10.0 + uv.x * 20.0) * 0.03 +
                    sin(uTime * 15.0 + uv.y * 15.0) * 0.02;
    fireColor *= 1.0 + flicker;

    // Add subtle glow
    float glow = pow(fireIntensity, 2.5) * 0.15;
    fireColor += vec3(glow * 0.8, glow * 0.4, glow * 0.1);

    // Adjust brightness based on scroll progress
    fireColor *= 0.65 + uProgress * 0.35;

    gl_FragColor = vec4(fireColor, 1.0);
  }
`;
