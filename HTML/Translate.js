document.getElementById("translateButton").addEventListener("click", async function () {
    const textElement = document.getElementById("translate_info");
    const originalText = textElement.textContent;

    try {
        const response = await fetch("http://localhost:5013/api/translation/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: originalText,
                sourceLang: "DE",
                targetLang: "EN",
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to translate.");
        }

        const translatedText = await response.text(); // Get response text directly
        textElement.textContent = translatedText; // Update the paragraph with translated text
    } catch (error) {
        console.error("Translation failed:", error);
        alert("Failed to translate text. Please try again.");
    }
});
