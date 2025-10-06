document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    // Ensure the link is external
    if (link.href && !link.href.startsWith(location.origin) && !link.href.startsWith("#") && !link.href.startsWith("javascript:")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});