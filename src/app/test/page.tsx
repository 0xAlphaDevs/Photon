"use client";
import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Test = () => {
  const [data, setData] = React.useState(null);
  return (
    <div className="flex justify-center flex-col items-center gap-10 h-screen">
      <Button
        onClick={async () => {
          const res = await axios.get("/api/test");
          console.log(res.data);
          setData(res.data);
        }}
      >
        Test
      </Button>
      <div>{data ? JSON.stringify(data) : "No data"}</div>
    </div>
  );
};

export default Test;
