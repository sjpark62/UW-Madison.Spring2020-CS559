# README file for Workbook (Assignment) 9

It is the student's responsibility to fill this in.
See <https://graphics.cs.wisc.edu/WP/cs559-sp2019/workbooks/#README_files>

## please answer these first three required questions "inline" (as in the instructions)

Name: Feifan Wu

WiscID: fwu62

GitHub Login: fwu96

## please answer these next (optional) questions on a line following the questions

Attributions:

https://opengameart.org/content/cloudy-skyboxes

https://pixabay.com/photos/pattern-fabric-desktop-abstract-3108126/

https://3dtextures.me/2019/03/14/wood-tiles-001/

http://texturify.com/category/environment-panoramas.html

Parts of the Assignment you did (or did not) do:

Did you do any bonus parts? Yes

Did you add any texture or object files? Yes

Notes to the Grader:

For the three textures I found online used in this assignment, I attach the links above

For the page 7:
   - I added a cube into the world on the plane, which slowly rotates
   - I create another camera `myCamera` and scene `rtScene` try to do multi-pass render
   - I add some lights into `rtScene` to make the sphere I added into the scene more brighter
   - I add a sphere into `rtScene`, and a very big plane with color `#EC407A` (a plum red) behind the sphere to make it looks like a background
   - I use a `WebGLRenderTarget` object `rt` to store the first rendering as a texture
   - I first rendering by `world.renderer.render(rtScene, myCamera, rt);` to store the rendered scene as a texture, then use is as the texture of the cube in the normal scene
   - Then call the `draw` function to render the normal scene
   - As the cube rotating, I also make the sphere rotating in its onw scene
   - I use a texture when I create the sphere, so it is easy to see that as long as the cube rotating, the sphere is also animate on each surface of the cube