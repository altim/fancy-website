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

    // 3 octaves - optimized for performance
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 smokeUv = vUv;

    // Constant upward drift from bottom to top
    smokeUv.y -= uTime * 0.08;

    // Turbulent horizontal movement - simplified
    smokeUv.x += sin(uTime * 0.6 + vUv.y * 4.0) * 0.12;
    smokeUv.x += sin(uTime * 0.4 + vUv.y * 3.0) * 0.08;

    // Two layers of noise for turbulent smoke - optimized
    float smoke1 = fbm(smokeUv * 2.5);
    float smoke2 = fbm(smokeUv * 4.5 + vec2(uTime * 0.2, -uTime * 0.1));

    // Combine noise layers
    float smokeNoise = smoke1 * 0.6 + smoke2 * 0.4;

    // Vertical gradient - denser at bottom, completely fades out at top
    float gradient = smoothstep(1.0, 0.0, vUv.y);

    // Aggressive fade out at the top to ensure complete transparency
    // Fades from y=0.4 (visible) to y=0.8 (invisible at 80% of page)
    float topFade = smoothstep(0.8, 0.4, vUv.y);

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
