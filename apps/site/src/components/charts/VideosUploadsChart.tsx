import { BarChart, Card, Title } from "@tremor/react";

import { type VideoUploadsChartData } from "~/types.js";

type Props = {
  chartData: VideoUploadsChartData | undefined | null;
};

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export default function VideoUploadsChart({ chartData }: Props) {
  return (
    <Card>
      <Title>Uploads</Title>
      <BarChart
        className="mt-6"
        data={chartData || []}
        index="date"
        categories={["Uploads"]}
        colors={["emerald"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}
