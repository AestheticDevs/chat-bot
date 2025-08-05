import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function DataSourceStatus({
  isTrained,
  collectionId,
}: {
  isTrained: boolean;
  collectionId: string;
}) {
  const [trained, setTrained] = useState(isTrained);
  useEffect(() => {
    if (!isTrained) {
    }
  }, [isTrained]);

  if (!collectionId) {
    return null;
  }
  if (trained) {
    return <Badge className="bg-teal-500">Trained</Badge>;
  }
  if (!trained) {
    return <Badge className="bg-yellow-500">Processing</Badge>;
  }
}
