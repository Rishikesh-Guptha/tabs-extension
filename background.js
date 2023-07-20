function updatePopupWithTabInfo(title, url) {
    const titleElement = document.getElementById("title");
    const urlElement = document.getElementById("url");

    if(titleElement && urlElement){
        titleElement.textContent = "Title: " + title;
        urlElement.textContent = "URL: " + url;
    }
    
}

// get current active tab & update popup when it's loaded
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const title = activeTab.title;
    const url = activeTab.url;
    updatePopupWithTabInfo(title, url);
  });
  


chrome.tabs.onActivated.addListener(tab=>{
    chrome.tabs.get(tab.tabId, current_tab_info =>{
        console.log("Title: "+current_tab_info.title );
        console.log("URL: "+  current_tab_info.url);
        const title = current_tab_info.title;
        const url = current_tab_info.url;
        updatePopupWithTabInfo(title, url);
    });
});

// event listener to update the popup when the title of the active tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.title) {
      updatePopupWithTabInfo(changeInfo.title, tab.url);
    }
  });


 chrome.tabs.onUpdated.addListener(tab=>{
        chrome.tabs.get(tab.tabId, current_tab_info =>{
            console.log(current_tab_info.title)
        });
 });


 
// chrome.bookmarks.get(id, bookmark =>{
//     console.log('bookmark', bookmark[0].children );
// }
// )

// chrome.addListener(bookmark =>{
//     chrome.bookmarks.getTree(tree =>{
//         console.log(flattenBookmarks(tree));
//     })
// })