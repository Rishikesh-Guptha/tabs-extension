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
 

// get current active tab & update popup when it's loaded
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const title = activeTab.title;
    const url = activeTab.url;
    updatePopupWithTabInfo(title, url);
  });
  


// chrome.tabs.onActivated.addListener(tab=>{
//     chrome.tabs.get(tab.tabId, current_tab_info =>{
//         console.log("Title: "+current_tab_info.title );
//         console.log("URL: "+  current_tab_info.url);
//         const title = current_tab_info.title;
//         const url = current_tab_info.url;
//         updatePopupWithTabInfo(title, url);
//     });
// });



// event listener to update the popup when the title of the active tab is updated
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (tab.active && changeInfo.title) {
//       updatePopupWithTabInfo(changeInfo.title, tab.url);
//       console.log(tab.url);
//     }
//   });

// Function to display the title and URL in the popup (optional).
function displayTabInfo(tab) {
  // document.getElementById('title').textContent = tab.title;
  // document.getElementById('url').textContent = tab.url;
  console.log(tab.title);
  console.log(tab.url);
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






 
