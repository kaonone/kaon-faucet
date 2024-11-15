# Kaon Testnet Faucet

<i> Kaon Testnet faucet using Nextjs, MUI, hCaptcha and Redis </i>

## Environment Variables

```
PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000000
RPC_URL=https://rpc.ankr.com/eth_goerli
COOLDOWN_HOURS=2
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=00000000-0000-0000-0000-000000000000
HCAPTCHA_SECRET=0x0000000000000000000000000000000000000000
REDIS_URL=redis://default:key@url.com:6379
```

![](https://user-images.githubusercontent.com/19412160/212416161-e334625f-1a9c-41e2-9c4b-4c878545f45d.png)

## Definitions

PRIVATE_KEY: The private key of the wallet issuing funds. <https://metamask.zendesk.com/hc/en-us/articles/360015289632>

RPC_URL: RPC url of the blockchain <https://www.ankr.com/rpc/>

COOLDOWN_HOURS: Amount of hours users must wait to recieve funds again

NEXT_PUBLIC_HCAPTCHA_SITE_KEY: Create hCaptcha account. Also known as `Sitekey` <https://dashboard.hcaptcha.com/sites>

HCAPTCHA_SECRET: Create hCpatcha account. Also known as `Secret Key` <https://dashboard.hcaptcha.com/settings>

REDIS_URL: Redis is an in-memory key-value database. <https://redis.com/redis-enterprise-cloud/overview/>

## Getting Started Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Copy then add .env varibles

```
cp .env.local.example .env.local
```

Modern browsers have strict CORS and CORB rules, so opening a file://URI that loads hCaptcha will not work

The simplest way to use a tool such as [ngrok](https://ngrok.com/)
