import { Badge } from "@/components/ui/badge";
import { List, Check, CircleEllipsis } from "lucide-react";

export type FilterType = "all" | "pending" | "done";

type FilterProps = {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) => {
  return (
    <div className="flex mt-4 gap-2">
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "all" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("all")}
      >
        <List /> All
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "pending" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("pending")}
      >
        <CircleEllipsis /> To do
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "done" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("done")}
      >
        <Check /> Done
      </Badge>
    </div>
  );
};

export default Filter;
