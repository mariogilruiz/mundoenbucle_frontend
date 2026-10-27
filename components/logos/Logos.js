import { createElement } from "react";
import Logo_primary_full from "./Logo_primary_full";
import Logo_primary_text from "./Logo_primary_text";
import Logo_primary_brand from "./Logo_primary_brand";

const logos = new Map([
  ["primary_full", Logo_primary_full],
  ["primary_brand", Logo_primary_brand],
  ["primary_text", Logo_primary_text],
]);

export default function Logos({ type }) {
  const Logo = logos.get(type);

  return Logo ? createElement(Logo) : null;
}
