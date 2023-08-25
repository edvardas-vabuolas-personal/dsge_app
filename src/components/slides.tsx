import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/400.css";
import Latex from "react-latex";
import { latexNames } from "../static/latex_names";
import { p_params } from "../static/init_values";
import React from "react";

export default function SliderSizes(args: any) {
  let name = args["labelParams"]["name"];
  let pParams = p_params[name];
  let min = 0;
  let max = args["mode"] === "1" ? 100 : 1;
  let step = args["mode"] === "1" ? 1 : 0.05;
  let adj = args["mode"] === "1" ? pParams["step"] : 1;
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
