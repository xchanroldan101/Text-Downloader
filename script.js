// Function to handle the actual file conversion and download trigger
document.addEventListener("DOMContentLoaded", () => {
    const downloadButton = document.querySelector('.container button, #download-btn, button'); // Selects your button
    const fileNameInput = document.querySelector('input[type="text"]');                         // Selects your file name box
    const fileTextArea = document.querySelector('textarea');                                    // Selects your file content box

    if (downloadButton && fileTextArea) {
        downloadButton.addEventListener('click', () => {
            // Get the text values or fall back to defaults if empty
            const textContent = fileTextArea.value;
            const fileName = fileNameInput && fileNameInput.value.trim() !== "" ? fileNameInput.value.trim() : "document.txt";

            // Create a temporary downloadable data blob layer
            const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
            const link = document.createElement("a");
            
            // Generate a virtual URL path for the file download pipeline
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            
            // Append link, click it programmatically, then clean it up out of memory
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        });
    }
});

// --- File Generation Strategy ---
document.getElementById('downloadBtn').addEventListener('click', function () {
    const textContent = document.getElementById('textInput').value;
    let fullFileName = document.getElementById('fileNameInput').value.trim();
    
    if (fullFileName === "") {
        fullFileName = "document.txt";
    }
    
    if (!fullFileName.includes('.')) {
        fullFileName += '.txt';
    }
    
    const extension = fullFileName.substring(fullFileName.lastIndexOf('.')).toLowerCase();
    let mimeType = 'text/plain'; 
    if (extension === '.html' || extension === '.htm') mimeType = 'text/html';
    else if (extension === '.css') mimeType = 'text/css';
    else if (extension === '.json') mimeType = 'application/json';
    else if (extension === '.js') mimeType = 'application/javascript';
    else if (extension === '.csv') mimeType = 'text/csv';
    else if (extension === '.xml') mimeType = 'application/xml';
    else if (extension === '.md' || extension === '.markdown') mimeType = 'text/markdown';
    
    const blob = new Blob([textContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fullFileName; 
    
    document.body.appendChild(a);
    a.click();
    
    // Mobile-Fix: Delay file revocation so Android Chrome doesn't drop the data stream
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 250);
});

// --- Interactive User Account Simulation ---
document.getElementById('signInBtn').addEventListener('click', function() {
    alert("Welcome back! You have successfully logged into your profile. (Simulation)");
});

document.getElementById('signOutBtn').addEventListener('click', function() {
    if (confirm("Are you sure you want to sign out of your profile session?")) {
        alert("Signed out successfully! (Simulation)");
    }
});

document.getElementById('deleteAccountBtn').addEventListener('click', function() {
    if (confirm("WARNING: Are you sure you want to delete your account? This action is completely permanent.")) {
        if (confirm("Final confirmation: Press OK to wipe all data records forever.")) {
            alert("Account configuration permanently removed! (Simulation)");
        }
    }
});
// Function to save data in a cook
function setWebsiteCookie(cookieName, cookieValue, daysToLive) {
    const date = new Date()
    // Convert days into millisecond
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString()
    
    // Securely lock the cookie path to your root site
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/;SameSite=Strict";
}

// Example: Save the user's favorite layout theme for 7 days

// Function to find a specific cookie value
function getWebsiteCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return ""; // Returns empty if cookie does not exist
}

// Example: Check if a theme cookie is saved

console.log("Saved theme is: " + currentTheme); // Output: "dark"
// Function to clear a cookie
function deleteWebsiteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=Strict";
}

// Example: Wipe the theme setting
// Automatically save text content to a cookie as the user types
const fileContentTextArea = document.querySelector('textarea');
if (fileContentTextArea) {
    fileContentTextArea.addEventListener('input', (event) => {
        setWebsiteCookie("savedText", event.target.value, 7);
    });
}

// Reload the saved text automatically when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const restoredText = getWebsiteCookie("savedText");
    const targetTextArea = document.querySelector('textarea');
    if (restoredText && targetTextArea) {
        targetTextArea.value = restoredText;
    }
});
