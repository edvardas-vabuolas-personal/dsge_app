import "@fontsource/roboto/400.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import React from "react";
import Latex from "react-latex";
import { pParams } from "../static/initValues";
import { latexNames } from "../static/latexNames";

export default function LatexSliders(args: any) {
  let name = args["labelParams"]["name"];
  // let pParams = pParams[name];
  let min = 0;
  let max = args["mode"] === "1" ? 100 : 1;
  let step = args["mode"] === "1" ? 1 : 0.05;
  let adj = args["mode"] === "1" ? pParams[name]["step"] : 1;
  return (
    <Box>
      <Typography id="input-slider" gutterBottom variant="h5">
        {
          <Latex
            macros={{
              "\\f": `${latexNames[name]} = ${
                Math.round(adj * args["labelParams"]["value"] * 100) / 100
              }`,
            }}
          >
            {"$\\f$"}
          </Latex>
        }
      </Typography>
      <Slider
        value={args["labelParams"]["value"]}
        aria-label="Default"
        onChange={args["onChangeFunc"]}
        name={name}
        min={min}
        max={max}
        step={step}
      />
    </Box>
  );
}
