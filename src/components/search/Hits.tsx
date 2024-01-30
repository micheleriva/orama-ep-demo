import NoResults from "./NoResults";
import HitComponent from "./Hit";
import { useOramaHits } from "../../lib/orama";

export default function Hits(): JSX.Element {
  const oramaHits = useOramaHits()

  if (oramaHits?.hits.length) {
    return (
      <div className="grid max-w-[80rem] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {oramaHits?.hits.map((hit: any) => {
          return (
            <div
              className="list-none justify-items-stretch rounded-lg animate-fadeIn"
              key={hit.id}
            >
              <HitComponent hit={hit} />
            </div>
          );
        })}
      </div>
    );
  }

  return <NoResults displayIcon={false} />;
}
