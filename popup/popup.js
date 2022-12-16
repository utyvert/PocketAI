// code to update popup html
// reference openai
//alert('ahh');
// alert(selObj.toString());

//alert(this.window);
//alert(test === this.window);

// let
//alert(selobj);
/*
let summarizeButton = document.querySelector('#summarize-btn');
alert(summarizeButton);
function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    //script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
//alert(chrome.runtime.getURL('scripts/openai.js'));
//summarizeButton.addEventListener('click', () => {

injectScript(chrome.runtime.getURL('scripts/content.js'), 'body');
 //   injectScript()

*/

// let highlightedText;
//let selectedText = window.getSelection();

// window.addEventListener('message', event => {
//   highlightedText = event.data; // or event.data?
//   alert('message received +', highlightedText);

// });

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   //
//   chrome.tabs.sendMessage(tabs[0].id, {type: "getCount"}, function(count) {
//       /* ... */
//   });
// });








// chrome.runtime.onMessage.addListener(
//   function(message, sender, sendResponse) {
//       switch(message.type) {
//           case "getCount":
//             // send back the window . selection()
//               sendResponse(count);
//               break;
//           default:
//               console.error("Unrecognised message: ", message);
//       }
//   }
// );



// API




const { fetch } = window;

const generateButton = document.getElementById('summarize-btn')
const summarizeDiv = document.getElementById('summarize-text')
const textArea = document.getElementById('textArea')

const apiKey = '';

async function GPT(prompt) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0,
    }),
  })
  // .then(data => console.log(data))
  // .catch(error => {console.log(error)});

  if (response.ok) {
    const data = await response.json();
    const generatedText = data.choices[0].text.trim();
    console.log(prompt)
    console.log(generatedText)
    return generatedText
  } else {
    console.log(response.statusText)
  }
  

  // console.log(response)
  // const generatedText = response.data.choices[0].text.trim();

  // console.log(prompt)
  // console.log(generatedText);
  // console.log('clicked')
}


function callGPT() {
  let text;
  if (textArea.value === '') {
    text = ' '
  } else {
    text = textArea.value;
  }
  
  const completePrompt = `${text}`
  
  GPT(completePrompt).then(generatedText => {
    summarizeDiv.textContent = generatedText;
    summarizeDiv.style.whiteSpace = 'pre-wrap';
    console.log(prompt)
    console.log(generatedText)
  })
}



// Add the event listener to the generateButton element
generateButton.addEventListener('click', (prompt) => {
  // Call the callGPT() function inside the event listener
  callGPT();
  // textArea.value = '';

  console.log('clicked');
});


generateButton.addEventListener('keydown', (event) => { 
  if (event.key === 'Enter') { // if enter pressed
    callGPT(); // Call the callGPT() function inside the event listener
  }


  console.log('enter pressed');
});



