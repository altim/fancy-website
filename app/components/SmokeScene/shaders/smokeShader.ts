export const smokeVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const smokeFragmentShader = `
  precision mediump float;

  uniform float uTime;
  varying vec2 vUv;

  // Random function
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

    // 4 octaves for smooth smoke billows
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 smokeUv = vUv;

    // Constant upward drift (not scroll-dependent)
    smokeUv.y -= uTime * 0.05;

    // Horizontal sway for organic smoke movement
    float sway = sin(uTime * 0.5 + vUv.y * 3.0) * 0.08;
    smokeUv.x += sway;

    // Add additional turbulence
    smokeUv.x += sin(uTime * 0.3 + vUv.y * 2.0) * 0.04;

    // Multiple layers of noise for complex smoke patterns
    float smoke1 = fbm(smokeUv * 2.0);
    float smoke2 = fbm(smokeUv * 4.0 + vec2(uTime * 0.15, 0.0));
    float smoke3 = fbm(smokeUv * 1.0 - vec2(0.0, uTime * 0.08));

    // Combine noise layers with more weight
    float smokeNoise = smoke1 * 0.5 + smoke2 * 0.3 + smoke3 * 0.2;

    // Vertical gradient - denser at bottom, completely fades out at top
    float gradient = smoothstep(1.0, 0.0, vUv.y);

    // Aggressive fade out at the top to ensure complete transparency
    // Fades from y=0.3 (visible) to y=0.7 (invisible)
    float topFade = smoothstep(0.7, 0.3, vUv.y);

    // Calculate smoke density
    float smokeDensity = gradient * smokeNoise * topFade;

    // Boost overall density for more visibility
    smokeDensity = pow(smokeDensity, 0.8) * 1.5;

    // Lighter gray color palette for better visibility
    vec3 darkGray = vec3(0.2, 0.2, 0.2);      // Lighter than before
    vec3 mediumGray = vec3(0.45, 0.45, 0.45); // More visible gray
    vec3 lightGray = vec3(0.65, 0.65, 0.65);  // Brighter highlights

    // Color based on smoke density
    vec3 smokeColor = mix(darkGray, mediumGray, smoothstep(0.15, 0.45, smokeDensity));
    smokeColor = mix(smokeColor, lightGray, smoothstep(0.4, 0.75, smokeDensity));

    // Higher alpha for more visible smoke
    float alpha = clamp(smokeDensity * 0.85, 0.0, 0.95);

    // Ensure complete transparency at top by applying fade again
    alpha *= topFade;

    gl_FragColor = vec4(smokeColor, alpha);
  }
`;
