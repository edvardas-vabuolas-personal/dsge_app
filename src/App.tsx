import React, { useEffect } from "react";
import * as AppStyles from "./appstyles";
import MultipleSelectChip from "./components/variables";
import { updIRFs } from "./helperFunctions/filterFunctions";
import { getCharts } from "./components/getCharts";
import { getSliders } from "./components/getSliders";
import { initIRFsAllD, initIRFsOneD } from "./static/initIRFs";
import SelectMode from "./components/mode";
import { getCSV } from "./helperFunctions/getData";
import {
  ALLDNAMES,
  ALLDPARAMS,
  ONEDNAMES,
  ONEDPARAMS,
} from "./static/var_names";
import { init_values, init_values_all_d } from "./static/init_values";
import { CircularProgress } from "@mui/material";

function App() {
  const [mode, setMode] = React.useState<any>("N");
  const [irf_vars, setirfvars] = React.useState<any>(ALLDNAMES);
  const [values, setValues] = React.useState<any>(init_values_all_d);
  const [IRFs, setIRFs] = React.useState<any>(initIRFsAllD);
  const [result, setResult] = React.useState<any>({});
  const [resultOneD, setResultOneD] = React.useState<any>({});
  const [loading, setLoading] = React.useState<any>(true);
  const lastSlider = React.useRef<string>("");
  const lastResult = React.useRef<any>({});

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

  function handleSliders(event: any, value: any) {
    // This function updates graphs as sliders are changed

    const tValues = mode === "N" ? values : Object.assign({}, init_values);
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

  const handleMulti = (event: any, value: any) => {
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

  const handleMode = (event: any, value: any) => {
    setMode(value);
    if (value === "N") {

      // Reset to initial values
      setValues(init_values_all_d);
      setirfvars(ALLDNAMES);
      setIRFs(initIRFsAllD);

      // Free up memory
      lastSlider.current = "";
      lastResult.current = {};
    } else {

      // Reset to initial values
      setValues(init_values);
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
          <MultipleSelectChip
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
