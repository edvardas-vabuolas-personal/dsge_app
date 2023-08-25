import * as React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function SelectMode(args: any) {
  return (
    <StyledToggleButtonGroup
      value={args["mode"]}
      onChange={args["mode_fn"]}
      sx={{ flexWrap: "wrap" }}
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
