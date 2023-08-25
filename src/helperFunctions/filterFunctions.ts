export function filterIRFs(
  fResults: Record<string, (string | number)[]>,
  filterArgs: { irf_vars: string[]; stateValues: Record<string, number> },
  newValues?: {
    newIRFVars?: string[] | undefined;
    newValue?: {
      key: string;
      value: number;
    };
  }
) {
  const tempIRFs: any = {};
  (newValues?.newIRFVars ?? filterArgs.irf_vars).forEach((irf_var: string) => {
    if (fResults[irf_var] !== undefined) {
      let filteredResults: Array<any> = fResults[irf_var].filter(
        (row: any) =>
          row[0] ===
            (newValues?.newValue?.key === "phi_b"
              ? newValues?.newValue?.value
              : filterArgs.stateValues["phi_b"]) &&
          row[1] ===
            (newValues?.newValue?.key === "phi_g"
              ? newValues?.newValue?.value
              : filterArgs.stateValues["phi_g"]) &&
          row[2] ===
            (newValues?.newValue?.key === "rho_g"
              ? newValues?.newValue?.value
              : filterArgs.stateValues["rho_g"])
      );

      if (filteredResults.length > 0) {
        tempIRFs[irf_var] = filteredResults?.[0].slice(4);
      } else {
        console.log("filteredResults are empty. FilterIRFs");
      }
    } else {
      console.log("Variable not found. FilterIRFs");
    }
  });
  return tempIRFs;
}

export function filterIRFsOneD(
  fResults: Record<string, (string | number)[]>,
  filterArgs: { irf_vars: string[]; stateValues: Record<string, number> },
  p_name: string,
  p_val: number,
  newIRFs?: string[]
) {
  const tempIRFs: any = {};
  (newIRFs ?? filterArgs.irf_vars).forEach((irf_var: string) => {
    if (fResults[irf_var] !== undefined) {
      let filteredResults: Array<any> = fResults[irf_var].filter(
        (row: any) =>
          row[1] === p_name && row[2] === p_val
      );
      if (filteredResults.length > 0) {
        tempIRFs[irf_var] = filteredResults?.[0].slice(3);
      } else {
        console.log("filteredResults are empty. FilterIRFsOneD");
      }
    } else {
      console.log("Variable not found. FilterIRFsOneD");
    }
  });
  return tempIRFs;
}

export function filterRes(
  Results: Record<string, (string | number)[]>,
  filterArgs: { irf_vars: string[]; stateValues: Record<string, number> },
  newValues?: {
    newValue?: {
      key: string;
      value: number;
    };
  }
) {
  const tempResult: Record<string, (string | number)[]> = {};
  filterArgs.irf_vars.forEach((irf_var: string) => {
    let filteredResults;
    if (Results[irf_var] !== undefined) {
      if (newValues?.newValue?.key === "phi_b") {
        filteredResults = Results[irf_var].filter(
          (row: any) =>
            row[1] === filterArgs.stateValues["phi_g"] &&
            row[2] === filterArgs.stateValues["rho_g"]
        );
      } else if (newValues?.newValue?.key === "phi_g") {
        filteredResults = Results[irf_var].filter(
          (row: any) =>
            row[0] === filterArgs.stateValues["phi_b"] &&
            row[2] === filterArgs.stateValues["rho_g"]
        );
      } else {
        filteredResults = Results[irf_var].filter(
          (row: any) =>
            row[0] === filterArgs.stateValues["phi_b"] &&
            row[1] === filterArgs.stateValues["phi_g"]
        );
      }
      if (filteredResults.length > 0) {
        tempResult[irf_var] = filteredResults;
      } else {
        console.log("filteredResults are empty. FilterRes");
      }
    } else {
      console.log("Variable not found. filterRes");
    }
  });
  return tempResult;
}

export function filterResOneD(
  Results: Record<string, (string | number)[]>,
  filterArgs: { irf_vars: string[]; stateValues: Record<string, number> },
  newValues?: {
    newValue?: {
      key: string;
      value: number;
    };
  }
) {
  const tempResult: Record<string, (string | number)[]> = {};
  filterArgs.irf_vars.forEach((irf_var: string) => {
    let filteredResults;
    if (Results[irf_var] !== undefined) {
      filteredResults = Results[irf_var].filter(
        (row: any) => row[1] === newValues?.newValue?.key
      );
      if (filteredResults.length > 0) {
        tempResult[irf_var] = filteredResults;
      } else {
        console.log("filteredResults are empty. FilterResOneD");
      }
    } else {
      console.log("Variable not found. filterResOneD");
    }
  });
  return tempResult;
}

export function updIRFs(
  value: number,
  newKey: string,
  result: Record<string, (string | number)[]>,
  lastSlider: React.MutableRefObject<string>,
  setIRFs: React.Dispatch<any>,
  mode: string,
  lastResult: React.MutableRefObject<Record<string, (string | number)[]>>,
  filterArgs: any,
  resultOneD: any
) {
  let newValue = { newValue: { key: newKey, value: value } };
  if (lastSlider.current === newKey) {
    mode === "N"
      ? setIRFs(filterIRFs(lastResult.current, filterArgs, newValue))
      : setIRFs(filterIRFsOneD(lastResult.current, filterArgs, newKey, value));
  } else {
    lastResult.current =
      mode === "N"
        ? filterRes(result, filterArgs, newValue)
        : filterResOneD(resultOneD, filterArgs, newValue);
    mode === "N"
      ? setIRFs(filterIRFs(lastResult.current, filterArgs, newValue))
      : setIRFs(filterIRFsOneD(lastResult.current, filterArgs, newKey, value));
  }
}
