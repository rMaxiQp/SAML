import { execFileSync } from "child_process";
import * as path from "path";

/**
 * Starts the saml-idp development Identity Provider.
 *
 * The saml-idp package (https://github.com/mcguinness/saml-idp) spins up a
 * simple SAML 2.0 IdP that is useful for local development and testing.
 *
 * Usage:
 *   yarn idp
 *
 * Environment variables:
 *   IDP_PORT        Port for the IdP server         (default: 7000)
 *   SP_ACS_URL      SP Assertion Consumer Service URL (default: http://localhost:3000/login/callback)
 *   SP_AUDIENCE     SP Audience / Issuer URI         (default: urn:example:sp)
 */

const IDP_PORT = process.env.IDP_PORT ?? "7000";
const SP_ACS_URL =
  process.env.SP_ACS_URL ?? "http://localhost:3000/login/callback";
const SP_AUDIENCE = process.env.SP_AUDIENCE ?? "urn:example:sp";

const samlIdpBin = path.resolve(
  __dirname,
  "../../node_modules/saml-idp/bin/run.js"
);

console.log("Starting saml-idp...");
console.log(`  IdP port:    ${IDP_PORT}`);
console.log(`  ACS URL:     ${SP_ACS_URL}`);
console.log(`  SP Audience: ${SP_AUDIENCE}`);

// saml-idp reads IDP_PORT from the environment variable PORT
process.env.PORT = IDP_PORT;

execFileSync(
  process.execPath,
  [
    samlIdpBin,
    "--acsUrl",
    SP_ACS_URL,
    "--audience",
    SP_AUDIENCE,
  ],
  { stdio: "inherit" }
);
