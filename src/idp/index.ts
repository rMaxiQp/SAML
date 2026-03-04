/// <reference path="../types/saml-idp.d.ts" />

import * as path from 'path';
import { runServer } from 'saml-idp';

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
 *   IDP_PORT        Port for the IdP server         (default: 8000)
 *   SP_ACS_URL      SP Assertion Consumer Service URL (default: http://localhost:3000/login/callback)
 *   SP_AUDIENCE     SP Audience / Issuer URI         (default: urn:example:sp)
 */

const IDP_ISSUER = process.env.IDP_ISSUER ?? "urn:example:idp";
const IDP_PORT = process.env.IDP_PORT ?? "7000";
const SP_ACS_URL =
  process.env.SP_ACS_URL ?? "http://localhost:3000/login/callback";
const SP_AUDIENCE = process.env.SP_AUDIENCE ?? "urn:example:sp";

console.log("Starting saml-idp...");
console.log(`  IdP port:    ${IDP_PORT}`);
console.log(`  ACS URL:     ${SP_ACS_URL}`);
console.log(`  SP Audience: ${SP_AUDIENCE}`);

// saml-idp reads IDP_PORT from the environment variable PORT
process.env.PORT = IDP_PORT;

const certsDir = path.resolve(__dirname, "../../certs");
const idpCert = path.resolve(certsDir, "idp.crt");
const idpKey = path.resolve(certsDir, "idp.key");

runServer({
  acsUrl: SP_ACS_URL,
  audience: SP_AUDIENCE,
  cert: idpCert,
  key: idpKey,
  issuer: IDP_ISSUER,
});