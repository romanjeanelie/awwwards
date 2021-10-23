varying vec3 vNormal;

void main(){
    vec3 color = vec3(0.); 
    color += vNormal.g * 0.6; 
    gl_FragColor = vec4(color, 1.);
}