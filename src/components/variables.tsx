import * as React from "react";
import { latexNames } from "../static/latex_names";
import Latex from "react-latex";
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

export default function MultipleSelectChip(args: any) {
  const toggleButtons: any[] = [];
  args["p_irf_vars"].forEach((name: string) => {
    toggleButtons.push(
      <ToggleButton
        key={name}
        value={name}
        sx={{ textTransform: "none" }}
        color="primary"
        size="large"
      >
        <Latex macros={{ "\\f": `${latexNames[name]}` }}>{"$\\f{}$"}</Latex>
      </ToggleButton>
    );
  });
  return (
    <StyledToggleButtonGroup
      value={args["irf_vars"]}
      onChange={args["irf_vars_fn"]}
      sx={{ flexWrap: "wrap" }}
    >
      {toggleButtons}
    </StyledToggleButtonGroup>
  );
}
