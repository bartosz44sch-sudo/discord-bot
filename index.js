require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ID bota Disboard
const DISBOARD_ID = "302050872383242240";

// Bot gotowy
client.once('clientReady', () => {
    console.log(`Bot jest online jako ${client.user.tag}`);
});

// Nasłuchiwanie wiadomości
client.on('messageCreate', async (message) => {
    // Tylko wiadomości od Disboard
    if (message.author.id !== DISBOARD_ID) return;

    // Musi zawierać embed
    if (!message.embeds.length) return;

    const embed = message.embeds[0];

    // Sprawdza czy bump się udał
    if (embed.description && embed.description.includes("Bump done")) {

        try {
            // Pobiera ostatnie wiadomości, aby znaleźć kto użył /bump
            const messages = await message.channel.messages.fetch({ limit: 10 });

            const bumpMessage = messages.find(m =>
                m.interaction &&
                m.interaction.commandName === "bump"
            );

            if (bumpMessage) {
                const user = bumpMessage.interaction.user;
                message.channel.send(`Dzięki za bump wielkie AUU dla ciebie ${user}! 🐺🐾`);
            } else {
                message.channel.send("Dzięki za bump wielkie AUU dla ciebie! 🐺🐾");
            }

        } catch (error) {
            console.error("Błąd przy sprawdzaniu bumpa:", error);
        }
    }
});

// Logowanie (token z .env lub Render Environment)
client.login(process.env.TOKEN);


