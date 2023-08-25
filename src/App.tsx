import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import * as AppStyles from "./appstyles";
import { getCharts } from "./components/getCharts";
import { getSliders } from "./components/getSliders";
import SelectMode from "./components/ModeToggles";
import VariableToggles from "./components/VariableToggles";
import { updIRFs } from "./helperFunctions/filterFunctions";
import { getCSV } from "./helperFunctions/getData";
import { initIRFsAllD, initIRFsOneD } from "./static/initIRFs";
import { INITVALUES, INITVALUESALLD } from "./static/initValues";
import {
  ALLDNAMES,
  ALLDPARAMS,
  ONEDNAMES,
  ONEDPARAMS,
} from "./static/dynareNames";

function App() {
  const [mode, setMode] = React.useState<string>("N");
  const [irf_vars, setirfvars] = React.useState<string[]>(ALLDNAMES);
  const [loading, setLoading] = React.useState<boolean>(true);
  const lastSlider = React.useRef<string>("");
  const lastResult = React.useRef<Record<string, (string | number)[]>>({});
  const [values, setValues] =
    React.useState<Record<string, number>>(INITVALUESALLD);
  const [IRFs, setIRFs] =
    React.useState<Record<string, number[]>>(initIRFsAllD);
  const [result, setResult] = React.useState<
    Record<string, (string | number)[]>
  >({});
  const [resultOneD, setResultOneD] = React.useState<
    Record<string, (string | number)[]>
  >({});

  useEffect(() => {
    let CSVData: any[] | null = getCSV(setLoading);
    setResult(CSVData[1]);
    setResultOneD(CSVData[0]);

    // Free up memory
    CSVData = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterArgs = {
    irf_vars: irf_vars,
    stateValues: values,
  };

  function handleSliders(event: any, value: number) {
    // This function updates graphs as sliders are changed

    const tValues = mode === "N" ? values : Object.assign({}, INITVALUES);
    tValues[event.target.name] = value;
    setValues(tValues);
    updIRFs(
      value,
      event.target.name,
      result,
      lastSlider,
      setIRFs,
      mode,
      lastResult,
      filterArgs,
      resultOneD
    );
    lastSlider.current = event.target.name;
  }

  const handleMulti = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: string[]
  ) => {
    // This ensures that charts order matches that of toggles
    (value as unknown as string[]).sort(
      (a: string, b: string) =>
        (mode === "N" ? ALLDNAMES : ONEDNAMES).indexOf(a) -
        (mode === "N" ? ALLDNAMES : ONEDNAMES).indexOf(b)
    );
    setirfvars((prevState: string[]) => value);

    // Free up memory
    lastSlider.current = "";
    lastResult.current = {};
  };

  const handleMode = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => {
    setMode(value);
    if (value === "N") {
      // Reset to initial values
      setValues(INITVALUESALLD);
      setirfvars(ALLDNAMES);
      setIRFs(initIRFsAllD);

      // Free up memory
      lastSlider.current = "";
      lastResult.current = {};
    } else {
      // Reset to initial values
      setValues(INITVALUES);
      setirfvars(Object.keys(initIRFsOneD));
      setIRFs(initIRFsOneD);

      // Free up memory
      lastSlider.current = "";
      lastResult.current = {};
    }
  };

  const charts = getCharts(irf_vars, IRFs);

  let sliders = getSliders(
    mode,
    handleSliders,
    mode === "N" ? ALLDPARAMS : ONEDPARAMS,
    values
  );

  return loading === false ? (
    <AppStyles.MainDiv>
      <AppStyles.RightPanelDiv>
        <SelectMode mode_fn={handleMode} mode={mode} />
        <AppStyles.VarDiv>
          <VariableToggles
            irf_vars={irf_vars}
            irf_vars_fn={handleMulti}
            p_irf_vars={mode === "N" ? ALLDNAMES : ONEDNAMES}
          />
        </AppStyles.VarDiv>
        <AppStyles.SlidersDiv>{sliders}</AppStyles.SlidersDiv>
      </AppStyles.RightPanelDiv>
      <AppStyles.WrapperDiv>
        <AppStyles.ChartsDiv width={irf_vars.length > 4 ? 33 : 50}>
          {charts}
        </AppStyles.ChartsDiv>
      </AppStyles.WrapperDiv>
    </AppStyles.MainDiv>
  ) : (
    <AppStyles.ProgressDiv>
      <CircularProgress size={"20em"} />
    </AppStyles.ProgressDiv>
  );
}

export default App;
