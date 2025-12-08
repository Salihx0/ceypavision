// ===================================
// CEYPA VISION - No Selection & Copy Protection
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Disable right-click (context menu)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        // F12 - Developer Tools
        if (e.keyCode == 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I - Developer Tools
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J - Console
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U - View Source
        if (e.ctrlKey && e.keyCode == 85) {
            e.preventDefault();
            return false;
        }
        // Ctrl+C - Copy
        if (e.ctrlKey && e.keyCode == 67) {
            e.preventDefault();
            return false;
        }
        // Ctrl+A - Select All
        if (e.ctrlKey && e.keyCode == 65) {
            e.preventDefault();
            return false;
        }
        // Ctrl+X - Cut
        if (e.ctrlKey && e.keyCode == 88) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S - Save
        if (e.ctrlKey && e.keyCode == 83) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable text selection via mouse
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && 
            e.target.tagName !== 'TEXTAREA' && 
            !e.target.isContentEditable) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable copy event
    document.addEventListener('copy', function(e) {
        if (e.target.tagName !== 'INPUT' && 
            e.target.tagName !== 'TEXTAREA' && 
            !e.target.isContentEditable) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable cut event
    document.addEventListener('cut', function(e) {
        if (e.target.tagName !== 'INPUT' && 
            e.target.tagName !== 'TEXTAREA' && 
            !e.target.isContentEditable) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable paste (optional - uncomment if needed)
    /*
    document.addEventListener('paste', function(e) {
        if (e.target.tagName !== 'INPUT' && 
            e.target.tagName !== 'TEXTAREA' && 
            !e.target.isContentEditable) {
            e.preventDefault();
            return false;
        }
    });
    */
    
    // Disable print screen (limited effectiveness)
    document.addEventListener('keyup', function(e) {
        if (e.key == 'PrintScreen') {
            navigator.clipboard.writeText('');
            alert('Ekran görüntüsü alma devre dışı bırakıldı.');
        }
    });
    
    // Detect DevTools opening (basic detection)
    const devtools = {
        isOpen: false,
        orientation: undefined
    };
    
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            if (!devtools.isOpen) {
                devtools.isOpen = true;
                console.log('Developer tools açıldı!');
                // Optional: Redirect or show warning
                // window.location.href = 'about:blank';
            }
        } else {
            if (devtools.isOpen) {
                devtools.isOpen = false;
            }
        }
    }, 500);
    
    console.log('%c⚠️ UYARI!', 'font-size: 30px; font-weight: bold; color: red;');
    console.log('%cBu konsolu kullanmak sitenize zarar verebilir!', 'font-size: 16px; color: orange;');
    console.log('%cBilinmeyen kodları buraya yapıştırmayın!', 'font-size: 14px; color: yellow;');
    
});
