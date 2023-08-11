// const MongoClient = require('mongodb').MongoClient;
// import { MongoClient } from 'mongodb';

// function connectAndInsertData(data) {
//     const url = 'mongodb://localhost:27017';
//     const dbName = 'mydatabase';

//     const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

//     client.connect((err) => {
//         if (err) {
//             console.error('Error connecting to the database:', err);
//             return;
//         }

//         const db = client.db(ss-trail);
//         const collection = db.collection('tabs');
//         // const data = { name: 'John', age: 30 };

//         collection.insertOne(data, (insertErr, result) => {
//             if (insertErr) {
//                 console.error('Error inserting data:', insertErr);
//             } else {
//                 console.log('Data inserted:', result.ops);
//             }

//             client.close();
//         });
//     });
// }

// Example: Register a command to trigger the data insertion
// vscode.commands.registerCommand('extension.insertData', () => {
//     connectAndInsertData();
// });



//BOOKMARKS

function updatePopupWithTabInfo(title, url) {
    const titleElement = document.getElementById("title");
    const urlElement = document.getElementById("url");
    const bookmarkBtn = document.getElementById("bookmarkBtn");
    const bookmarkedList = document.getElementById("bookmarkedList");
    
    if(titleElement && urlElement && bookmarkBtn){
        titleElement.textContent = "Title: " + title;
        urlElement.textContent = "URL: " + url;

        //check if the current URL is bookmarked
        chrome.bookmarks.search({ url: url }, (bookmarks) => {
            if(bookmarks.length > 0){
                // link is bookmarked
                bookmarkBtn.textContent = "Bookmarked";
                bookmarkBtn.disabled = true;
            } else{
                //link not bookmarked
                bookmarkBtn.textContent = "Bookmark this page";
                bookmarkBtn.disabled = false;
            }
        });

        // Add click event to bookmark button
        bookmarkBtn.onclick = function () {
            // Save the bookmark using the chrome.bookmarks API
            chrome.bookmarks.create({ title: title, url: url }, (newBookmark) => {
            console.log("Bookmark created with ID: " + newBookmark.id);
            // Update the button state after bookmarking
            bookmarkBtn.textContent = "Bookmarked";
            bookmarkBtn.disabled = true;
            });
        };


        //fetch and display bookmarked pages
        chrome.bookmarks.getTree((bookmarkTree) => {
            const bookmarkList = getBookmarkList(bookmarkTree);
            bookmarkedList.innerHTML = bookmarkList;
        });
     };
}
    
function getBookmarkList(bookmarkTree){
    let listHTML = "<ul>";
    for (let i = bookmarkTree.length - 1; i >= 0; i--) {
      const node = bookmarkTree[i];
     
      if (node.children) {
        listHTML += `<li><b>${node.title}</b></li>`;
        listHTML += getBookmarkList(node.children);
      } else {
        listHTML += `<li><a href="${node.url}" target="_blank">${node.title}</a></li>`;
      }
    }
    listHTML += "</ul>";
    return listHTML;
}
 
//TABS

// get current active tab & update popup when it's loaded
// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const activeTab = tabs[0];
//     const title = activeTab.title;
//     const url = activeTab.url;
//     updatePopupWithTabInfo(title, url);
//   });
  
//Function to push the data to mongodb server
// async function push_data(title,url){
//   let result = await fetch(
//     'http://localhost:5000/register', {
//         method: "post",
//         body: JSON.stringify({title, url}),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     result = await result.json();
//     console.warn(result);
//     if (result) {
//         alert("Data saved succesfully");
//     }
// }
// Function to display the title and URL in the popup (optional).
function displayTabInfo(tab) {

  console.log(tab.title);
  console.log(tab.url);
  // send_data(tab.title);
  // connectAndInsertData(tab.title);
  
}

// Function to handle the response from the tabs.query() method.
function handleTabs(tabs) {
  if (tabs && tabs.length > 0) {
    const activeTab = tabs[0];
    displayTabInfo(activeTab);
  }
}

// Function to handle when tabs are switched
function handleTabChange() {
  chrome.tabs.query({ active: true, currentWindow: true }, handleTabs);
}

// Function to handle when the tabs are updated
function handleTabUpdate(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    displayTabInfo(tab);
  }
}

chrome.tabs.onActivated.addListener(handleTabChange);
chrome.tabs.onUpdated.addListener(handleTabUpdate);

