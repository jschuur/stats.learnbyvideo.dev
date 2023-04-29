import { Card, Metric, Text } from "@tremor/react";

type Props = {
  count: number | undefined;
};

export default function LiveStreamsCard({ count }: Props) {
  return (
    <Card decoration="top" decorationColor="fuchsia">
      <Text>Live Streams</Text>
      <Metric>{count ? Intl.NumberFormat().format(count) : "-"}</Metric>
    </Card>
  );
}
