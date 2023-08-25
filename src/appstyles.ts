import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";
import { styled } from "@mui/system";

export const WrapperDiv = styled("div")({
  display: "flex",
  height: '100vh',
  flexDirection: "column",
  flexGrow: '1',
  textAlign: 'center',
  // border: '5px solid black'
});

type InputProps = {
  width: number
}

export const ProgressDiv = styled('div')({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export const ChartsDiv = styled('div')<InputProps>(({ width }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${width}%, 1fr))`,
  height: "100vh",
  overflow: 'auto',
  alignContent: 'baseline',
}))

export const LiStyled = styled("div")({
});

export const VarDiv = styled('div')({
  height: '43vh !important',
  overflowY: 'auto',
  overflowX: 'hidden'
})

export const SlidersDiv = styled('div')({
  height: '43vh !important',
  width: '14vw !important',
  overflowY: 'auto',
  overflowX: 'hidden'
})

export const RightPanelDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexWrap: 'wrap',
  width: '15%',
  paddingRight: '1em',
  gap: '1em'
});

export const SliderDiv = styled("div")({
});

export const MainDiv = styled("div")({
  backgroundColor: "rgba(246, 246, 255, 1)",
  display: "flex",
  flexDirection: "row",
  padding: '1em',
});


export const LegendRectangle = styled("div")({
  width: "2em",
  height: "1.25em",
  backgroundColor: "rgba(53, 162, 235, 0.5)",
  // backgroundColor: "rgb(53, 162, 235)",
  outline: "2px solid",
  outlineColor: "rgb(53, 162, 235)",
  marginRight: "1em",
});

export const LegendBox = styled("div")({
  display: "inline-flex",
  alignItems: "center",
});


export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
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
  display: 'grid',
  gridTemplateColumns: '7vw 7vw',
  marginBottom: '1em'
}));
