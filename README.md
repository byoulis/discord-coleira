# Discord Voice "Leash" Self-Bot

So, this is a little self-bot I threw together. Basically, you pick some people, and whenever you hop into a voice channel, they get dragged along with you. If they try to leave — boom, pulled right back. It's like a leash. Yeah.

> ⚠️ **Heads up:** Self-bots are against [Discord's ToS](https://discord.com/terms). You *will* get banned if you're careless. Use an alt, don't be dumb. I'm not responsible if your main gets nuked.

## What it does

- 🐕 **Auto-drag** — You join a voice channel, everyone on the list gets yanked in with you.
- 🔁 **Auto pull-back** — Someone tries to bail? They're back in before they can blink.
- 🎮 **Toggle on/off** — Type `coleira` in the terminal to turn the whole thing on or off.

## What you need

- [Node.js](https://nodejs.org/) (v16+ — don't use ancient versions)
- `discord.js-selfbot`

Just run:

```bash
npm install discord.js-selfbot
```

## Setting it up

1. Grab the script and save it as `leash.js` (or whatever you want, really).
2. Open it and fill in the top part:

```js
const SEU_TOKEN = '';   // your user token (NOT a bot token)
const SEU_ID    = '';   // your own user ID

const VITIMAS = [       // the people you want to leash
  '',
  '',
  ''
];
```

Here's what each one means:

| Thing       | What it is                                                       |
|-------------|------------------------------------------------------------------|
| `SEU_TOKEN` | Your personal Discord user token. Not a bot token. Don't mix them up. |
| `SEU_ID`    | Your own user ID. You're the one holding the leash.              |
| `VITIMAS`   | List of user IDs that should follow you around.                  |

> 💡 **Getting IDs:** Turn on Developer Mode (Settings → Advanced), then right-click anyone and hit "Copy ID".

> 🔑 **Getting your token:** Open Discord in your browser, hit `F12`, go to the Network tab, send any message, and look for the `authorization` header. **Do NOT share this with anyone. Ever.**

## Running it

```bash
node leash.js
```

If it worked, you'll see something like:

```
Logado como SeuUsuario#0000
Digite "coleira" para ativar/desativar
```

### The one command you need

| Command   | What it does                          |
|-----------|---------------------------------------|
| `coleira` | Toggles the leash ON 🟢 or OFF 🔴     |

While it's ON:

- You join a voice channel → everyone on the list gets moved there.
- Someone on the list leaves → they get pulled right back.

While it's OFF, the bot just sits there doing nothing. Peaceful.

## How it actually works

Two events do all the work:

1. **`ready`** — Fires when you log in. Kicks off the terminal listener so you can type `coleira`.
2. **`voiceStateUpdate`** — Fires whenever anyone changes voice state. Then:

   - **Drag:** If *you* join a channel, it saves that channel and drags everyone from `VITIMAS` in.
   - **Pull back:** If someone from `VITIMAS` leaves, they get forced back.

There's a flag called `coleiraAtiva` that gates everything — so nothing happens until you flip the switch.

## Example

Say your list looks like this:

```
VITIMAS = ['123456789', '987654321']
```

1. You run the script and type `coleira` → leash is ON 🟢
2. You join **#general** → both guys get dragged in.
3. One of them tries to leave → instantly pulled back. Sorry buddy.
4. You switch to **#gaming** → they follow you. Obviously.
5. Type `coleira` again → OFF 🔴. Everyone's free now.

## If something breaks

| What you see                              | What's probably wrong                                        |
|-------------------------------------------|--------------------------------------------------------------|
| `Error: 401 Unauthorized`                 | Token's wrong or expired.                                    |
| `Erro ao mover ...: Unknown Member`       | That person isn't in the same server as you.                 |
| `Erro ao mover ...: Missing Permissions`  | You don't have "Move Members" permission in that channel.    |
| Nobody's getting dragged                  | Leash is off, or your IDs are wrong.                         |
| Script closes instantly                   | Node's too old, or you forgot to install `discord.js-selfbot`. |

## Please don't be a jerk

This is for learning and messing around. Using it to mess with people who didn't sign up for it is:

- Against Discord's ToS → **ban hammer**.
- Probably harassment where you live.

Don't do it to strangers. Don't do it to people who said no. I'm not responsible if you ignore this.

## License

MIT. Do whatever. Just don't come crying to me when your account gets banned.
