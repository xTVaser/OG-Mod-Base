#version 430 core

out vec4 color;
in vec3 vtx_color;
in vec2 vtx_st;
in float fog;


uniform sampler2D tex_T0;

uniform vec4 fog_color;
uniform int ignore_alpha;

uniform int decal_enable;


void main() {
    vec4 T0 = texture(tex_T0, vtx_st);

    if (decal_enable == 0) {
        color.xyz = vtx_color * T0.xyz;
    } else {
        color.xyz = T0.xyz * 0.5;
    }
    color.w = T0.w;
    color *= 2;


    if (ignore_alpha == 0 && color.w < 0.128) {
        discard;
    }

    color.xyz = mix(color.xyz, fog_color.rgb, clamp(fog, 0, 1));
}
