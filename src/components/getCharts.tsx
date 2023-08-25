import * as AppStyles from "../appstyles";
import Latex from "react-latex";
import { latexNames } from "../static/latex_names";
import LineChart from "./Line";

export function getCharts(irf_vars: any, IRFs: any) {
const labels = Array.from(Array(32).keys())
const data: { [id: string]: any } = {};
const options: { [id: string]: any } = {};
const charts: any[] = [];
  irf_vars.forEach((irf_var: string) => {
    data[irf_var] = {
      labels: labels,
      datasets: [
        {
          label: irf_var,
          data: IRFs[irf_var],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "false",
          data: Array(31).fill(0),
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0)",
        },
      ],
    };

    options[irf_var] = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
          display: false,
          labels: {
            filter: (item: { text: string }) => item.text !== "false",
          },
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          max: Math.max(IRFs[irf_var]) + 0.1,
          min: Math.max(IRFs[irf_var]) - 0.1,
          ticks: {
            stepSize: 0.005,
          },
        },
      },
      spanGaps: true,
      animation: {
        duration: 2000,
        delay: 0,
        loop: false,
      },
    };
    charts.push(
      <AppStyles.LiStyled key={irf_var}>
        <AppStyles.LegendBox>
          <AppStyles.LegendRectangle />
          <Latex
            macros={{
              "\\f": `\\Uparrow g_t \\Rightarrow ${latexNames[irf_var]}`,
            }}
          >
            {"$\\f{}$"}
          </Latex>
        </AppStyles.LegendBox>
        <LineChart irfs={data[irf_var]} options={options[irf_var]} />
      </AppStyles.LiStyled>
    );
  });
  return charts
}
