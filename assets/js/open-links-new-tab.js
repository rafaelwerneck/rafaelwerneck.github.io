document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    // Ensure the link is external
    if (link.href && 
        !link.href.startsWith("#") && 
        !link.href.startsWith("javascript:")
       ) {
        
        let shouldOpenInNewTab = false;

        // 1. Check for external links
        if (!link.href.startsWith(location.origin)) {
            shouldOpenInNewTab = true;
        }

        // 2. Check for PDF links (local or external)
        if (link.href.toLowerCase().endsWith(".pdf")) {
            shouldOpenInNewTab = true;
        }

        if (shouldOpenInNewTab) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    }
  });
});