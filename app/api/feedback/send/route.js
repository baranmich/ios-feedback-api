import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request) {
  try {
    const data = await request.json(); // Přijme data z appky (např. { feedback: "Text", email: "email@example.com", brand: "Apple", modelName: "iPhone 14 Pro", osName: "iOS", osVersion: "17.2", userId: "někdo" })
    
    const { error } = await supabase
      .from('feedback') // Jméno tabulky
      .insert([
        {
          feedback_text: data.feedback, // Povinný text feedbacku
          email: data.email || null, // E-mail, pokud je vyplněný, jinak null (prázdný)
          brand: data.brand || null, // Informace o zařízení, pokud jsou, jinak null
          model_name: data.modelName || null,
          os_name: data.osName || null,
          os_version: data.osVersion || null,
          user_id: data.userId || null // Volitelný, pokud máš
        }
      ]);

    if (error) throw error;

    console.log('Přijatý feedback:', data); // Log pro debug (uvidíš na Vercelu)
    return new Response(JSON.stringify({ message: 'Feedback uložen!' }), { status: 200 });
  } catch (error) {
    console.error('Chyba:', error);
    return new Response(JSON.stringify({ error: 'Chyba při ukládání' }), { status: 500 });
  }
}