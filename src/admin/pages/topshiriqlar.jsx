import React from "react";
import PageHeader from "./PageHeader";

export default function Topshiriqlar() {
  return (
    <div>
      <PageHeader
        title="Topshiriqlar"
        button={{
          label: "Topshiriq qo‘shish",
          onClick: () => handleAdd(),
        }}
      />
    </div>
  );
}
