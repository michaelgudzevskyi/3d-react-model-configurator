![](jumbo.jpg)

    npm install
    npm start
    
This is a small primer on how to use GLTF models on the web, specifically how to use them as dynamic assets.

Live demo: https://60bce1be4d9b8cf97364d5ff--elastic-visvesvaraya-271c29.netlify.app/

### How to compress assets and turn them into JSX components

1. `npx gltf-pipeline -i model.gltf -o model.glb --draco.compressionLevel=7`
1. `npx gltfjsx model.glb`

### How to include them in your project

1. Set up [react-three-fiber](https://github.com/pmndrs/react-three-fiber)
1. Put `model.glb` into `/public`
1. Put `Model.js` (the output of [gltfjsx](https://github.com/pmndrs/react-three-fiber)) anywhere inside `/src`