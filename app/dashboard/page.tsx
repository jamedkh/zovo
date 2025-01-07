"use client";

import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import DashboardSingleCard from "../constants/DashboardSingleCard";
import { DashBarChart } from "../constants/DashBarChart";
import DashRecent from "../constants/DashRecent";
import { DashAreaChart } from "../constants/DashAreaChart";
import { DashPieChart } from "../constants/DashPieChart";
import { DashHorizontalBarChart } from "../constants/DashHorizontalBarChart";

export default function Page() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 lg:grid-cols-4">
        <DashboardSingleCard
          title="Total Revenue"
          icon={<DollarSign />}
          highlight="$45,231.89"
          smallDetail="+20.1% from last month"
        />

        <DashboardSingleCard
          title="Subscriptions"
          icon={<Users />}
          highlight="+2350"
          smallDetail="+180.1% from last month"
        />

        <DashboardSingleCard
          title="Sales"
          icon={<CreditCard />}
          highlight="+12,234"
          smallDetail="+19% from last month"
        />

        <DashboardSingleCard
          title="Active Now"
          icon={<Activity />}
          highlight="+573"
          smallDetail="+201 since last hour"
        />
      </div>

      {/* bar chart */}
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-8/12">
          <DashBarChart />
        </div>

        <div className="w-full md:w-4/12">
          <DashRecent />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/3">
          <DashAreaChart />
        </div>

        <div className="w-full md:w-1/3">
          <DashPieChart />
        </div>

        <div className="w-full md:w-1/3">
          <DashHorizontalBarChart />
        </div>
      </div>
    </>
  );
}
