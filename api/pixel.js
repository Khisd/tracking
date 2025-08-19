export default async function handler(req, res) {
  // === Konfigurasi Telegram ===
  const botToken = "8014524841:AAFqk7tnhdpBLx2DYVPTUUilUCqSWJaVsz0";   // Ganti token bot Telegram lo
  const chatId   = "1452166277";     // Ganti chat_id lo (bisa dari @get_id_bot)

  // === Ambil data dari request ===
  const ip = req.headers["x-forwarded-for"] || req.connection?.remoteAddress;
  const ua = req.headers["user-agent"] || "Unknown";
  const date = new Date().toISOString();

  // === Buat pesan ===
  const message = `📡 *Tracking Alert*
🕒 Waktu: ${date}
🌐 IP: ${ip}
📱 Device: ${ua}`;

  // === Kirim ke Telegram ===
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Gagal kirim ke Telegram:", err);
  }

  // === Serve pixel ===
  res.setHeader("Content-Type", "image/png");
  res.sendFile("pixel.png", { root: "./public" });
}
