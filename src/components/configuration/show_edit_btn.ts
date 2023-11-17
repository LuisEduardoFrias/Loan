"use client";

import { SystemType } from "m/systemType";

const key = "systemType";

export default function ShowEditBtn() {
  return getData(key) in SystemType == SystemType.checkout;
}
