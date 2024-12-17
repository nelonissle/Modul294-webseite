const apiKey = "YOUR_DEEPL_API_KEY"; // Replace with your DeepL API Key
const sourceLang = "DE"; // Source language (German)
const targetLang = "EN"; // Target language (English)

document.getElementById("translateButton").addEventListener("click", async function () {
    const textElement = document.getElementById("translate_info");
    const originalText = textElement.textContent;

    try {
        const translatedText = await translateText(originalText, sourceLang, targetLang);
        textElement.textContent = translatedText;
    } catch (error) {
        console.error("Translation failed:", error);
        alert("Failed to translate text. Please try again.");
    }
});

async function translateText(text, sourceLang, targetLang) {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `DeepL-Auth-Key ${apiKey}`,
        },
        body: new URLSearchParams({
            text: text,
            source_lang: sourceLang,
            target_lang: targetLang,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.translations[0].text;
}
