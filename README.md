# Discord Voice "Leash" Self-Bot

A simple self-bot that keeps selected users "leashed" to your voice channel. Whenever you move to a new voice channel, the bot automatically drags the configured users with you — and pulls them back if they try to leave.

> ⚠️ **Disclaimer:** Self-bots violate [Discord's Terms of Service](https://discord.com/terms) and can result in your account being permanently banned. Use at your own risk, preferably on an alt account.

## Features

- 🐕 **Auto-drag:** When you join a voice channel, all "leashed" users are moved to the same channel.
- 🔁 **Auto-pull-back:** If a leashed user leaves your channel, they are instantly pulled back.
- 🎮 **Toggle on/off:** Enable or disable the leash at runtime via a terminal command.

## Requirements

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- `discord.js-selfbot` package
- `readline` (bundled with Node.js)

Install the dependency:

```bash
npm install discord.js-selfbot
```

## Setup

Clone this repository or copy the script into a file (e.g. `leash.js`).

Open the file and fill in the configuration constants at the top:

```js
const SEU_TOKEN = '';   // Your Discord user token
const SEU_ID    = '';   // Your own Discord user ID

const VITIMAS = [       // Users to keep leashed (their IDs)
  '',
  '',
  ''
];
```

| Constant    | Description                                                      |
|-------------|------------------------------------------------------------------|
| `SEU_TOKEN` | Your personal Discord **user token** (not a bot token).          |
| `SEU_ID`    | Your own Discord user ID — the "owner" of the leash.             |
| `VITIMAS`   | Array of user IDs that should follow you around.                 |

> 💡 **How to get IDs:** Enable *Developer Mode* in Discord settings (User Settings → Advanced), then right-click a user and choose **Copy ID**.

> 🔑 **How to get your token:** Open Discord in a browser, press `F12`, go to the **Network** tab, send any message, and look at the request headers for the `authorization` field. **Never share this token with anyone.**

## Usage

Run the script:

```bash
node leash.js
```

You should see:

```
Logado como SeuUsuario#0000
Digite "coleira" para ativar/desativar
```

### Terminal commands

| Command    | Action                                                          |
|------------|-----------------------------------------------------------------|
| `coleira`  | Toggles the leash **ON** 🟢 or **OFF** 🔴.                       |

When the leash is **ON**:

- Join any voice channel → all leashed users are moved there automatically.
- If a leashed user leaves → they are immediately pulled back.

When the leash is **OFF**, the bot ignores all voice events.

## How It Works

The script listens to two events:

1. **`ready`** — Fires when the client logs in. Starts the terminal listener for the `coleira` toggle.

2. **`voiceStateUpdate`** — Fires whenever **anyone** in a shared guild changes voice state. Two rules apply:

   - **Rule 1 (drag):** If *you* (`SEU_ID`) join a channel, save it as `canalAtual` and move every user in `VITIMAS` into it.
   - **Rule 2 (pull back):** If a user in `VITIMAS` leaves `canalAtual`, force them back into it.

A global flag `coleiraAtiva` gates both rules, so nothing happens until you type `coleira`.

## Example Scenario

```
VITIMAS = ['123456789', '987654321']
```

1. You run `node leash.js` and type `coleira` in the terminal → leash is **ACTIVE** 🟢.
2. You join voice channel **#general** → users `123456789` and `987654321` are dragged in.
3. User `123456789` tries to leave → they are pulled right back.
4. You switch to voice channel **#gaming** → both users follow you automatically.
5. Type `coleira` again → leash is **OFF** 🔴. Everyone can leave freely.

## Troubleshooting

| Problem                              | Likely Cause                                                    |
|--------------------------------------|-----------------------------------------------------------------|
| `Error: 401 Unauthorized`            | Invalid or expired `SEU_TOKEN`.                                 |
| `Erro ao mover ...: Unknown Member`  | The user is not in the same guild as you.                       |
| `Erro ao mover ...: Missing Permissions` | You don't have **Move Members** permission in that channel. |
| Users not being dragged              | Leash is OFF, or `SEU_ID` / `VITIMAS` IDs are wrong.            |
| Script exits immediately             | Node.js version too old, or missing `discord.js-selfbot`.       |

## Legal / Ethical Notice

This tool is provided **for educational purposes only**. Using a self-bot to control other users' voice state without their consent may:

- Violate Discord's Terms of Service → **account termination**.
- Be considered harassment in your jurisdiction.

**Do not use this on people who haven't agreed to it.** The author assumes no responsibility for any consequences.

## License

MIT — do whatever you want, just don't blame me when your account gets nuked.
