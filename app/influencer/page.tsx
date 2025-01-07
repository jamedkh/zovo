import React from "react";
import InfluencerDrawer from "../constants/InfluencerDrawer";
import { Separator } from "@/components/ui/separator";
import { InDataTable } from "../constants/InDataTable";
import { Influencer, inColumns } from "./inColumns";
import InfluencerData from "./InfluencerData.json";

async function InfluencersList() {
  const data: Influencer[] = InfluencerData;
  return (
    <div>
      {/* page header */}
      <section className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl mb-3">Influencers List</h1>
          <p className="text-xs text-muted-foreground">
            All Influencers goes here
          </p>
        </div>

        <InfluencerDrawer />

        {/* <AppButton btnText="Add New" btnVariant="default" btnIcon={<Plus />} /> */}
      </section>

      <Separator />

      {/* campaign table data */}
      <InDataTable columns={inColumns} data={data} />
    </div>
  );
}

export default InfluencersList;
