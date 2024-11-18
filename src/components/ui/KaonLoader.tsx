"use client";

import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { useLayoutEffect, useRef } from "react";
import { NoSsr, styled } from "@mui/material";

export function KaonLoader() {
  return (
    <NoSsr>
      <LoaderCanvas />
    </NoSsr>
  );
}

function LoaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const renderer = initializeCanvas(canvasRef.current);

    return renderer.stop;
  }, []);

  return <StyledCanvas ref={canvasRef} />;
}

const StyledCanvas = styled("canvas")({
  fontSize: "inherit",
  width: "1em !important",
  height: "1em !important",
  border: "1px solid #3A3A3A",
  borderRadius: "50%",
});

function initializeCanvas(canvas: HTMLCanvasElement) {
  const width = canvas.offsetWidth * 2;
  const height = canvas.offsetHeight * 2;

  const guiObject = {
    timeSpeed: 0.013,
    order: 2,
    degree: 4,
    lineWidth: 2.5,
    lineCount: 9,
    lineMultiplier: 15,
    color1: "#fff",
    color2: "#3A3A3A",
    easing: "linear",
    cameraType: "PerspectiveCamera",
    radius: 0.8,
    rotation: Math.PI / 2,
    offsetX: 0,
    offsetY: -79.4,
    enableMouse: 0,
    cameraFov: 57,
  };
  // create basic scene
  let camera = null;
  const scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    guiObject.cameraFov,
    width / height,
    0.1,
    1000
  );
  camera.position.z = 3.3;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color(guiObject.color1));

  const renderPass = new RenderPass(scene, camera);
  renderPass.clearAlpha = 0;
  const fxaaPass = new ShaderPass(FXAAShader);
  const outputPass = new OutputPass();
  const composer = new EffectComposer(renderer);
  composer.setSize(width, height);

  const pixelRatio = window.devicePixelRatio;
  fxaaPass.material.uniforms["resolution"].value.x =
    1 / (renderer.domElement.offsetWidth * pixelRatio);
  fxaaPass.material.uniforms["resolution"].value.y =
    1 / (renderer.domElement.offsetHeight * pixelRatio);

  fxaaPass.renderToScreen = true;
  composer.addPass(renderPass);
  composer.addPass(fxaaPass);
  composer.addPass(outputPass);

  // add object
  const vs = vertexShader;
  const fs = fragmentShader;

  const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshBasicMaterial,
    vertexShader: vs,
    fragmentShader: fs,
    color: new THREE.Color(guiObject.color1),
    uniforms: {
      uTime: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(
        new THREE.Vector2(window.innerWidth, window.innerHeight)
      ),
      uMouse: new THREE.Uniform(new THREE.Vector2(0, 0)),
      // uTexture: new THREE.Uniform(shText),
      uOrder: new THREE.Uniform(guiObject.order),
      uDegree: new THREE.Uniform(guiObject.degree),
      uLineWidth: new THREE.Uniform(guiObject.lineWidth),
      uLineCount: new THREE.Uniform(guiObject.lineCount),
      uLineMultiplier: new THREE.Uniform(guiObject.lineMultiplier),
      uColor1: new THREE.Uniform(new THREE.Color(guiObject.color1)),
      uColor2: new THREE.Uniform(new THREE.Color(guiObject.color2)),
      uEasing: new THREE.Uniform(guiObject.easing),
      uRotation: new THREE.Uniform(guiObject.rotation),
      uRadius: new THREE.Uniform(guiObject.radius),
      uOffsetX: new THREE.Uniform(guiObject.offsetX),
      uOffsetY: new THREE.Uniform(guiObject.offsetY),
      uEnableMouse: new THREE.Uniform(guiObject.enableMouse),
    },
    side: THREE.FrontSide,
  });
  const geometry = new THREE.SphereGeometry(2, 64, 64);

  const plane = new THREE.Mesh(geometry, material);
  plane.castShadow = false;
  // scale geometry to make it flat circle
  plane.scale.set(1, 1, 0.01);
  scene.add(plane);
  camera.lookAt(plane.position);

  // create donat geometry
  const donatGeometry = new THREE.TorusGeometry(2.5, 0.5, 16, 100);
  const donatMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(guiObject.color1),
    depthTest: false,
  });
  const donat = new THREE.Mesh(donatGeometry, donatMaterial);

  donat.position.set(0, 0, 0);
  scene.add(donat);

  // resize handling
  /*
    window.addEventListener(
        "resize",
        () => {
            renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);
            // update uniforms
            plane.material.uniforms.uResolution.value = new THREE.Vector2(
                canvas.offsetWidth,
                canvas.offsetHeight
            );
            camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
            camera.updateProjectionMatrix();
        },
        false
    );
    */

  let renderStopped = false;
  const render = () => {
    if (renderStopped) {
      return;
    }

    requestAnimationFrame(render);
    // update uniforms
    if (plane.material.uniforms)
      plane.material.uniforms.uTime.value += guiObject.timeSpeed;
    composer.render();
  };

  render();

  return {
    stop: () => {
      renderStopped = true;
    },
  };
}

const vertexShader = `
uniform float uTime;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormale;
varying vec3 cameraPos;


void main() {
    vNormale = normal;
    vPosition = position;
    vUv = uv;
    cameraPos = position;
    vec3 mPos = position;
    vec3 n = normalize(mPos);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(mPos, 1.0);
}
`;

