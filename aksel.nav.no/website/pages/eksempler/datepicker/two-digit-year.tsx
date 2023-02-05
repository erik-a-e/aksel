import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
    allowTwoDigitYear: true,
  });

  return (
    <div className="min-h-96">
      <UNSAFE_DatePicker {...datepickerProps}>
        <UNSAFE_DatePicker.Input {...inputProps} label="Velg dato" />
      </UNSAFE_DatePicker>
      <div className="pt-4">{selectedDay && selectedDay.toDateString()}</div>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 10,
  desc: "Prop allowTwoDigitYear legger til støtte for 'yy'-format. Tilgjengelig year-range vil være fra 1943-2042 (2023).",
};