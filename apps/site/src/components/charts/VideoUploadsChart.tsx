import { BarChart, Card, Title } from "@tremor/react";

import { type VideoUploadsChartData } from "~/types";

type Props = {
  chartData: VideoUploadsChartData | undefined | null;
};

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

const shortDateFormat = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export default function VideoUploadsChart({ chartData }: Props) {
  // workaround to get shorter first/last x-axis date labels
  const firstDate = chartData?.[0];
  const lastDate = chartData?.[chartData.length - 1];

  if (firstDate) firstDate.date = shortDateFormat(firstDate.date);
  if (lastDate) lastDate.date = shortDateFormat(lastDate.date);

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
        startEndOnly={true}
      />
    </Card>
  );
}
