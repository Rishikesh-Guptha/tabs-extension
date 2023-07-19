chrome.tabs.onActivated.addListener(tab=>{
    chrome.tabs.get(tab.tabId, current_tab_info =>{
        console.log("Title: "+current_tab_info.title );
        console.log("URL: "+  current_tab_info.url);
    });
});

//  chrome.tabs.onUpdated.addListener(tab=>{
//         chrome.tabs.get(tab.tabId, current_tab_info =>{
//             console.log(current_tab_info.title)
//         });
//  });