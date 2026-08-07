function setWebsiteCookie(cookieName, cookieValue, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";" + expires + ";path=/;SameSite=Strict;Secure";
}

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
    return "";
}

function deleteWebsiteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=Strict;Secure";
}

document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById('textInput') || document.querySelector('textarea');
    const fileNameInput = document.getElementById('fileNameInput') || document.querySelector('input[type="text"]');
    const downloadBtn = document.getElementById('downloadBtn') || document.querySelector('.container button, button');

    if (textInput) {
        const restoredText = getWebsiteCookie("savedText");
        if (restoredText && restoredText.trim() !== "") {
            textInput.value = restoredText;
        }
        textInput.addEventListener('input', (event) => {
            setWebsiteCookie("savedText", event.target.value, 7);
        });
    }

    if (downloadBtn && textInput) {
        downloadBtn.addEventListener('click', function () {
            const textContent = textInput.value;
            let fullFileName = fileNameInput ? fileNameInput.value.trim() : "";
            
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
            
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 250);
        });
    }

    const signInBtn = document.getElementById('signInBtn');
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            alert("Securely logged in.");
        });
    }

    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function() {
            if (confirm("Are you sure you want to sign out of your profile session?")) {
                alert("Signed out successfully! (Simulation)");
            }
        });
    }

    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm("WARNING: Are you sure you want to delete your account? This action is completely permanent.")) {
                if (confirm("Final confirmation: Press OK to wipe all data records forever.")) {
                    alert("Account configuration permanently removed! (Simulation)");
                }
            }
        });
    }
});
