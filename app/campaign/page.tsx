import React from "react";
import { Separator } from "@/components/ui/separator";

import { Campaign, columns } from "./columns";
import { DataTable } from "../constants/data-table";
import CampaignDrawer from "../constants/CampaignDrawer";

async function getCapaign(): Promise<Campaign[]> {
  // Fetch data from your API here.
  const res = await fetch(
    "https://67729d6aee76b92dd492d90f.mockapi.io/campaign"
  );
  const data = await res.json();
  return data;
}

async function CampaignList() {
  const data = await getCapaign();
  return (
    <>
      {/* page header */}
      <section className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl mb-3">Campaign List</h1>
          <p className="text-xs text-muted-foreground">
            All Campaigns goes here
          </p>
        </div>

        <CampaignDrawer />

        {/* <AppButton btnText="Add New" btnVariant="default" btnIcon={<Plus />} /> */}
      </section>

      <Separator />

      {/* campaign table data */}
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default CampaignList;
