I used the following resources to create my scene in THREE.js:

-I used a lot of the examples to build shapes, lighting, and texture shading from these website:
	-https://threejs.org/examples/#webgl_animation_cloth
	-https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_shapes.html
	-https://threejs.org/docs/#api/en/materials/Material.flatShading
	-https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
	-https://threejs.org/docs/#api/en/materials/MeshPhongMaterial
	-https://www.youtube.com/watch?v=VdnN5nuxj-s
	-https://threejs.org/docs/#api/en/lights/shadows/LightShadow
	-https://bl.ocks.org/duhaime/f7341fcffc0b7bc224fccbd08c5f9629 -- framebuffer/texture
-I used this to get my color codes: https://htmlcolorcodes.com/


For the robot arm I used the following tutorial to figure out inverse kinematics:

-https://www.youtube.com/watch?v=hbgDqyy8bIw&t=917s

For robot in general :
-https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web
-https://evanw.github.io/lightgl.js/docs/matrix.html
Majority of the rest was based off of the course notes: Hierarchical Modeling lecture notes



NOTE: I did get texture working for my scene  on my html file! However, you do need to set up a local host on your own machine using the command http-server . -p 8000. Also uncomment the texture material in the floor section of my html script; line 328



To interact with my scene:

- you can click the most and swipe right or left to see it rotate. 
- If you press enter/return you can change the scene between night and day

Techniques I used:
- Basic geometry, as well as unique geometry.
- I used rotation as well as translations/transformations. 
- I used shadows, as well as using phongs reflection and shading. 
- I used shading to make the geometric shapes seem glossy and shiny. 
- If you enable the texture by using the steps above, the ground will be sand. 
- I used several lighting techniques, such as ambient and directional. 
- implemented texture and frambuffer on the stars!