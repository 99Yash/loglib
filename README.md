# LogLib

## Yet another web analytics tool because the world definitely needs one more

![screenshot](./examples/screenshot/dashboard.png)

> ⚠️ Under Construction put here incase anyone visits this repo before it's ready.
> 📍 Note: currently we only support Next.js with prisma adapter . But more frameworks and database support are on the way!

### What is LogLib?

Loglib is a web analytics tool that helps you track your website's analytics. It's a privacy-first, and it's open source but the best part is if your website in Next js you don't need to deploy it separately. You can just attach it to your Next js app (and more frameworks soon) and it will work just fine. And if you're not using Next js you can still use it but you need to deploy it separately.

### Why Choose Loglib?

- Why not?
- No need to deploy it separately. You can easily attach Loglib to your Next js app (and more frameworks are on the way), saving you time, effort and possibly some cash.
- Keep all your data in your existing database, you have the freedom to store your data in your existing db. And this will help you like if your platform displays analytics for users, you can track events or pageview using the tracker and provide them with detailed analytics.
- A beautiful dashboard built with Shadcn UI.
- Privacy first GDPR compliant out of the box but can be customized.
- Your mom will be impressed.
- And more things are on the way.

### Why Not Choose Loglib?

- We're not smart enough to think of any reasons. But if you have any, please let us know.

### Two ways to use Loglib

1. Attach it to your Next js app (and more frameworks are on the way)
2. Deploy it (coming soon)

### Get Started

Loglib is consist of three things:

1. **Tracker**: This component tracks your website's analytics.
2. **Loglib Server**: It handles requests without requiring a separate deployment if you already have a backend.
3. **Loglib Dashboard**: It offers a beautiful, minimalistic UI to display your analytics.

you can put any of those anywhere means you can put the tracker on ur website put the server on other next js project then put the dashboard on separate react vite project and it will work just fine. Or you can just put everything on your next js project. I feel like the later sounds better but it's up to you.

#### Installation: Just like every other libraries out there

```bash
pnpm add @loglib/tracker
```

```bash
pnpm add @loglib/next
```

```bash
pnpm add @loglib/ui
```

#### Tracker

let's first setup the tracker to collect data from your website.

##### Next-js

App Route

`src/app/layout.tsx`

```js
import LogLib from 'logLib/tracker-js/react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
         <LogLib config={{autoTrack: true}} />
        {children}
      </body>
    </html>
  )
}

// Boom! That's it! You're done!
```

Page Route

`src/pages/_app.tsx`

```js
import LogLib from 'logLib/tracker-js/react';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LogLib config={{autoTrack: true}} />
      <Component {...pageProps} />
    </>
  )
}
```

##### Other Methods

If you want to track a specific event, you can use the `track` method.

```js
import {track} from 'logLib/tracker-js/react';
export default function page() {
  return (
    <>
      <button onClick={() => track("search", {term: "iphone"})}>Search</button>
    </>
  )
}
```

To identify a user, you can use the `identify` method.

```js
import {identify} from 'logLib/tracker-js/react';
export default function page() {
  return (
    <>
      <button onClick={() => identify({id: "1", name: "Joe Rogan"})}>Identify</button>
    </>
  )
}

// Identify we know this is hot topic
// Yeah just pass an object you want to identify the user with
```

##### GDPR things

By default, Loglib tries to track users using their IP address. But hey, we know you're smart enough to realize that relying on IP addresses isn't the most foolproof way to identify unique users. So, if you want to be a tracking superstar, here's what you can do:

**Step 1:** Display a fancy cookie message on your website. You know, one of those pop-ups that everyone loves. Make it irresistible!

**Step 2**: Once your users click that "Accept" button like there's no tomorrow, trigger the Loglib consent function. This little magic trick will use local storage to assign a unique identifier to each of your users.

```js
import {setConsent} from 'logLib/tracker-js';
export default function page() {
  return (
    <>
      <button onClick={() => setConsent("granted")}>Accept</button>
    </>
  )
}
```

| options        | type    | default     | description                               |
| -------------- | ------- | ----------- | ----------------------------------------- |
| `autoTrack`    | boolean | `false`     | Automatically track page views            |
| `consent`      | string  | `"granted"` | The consent status of the user            |
| `debug`        | boolean | `false`     | Enable debug mode                         |
| `env`          | string  | `"auto"`    | The environment of the tracker            |
| `postInterval` | number  | `5`         | The interval to send events to the server |

#### Server

> we currently only support prisma but more adapters are on the way

##### pages route

put this code in `src/pages/api/loglib.ts`

```js
import { createServer } from '@loglib/next';
import { PrismaClient } from '@prisma/client';
import {prismaAdapter} from '@loglib/prisma-adapter';

const prisma = new PrismaClient();

export default createServer({
  adapter: prismaAdapter(prisma),
});
```

##### app route

put this code in `src/app/loglib/api/route.ts` I know the route isn't ideal if you want to change it something else just put `LOGLIB_SERVER_URL` in your env file and it will work just fine

```js
import { createServerRoutes } from "@loglib/next"
import { prismaAdapter } from "@loglib/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()


export const { POST, GET } = createServerRoutes({
    adapter: prismaAdapter(db)
})
```

for getting user location using their ip you have 3 options:

1. Deploy it in vercel and you don't need to worry! (vercel please sponsor us)
2. If you're not deploying it on serverless environment you can setup maxmind using a cli command

```bash
pnpm loglib setup:maxmind
```

> this will download the maxmind database and put it in your project root directory under geo folder.

3. you can pass a custom function to get location

```js
import { createServer } from '@loglib/next';
import { PrismaClient } from '@prisma/client';
import {prismaAdapter} from '@loglib/prisma-adapter';

const db = new PrismaClient();
const POST = Next13({
    adapter: prismaAdapter(db),
    getLocation: async (ip) => {
        // do your thing
        return {
            city: "city",
            country: "country",
        }
    }
})
```

| options        | type    | default     | description                               |
| -------------- | ------- | ----------- | ----------------------------------------- |
| `adapter`    | Adapter | `none`     |  a database adapter
| `getLocation`      | function  | `none` | a custom location finder using ip address           |                        |
| `disableLocation`          | boolean | `false`    | to disable location resolver

okay now you're tracker is up and your server is listening!!

#### Dashboard

now let's get this bad boy to display something

create a page somewhere you want too and just export the dashboard component

```js
import { Dashboard } from '@loglib/ui';
import "@loglib/ui/dist/index.css"

export default Dashboard;
```

yeah that's it now you have a tracker, a server to handle your request and a beautiful dashboard to display your analytics!!!
