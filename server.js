const express = require("express");
const app = express();

app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1491946845935505573/SbezTyqbwwaDcqwzT0gR8VWz_0NYJYse68C68JDHRsTAQj5KQ7xfFvEdxXAaUEAp9Ls7";

app.post("/stripe-webhook", async (req, res) => {
    const event = req.body;

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

      const productName = session.metadata?.product_name || "RSC Product";

const message = {
    embeds: [
        {
            title: "🚨 RSC ORDER ALERT",
            description: `**${productName}** was just purchased!`,
            color: 16711680,
            fields: [
                {
                    name: "Status",
                    value: "✅ Order Confirmed",
                    inline: true
                },
                {
                    name: "Time",
                    value: "Just now",
                    inline: true
                }
            ],
            footer: {
                text: "RSC Production Services"
            }
        }
    ]
};

        await fetch(DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message)
        });
    }

    res.sendStatus(200);
});

app.get("/", (req, res) => {
    res.send("RSC Webhook Running");
});

app.listen(3000, () => console.log("Server running"));
