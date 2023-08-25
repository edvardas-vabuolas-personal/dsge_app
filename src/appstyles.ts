import { styled } from "@mui/system";

export const WrapperDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: '3',
  textAlign: 'center',
  // border: '5px solid black'
});

type InputProps = {
  width: number
}

export const ChartsDiv = styled('div')<InputProps>(({ width }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${width}%, 1fr))`,
}))

export const LiStyled = styled("div")({
});

export const VarDiv = styled('div')({
  height: '20em',
  overflow: 'auto'
})

export const SlidersDiv = styled('div')({
  height: '20em',
  overflow: 'auto',
  padding: '1em'
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
  // paddingLeft: "10rem",
});

export const MainDiv = styled("div")({
  backgroundColor: "rgba(246, 246, 255, 1)",
  display: "flex",
  flexDirection: "row",
  padding: '1em',
  // border: '5px solid green'
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

export {};
