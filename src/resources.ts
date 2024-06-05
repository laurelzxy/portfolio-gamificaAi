import { ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png"
import logo2 from "./images/logo2.png"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  Logo2: new ImageSource(logo2)
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}



