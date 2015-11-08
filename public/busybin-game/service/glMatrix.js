angular.module('bsyGame')

/**
 * Provides all the glMatrix types as injectable dependencies.
 */
/* jshint undef: false */
.value('mat2',  mat2)
.value('mat2d', mat2d)
.value('mat3',  mat3)
.value('mat4',  mat4)
.value('quat',  quat)
.value('vec2',  vec2)
.value('vec3',  vec3)
.value('vec4',  vec4);

