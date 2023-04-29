import { Card, LineChart, Title } from "@tremor/react";

import { type VideoUploadsChartData } from "~/types.js";
type Props = {
  chartData: VideoUploadsChartData | undefined;
};

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export default function VideoUploadsChart({ chartData }: Props) {
  return chartData?.length ? (
    <Card>
      <Title>Uploads</Title>
      <LineChart
        className="mt-6"
        data={chartData}
        index="date"
        categories={["Uploads"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  ) : null;
}
