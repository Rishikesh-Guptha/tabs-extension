chrome.tabs.onActivated.addListener(tab=>{
    chrome.tabs.get(tab.tabId, current_tab_info =>{
        console.log("Title: "+current_tab_info.title );
        console.log("URL: "+  current_tab_info.url);
    });
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