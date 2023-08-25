import Papa from "papaparse";
import { var_names, all_d_var_names } from "../static/var_names";

export const getCSV = (loadingFn: any) => {
  let values: any = {}
  let values_all_d: any = {}
  loadingFn(true)
  var_names.forEach((irf_var: string) => {
    Papa.parse(`https://edvardas-vabuolas-personal.github.io/test_data.github.io/Data/f4/${irf_var}.csv`, {
      header: false,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      dynamicTyping: false,
      complete: (results) => {
        values[irf_var] = results["data"].map((row: any) => {
          return row.map((element: string) => {
            const numericValue = parseFloat(element);
            return isNaN(numericValue) ? element : numericValue;
          });
        });
      },
    });
  });
  all_d_var_names.forEach((irf_var: string) => {
    Papa.parse(`https://edvardas-vabuolas-personal.github.io/test_data.github.io/Data/${irf_var}.csv`, {
      header: false,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      dynamicTyping: false,
      complete: (results) => {
        values_all_d[irf_var] = results["data"].map((row: any) =>
          row.map((element: number) => Math.round(element*100000)/100000)
        );
      },
    });
  });
  loadingFn(false)
  return [values, values_all_d]
};
