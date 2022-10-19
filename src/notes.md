# KEY NOTES

## SHADOWS

Shadows is a pain for devs to optimize performance. Three.js supports shadows, and basically, shadows are created by creating a camera (OrthographicCamera), at the light source, take a snapshot of the scene, creating a **Shadow Map**
PointLights cast shadows by using 6 PerspectiveCameras and make 6 renders (6 shadow maps) before render our shadows, that's a lot of work to do
In any case, try using as less shadows as possible, and prioritise using baked shadows (imported texture from graphic apps)
