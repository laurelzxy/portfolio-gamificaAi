import { ImageSource, Loader } from "excalibur";
import { TiledResource, TilesetResource } from "@excaliburjs/plugin-tiled";


import sword from "./images/sword.png";
import logo from "./images/logo.png"
import logo2 from "./images/logo2.png"
import imagem from "./images/robo.png"

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBiblioteca from "./maps/tileset_biblioteca.tsx?url"

import tmxMapaPath from "./maps/showroom-map.tmx?url"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  Logo2: new ImageSource(logo2),
  Imagem: new ImageSource(imagem),
  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      {path:"showroom_map.tmx", output: tmxMapaPath },
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_paredes.tsx", output: tsxParedesPath},
      {path: "tileset_generic.tsx", output: tsxGenericPath},
      {path: "tileset_estoque.tsx", output: tsxEstoquePath},
      {path: "tileset_biblioteca.tsx", output: tsxBiblioteca},
    ]
  })
  
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}