const fragmentShader = `
precision highp float;

// uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vUv;
varying vec3 vNormale;
varying vec3 vPosition;
uniform int uOrder;
uniform int uDegree;
uniform float uLineWidth;
uniform float uLineCount;
uniform float uLineMultiplier;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform int uEasing;
varying vec3 cameraPos;
uniform float uRadius;
uniform float uRotation;
uniform float uOffsetX;
uniform float uOffsetY;
uniform float uEnableMouse;


#define SQRT2PI 2.506628274631
#define HALF_PI 1.5707963267948966

float sineInOut(float t) {
  return -0.5 * (cos(PI * t) - 1.0);
}

// factorial
float fac(int n) {
  float res = 1.0;
  for (int i = n; i > 1; i--)
      res *= float(i);
  return res;
}
// double factorial
float dfac(int n) {
  float res = 1.0;
  for (int i = n; i > 1; i-=2)
      res *= float(i);
  return res;
}
// fac(l-m)/fac(l+m) but more stable
float fac2(int l, int m) {
  int am = abs(m);
  if (am > l)
      return 0.0;
  float res = 1.0;
  for (int i = max(l-am+1,2); i <= l+am; i++)
      res *= float(i);
  if (m < 0)
      return res;
  return 1.0 / res;
}


// complex exponential
vec2 cexp(vec2 c) {
  return exp(c.x)*vec2(cos(c.y), sin(c.y));
}

// complex multiplication
vec2 cmul(vec2 a, vec2 b) {
  return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

// complex conjugation
vec2 conj(vec2 c) { return vec2(c.x, -c.y); }

// complex/real magnitude squared
float sqr(float x) { return x*x; }
float sqr(vec2 x) { return dot(x,x); }

// associated legendre polynomials
float legendre_poly(float x, int l, int m) {
  if (l < abs(m))
      return 0.0;
  if (l == 0)
      return 1.0;
  float mul = m >= 0 ? 1.0 : float((~m&1)*2-1)*fac2(l,m);
  m = abs(m);
  // recursive calculation of legendre polynomial
  float lp1 = 0.0;
  float lp2 = float((~m&1)*2-1)*dfac(2*m-1)*pow(1.0-x*x, float(m)/2.0);
  for (int i = m+1; i <= l; i++) {
      float lp = (x*float(2*i-1)*lp2 - float(i+m-1)*lp1)/float(i-m);
      lp1 = lp2; lp2 = lp;
  }
  return lp2 / mul;
}

vec2 sphere_harm(float theta, float phi, int l, int m) {
  float abs_value = 1.0/SQRT2PI*sqrt(float(2*l+1)/2.0*fac2(l,m))
                    *legendre_poly(cos(theta), l, m);
  return cexp(vec2(0.0,float(m)*phi))*abs_value;
}

float sineIn(float t) {
    return sin((t - 1.0) * HALF_PI) + 1.0;
}

float sdCircle( vec2 p, float r )
{
    float d = length(p) - r;
    float edgeWidth = fwidth(d); // Compute the width of the edge
    return smoothstep(-edgeWidth, edgeWidth, d);
}

vec2 rotate2d (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
vec3 rotate3d (vec3 _st, float _angle) {
    _st -= 0.5;
    _st =  mat3(cos(_angle),-sin(_angle), 0.0,
                sin(_angle),cos(_angle), 0.0,
                0.0, 0.0, 1.0) * _st;
    _st += 0.5;
    return _st;
}

void main() {
    vec2 uv = vUv;
    vec3 norm = vNormale;
    norm.y += uOffsetY * 0.01;
    if(uEnableMouse == 1.0) {
        norm.y += -uMouse.y;
    }
    vec3 n = normalize(norm);
    vec3 color = uColor1;
    float time = uTime;

    if(uEasing == 4) {
        time = sineIn(uTime);
    }

    float sinTheta = sqrt(1.0 - n.y * n.y);
    float phi = sinTheta > 0.0 ? atan(n.x, n.z) : 0.0;
    float theta = atan(sinTheta, n.y);
    int degree = uDegree;
    int order = uOrder;

    // compute spherical harmonics
    vec2 sh1 = sphere_harm(theta, phi, degree, order);
    float off = uOffsetX;
    if(uEnableMouse == 1.0) {
        off += uMouse.x;
    }
    sh1 = rotate2d(sh1, off);


    float r = length(sh1); // convert from Cartesian to Polar coordinates
    float theta1 = atan(sh1.y, sh1.x);
    float edgeWidth = 0.1;

    float circle = 0.0;
    // rotate x
    if(sh1.x < 0.0 || sh1.x > 0.0) {
        vec2 sh2 = mod(fract(sh1) + time * 0.1, 1.0);

        // Compute the distance to the circle and smooth it
        float dCircle = sin(mod(sh2.x * uLineCount, 1.0)) * 10.;
        circle = smoothstep(-edgeWidth, edgeWidth, (1.0 * uLineWidth) - abs(dCircle));
    }


    color = mix(uColor1, uColor2, circle);

    vec4 final = vec4(color, 1.0);

    // don't render some area
    vec2 posRotated = rotate2d(cameraPos.xz, HALF_PI);

    if(posRotated.x < uRadius) {
       final = vec4(uColor1, 1.0);
    }

    // render black line on the not rendered area
    if(posRotated.x - uRadius < uLineWidth * 0.01 && posRotated.x - uRadius > -uLineWidth * 0.01) {
        final = vec4(uColor2, 1.0);
    }

    csm_DiffuseColor = final;

    //csm_DiffuseColor = vec4(vec3(0.0), 1.0);

    //csm_DiffuseColor = vec4(1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`;
