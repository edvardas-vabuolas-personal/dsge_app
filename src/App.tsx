import React, { useEffect } from "react";
import * as AppStyles from "./appstyles";
import MultipleSelectChip from "./components/variables";
import {
  filterIRFs,
  filterRes,
  filterIRFsOneD,
  filterResOneD,
} from "./helperFunctions/filterFunctions";
import { getCharts } from "./components/getCharts";
import { getSliders } from "./components/getSliders";
import { initIRFs } from "./static/initIRFs";
import SelectMode from "./components/mode";
import { getCSV } from "./components/getData";
import {
  all_d_names,
  all_d_var_names,
  param_names,
  var_names,
} from "./static/var_names";
import { init_values, init_values_all_d } from "./static/init_values";
import { CircularProgress } from "@mui/material";

function App() {
  // const result = useReadCSV();
  const [mode, setMode] = React.useState<any>("N");
  const [irf_vars, setirfvars] = React.useState<any>(["b"]);
  const [values, setValues] = React.useState<any>(init_values_all_d);
  const [IRFs, setIRFs] = React.useState<any>(initIRFs);
  const [lastSlider, setlastSlider] = React.useState<any>();
  const [lastResult, setlastResult] = React.useState<any>();
  const [result, setResult] = React.useState<any>({});
  const [resultOneD, setResultOneD] = React.useState<any>({});
  const [loading, setLoading] = React.useState<any>(true);

  useEffect(() => {
    let CSVData = getCSV(setLoading);
    setResult(CSVData[1]);
    setResultOneD(CSVData[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterArgs = {
    irf_vars: irf_vars,
    stateValues: values,
  };

  function updIRFs(value: number, newKey: string, result: any) {
    let newValue = { newValue: { key: newKey, value: value } };
    if (lastSlider === newKey) {
      mode === "N"
        ? setIRFs(filterIRFs(lastResult, filterArgs, newValue))
        : setIRFs(filterIRFsOneD(lastResult, filterArgs, newKey, value));
    } else {
      let resTemp =
        mode === "N"
          ? filterRes(result, filterArgs, newValue)
          : filterResOneD(resultOneD, filterArgs, newValue);
      mode === "N"
        ? setIRFs(filterIRFs(resTemp, filterArgs, newValue))
        : setIRFs(filterIRFsOneD(resTemp, filterArgs, newKey, value));
      setlastResult(resTemp);
    }
  }

  function handleOnD(event: any, value: any) {
    const tValues = mode === "N" ? values : Object.assign({}, init_values);
    tValues[event.target.name] = value;
    setValues(tValues);
    updIRFs(value, event.target.name, result);
    setlastSlider(event.target.name);
  }

  const handleMulti = (event: any, value: any) => {
    (value as unknown as string[]).sort(
      (a: string, b: string) =>
        (mode === "N" ? all_d_var_names : var_names).indexOf(a) -
        (mode === "N" ? all_d_var_names : var_names).indexOf(b)
    );
    setirfvars((prevState: string[]) => value);
    let tempIRFs =
      mode === "N"
        ? filterIRFs(result, filterArgs, { newIRFVars: value })
        : filterIRFsOneD(
            resultOneD,
            filterArgs,
            lastSlider,
            values[lastSlider],
            value
          );
    setIRFs(tempIRFs);
    setlastResult(result);
  };

  const handleMode = (event: any, value: any) => {
    setMode(value);
    value === "N" ? setValues(init_values_all_d) : setValues(init_values);
    value === "N" ? setirfvars(["b"]) : setirfvars(["b_uk"]);
    console.log(resultOneD)
  };

  const charts = getCharts(irf_vars, IRFs);

  let sliders = getSliders(
    mode,
    handleOnD,
    mode === "N" ? all_d_names : param_names,
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
            p_irf_vars={mode === "N" ? all_d_var_names : var_names}
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
    <CircularProgress />
  );
}

export default App;
