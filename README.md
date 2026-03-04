# SAML

A TypeScript project using [Yarn](https://yarnpkg.com/) to experiment with SAML 2.0.

## Packages

| Package | Purpose |
|---|---|
| [`@node-saml/passport-saml`](https://github.com/node-saml/passport-saml) | Passport.js SAML 2.0 strategy – implements the **Service Provider (SP)** |
| [`saml-idp`](https://github.com/mcguinness/saml-idp) | Lightweight development **Identity Provider (IdP)** |

## Project Structure

```
src/
  sp/index.ts             Express SP with passport-saml
  idp/index.ts            Wrapper that starts the saml-idp dev server
  scripts/generate-certs.ts  Generates self-signed SP & IdP certificates
certs/                    Generated certificates (git-ignored)
```

## Prerequisites

- Node.js ≥ 18
- Yarn (`npm install -g yarn`)
- OpenSSL (used by the cert-generation script)

## Quick Start

### 1. Install dependencies

```bash
yarn install
```

### 2. Generate self-signed certificates

```bash
yarn cert
```

This creates `certs/sp.key`, `certs/sp.crt`, `certs/idp.key`, and `certs/idp.crt`.

### 3. Start the Identity Provider (terminal 1)

```bash
yarn idp
```

The IdP will be available at <http://localhost:7000>.

### 4. Start the Service Provider (terminal 2)

```bash
yarn sp
```

The SP will be available at <http://localhost:3000>.

### 5. Test the SAML flow

Open <http://localhost:3000> in a browser.  You will be redirected to the IdP
login page.  After authenticating you will be redirected back to the SP which
displays the received SAML attributes.

## Available Scripts

| Script | Description |
|---|---|
| `yarn cert` | Generate self-signed SP and IdP certificates |
| `yarn sp` | Run the SP with `ts-node` (no build step) |
| `yarn idp` | Start the `saml-idp` dev Identity Provider |
| `yarn build` | Compile TypeScript to `dist/` |
| `yarn start` | Run the compiled SP from `dist/` |
| `yarn typecheck` | Type-check without emitting output |

## Configuration

All settings can be overridden with environment variables:

| Variable | Default | Description |
|---|---|---|
| `SP_PORT` | `3000` | Port for the SP Express server |
| `SP_ISSUER` | `urn:example:sp` | SP entity ID / audience |
| `SP_CALLBACK_URL` | `http://localhost:3000/login/callback` | ACS (Assertion Consumer Service) URL |
| `IDP_SSO_URL` | `http://localhost:7000/saml/sso` | IdP SSO endpoint |
| `IDP_PORT` | `7000` | Port for the `saml-idp` server |
| `SP_ACS_URL` | `http://localhost:3000/login/callback` | ACS URL passed to `saml-idp` |
| `SP_AUDIENCE` | `urn:example:sp` | Audience URI passed to `saml-idp` |
| `SESSION_SECRET` | `saml-experiment-secret` | Express session secret |

## SP Endpoints

| Path | Description |
|---|---|
| `GET /` | Home page (requires authentication) |
| `GET /login` | Initiates SAML SSO |
| `POST /login/callback` | ACS – receives the SAML response from the IdP |
| `GET /logout` | Logs out the current session |
| `GET /metadata` | Returns SP SAML metadata XML |
