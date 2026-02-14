export async function POST(request) {
  try {
    const data = await request.json(); // Přijme data z appky (např. { feedback: "Ahoj, tohle je test" })
    console.log('Přijatý feedback:', data); // Zaloduje do konzole (na Vercelu uvidíš v logách)
    return new Response(JSON.stringify({ message: 'Feedback přijat!' }), { status: 200 });
  } catch (error) {
    console.error('Chyba:', error);
    return new Response(JSON.stringify({ error: 'Chyba při zpracování' }), { status: 500 });
  }
}