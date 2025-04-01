import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const productData = [
  { name: "Kanapa LORD 3F", price: 2099, color: "szary", features: "funkcja spania, pojemnik na pościel" },
  { name: "Fotel LORD 1F", price: 999, color: "szary", features: "tapicerowany fotel, dopasowany do kanapy LORD" },
  { name: "Kanapa AROS 2F", price: 1899, color: "ciemny szary", features: "funkcja spania, pojemnik na pościel" },
  { name: "Sofa Cindy II", price: 1799, color: "jasny beż", features: "styl skandynawski, wysokie nóżki" },
  { name: "Sofa Cindy III", price: 1999, color: "beżowy", features: "styl skandynawski, funkcja spania" },
  { name: "Fotel Cindy", price: 999, color: "beżowy", features: "styl skandynawski, dopasowany do sof Cindy" }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const { messages } = req.body;

    const systemPrompt = `Jesteś doradcą klienta sklepu internetowego z meblami. Pomóż klientowi dobrać produkt spośród poniższej oferty:

${productData.map(p => `• ${p.name} (${p.price} zł, kolor: ${p.color}) – ${p.features}`).join("\n")}

Odpowiadaj zawsze po polsku.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
    });

    const reply = response.choices?.[0]?.message?.content || 'Brak odpowiedzi.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("❌ Błąd w API:", err);
    return res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
}
