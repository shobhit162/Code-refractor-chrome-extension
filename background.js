chrome.contextMenus.create({
  title: "Refactor code",
  contexts: ["selection"],
  onclick: function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {selectedCode: info.selectionText});
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.selectedCode) {
      fetch('https://api.openai.com/v1/engines/refactor/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer My API key here'
        },
        body: JSON.stringify({
          prompt: request.selectedCode,
          max_tokens: 100,
          temperature: 0.5
        })
      })
        .then(response => response.json())
        .then(data => {
          chrome.tabs.sendMessage(sender.tab.id, {refactoredCode: data.choices[0].text});
        })
        .catch(error => console.error(error));
    }
  }
);
