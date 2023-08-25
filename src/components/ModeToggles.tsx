import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { StyledToggleButtonGroup } from "../appstyles";

export default function SelectMode(args: any) {
  return (
    <StyledToggleButtonGroup
      value={args["mode"]}
      onChange={args["mode_fn"]}
      sx={{ height: "3vh" }}
      exclusive
    >
      <ToggleButton
        key={"N"}
        value={"N"}
        sx={{ textTransform: "none" }}
        color="primary"
        size="large"
      >
        All Dynamic
      </ToggleButton>
      <ToggleButton
        key={"1"}
        value={"1"}
        sx={{ textTransform: "none" }}
        color="primary"
        size="large"
      >
        1 Dynamic
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
