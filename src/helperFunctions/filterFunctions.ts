export function filterIRFs(
  fResults: any,
  filterArgs: { irf_vars: any; stateValues: any },
  newValues?: {
    newIRFVars?: string[] | string | undefined;
    newValue?: {
      key: string;
      value: number;
    };
  }
) {
  const tempIRFs: any = {};
  (newValues?.newIRFVars ?? filterArgs.irf_vars).forEach((irf_var: string) => {
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
      console.log('filteredResults are empty. FilterIRFs')
    }
  });
  return tempIRFs;
}

export function filterIRFsOneD(
  fResults: any,
  filterArgs: { irf_vars: any; stateValues: any },
  p_name?: string,
  p_val?: number,
  newIRFs?: string[]
) {
  const tempIRFs: any = {};
  (newIRFs ?? filterArgs.irf_vars).forEach((irf_var: string) => {
    if (fResults[irf_var]) {
      let filteredResults: Array<any> = fResults[irf_var].filter(
        (row: any) =>
          row[0] === irf_var && row[1] === p_name && row[2] === p_val
      );
      if (filteredResults.length > 0) {
        tempIRFs[irf_var] = filteredResults?.[0].slice(3);
      } else {
        console.log('filteredResults are empty. FilterIRFsOneD')
      }
    } else {
      console.log('Variable not found in Results')
    }
  });
  return tempIRFs;
}

export function filterRes(
  Results: any,
  filterArgs: { irf_vars: any; stateValues: any },
  newValues?: {
    newValue?: {
      key: string;
      value: number;
    };
  }
) {
  const tempResult: any = {};
  filterArgs.irf_vars.forEach((irf_var: string) => {
    let filteredResults;
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
      console.log('filteredResults are empty. FilterRes')
    }
  });
  return tempResult;
}

export function filterResOneD(
  Results: any,
  filterArgs: { irf_vars: any; stateValues: any },
  newValues?: {
    newValue?: {
      key: string;
      value: number;
    };
  }
) {
  const tempResult: any = {};
  filterArgs.irf_vars.forEach((irf_var: string) => {
    let filteredResults;
    filteredResults = Results[irf_var].filter(
      (row: any) =>
        row[1] === newValues?.newValue?.key
    );
    if (filteredResults.length > 0) {
      tempResult[irf_var] = filteredResults;
    } else {
      console.log('filteredResults are empty. FilterResOneD')
    }
  });
  return tempResult;
}
