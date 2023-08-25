import SliderSizes from "./slides";

export function getSliders(mode: string, fn: Function, param_names: string[], values: Record<string, number>) {
    let sliders: JSX.Element[] = [];
    param_names.forEach((p_name: string, index: number) => {
      sliders.push(
        <SliderSizes
          key={index}
          onChangeFunc={fn}
          mode={mode}
          labelParams={{
            name: p_name,
            value: values[p_name],
          }}
        />
      );
    });
    return sliders;
  }