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
