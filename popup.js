const API_KEY = "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";
const MODEL = "text-davinci-002";
const API_URL = `https://api.openai.com/v1/engines/${MODEL}/jobs`;

const selectedCode = document.getElementById("selected-code");
const refactorCodeBtn = document.getElementById("refactor-code");

refactorCodeBtn.addEventListener("click", async function () {
    const code = selectedCode.value;
    if (!code) {
        return;
    }

    const result = await refactorCode(code);
    if (!result) {
        return;
    }

    selectedCode.value = result;
});

async function refactorCode(code) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "prompt": "Refactor this code",
            "max_tokens": 1000,
            "temperature": 0.5,
            "n": 1,
            "stop": "",
            "model": MODEL,
            "text_input": code
        })
    });

    if (!response.ok) {
        console.error(`Error refactoring code: ${response.statusText}`);
        return null;
    }

    const json = await response.json();
    return json.choices[0].text;
}
