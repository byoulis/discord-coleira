const { Client } = require('discord.js-selfbot');
const readline = require('readline');

const client = new Client(); 

const SEU_TOKEN = '';
const SEU_ID = '';

const VITIMAS = [
  '',
  '',
  ''
];

let coleiraAtiva = false;
let canalAtual = null;

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}`);
  iniciarLeituraTerminal();
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (!coleiraAtiva) return;


  if (
    newState.id === SEU_ID &&
    newState.channelID &&
    newState.channelID !== oldState.channelID
  ) {
    canalAtual = newState.channelID;
    const guild = newState.guild;

    for (const id of VITIMAS) {
      try {
        const vitima = await guild.members.fetch(id);

        if (vitima.voice.channelID !== canalAtual) {
          await vitima.voice.setChannel(canalAtual);
          console.log(`Movendo ${vitima.user.tag}`);
        }
      } catch (e) {
        console.log(`Erro ao mover ${id}: ${e.message}`);
      }
    }
  }

 
  if (
    VITIMAS.includes(newState.id) &&
    canalAtual &&
    newState.channelID !== canalAtual
  ) {
    try {
      await newState.member.voice.setChannel(canalAtual);
      console.log(`Puxando ${newState.member.user.tag} de volta`);
    } catch (e) {
      console.log(`Erro ao puxar de volta: ${e.message}`);
    }
  }
});

client.login(SEU_TOKEN);

function iniciarLeituraTerminal() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Digite "coleira" para ativar/desativar');

  rl.on('line', line => {
    if (line.trim().toLowerCase() === 'coleira') {
      coleiraAtiva = !coleiraAtiva;
      console.log(`Coleira ${coleiraAtiva ? 'ATIVADA 🟢' : 'DESATIVADA 🔴'}`);
    }
  });
}
