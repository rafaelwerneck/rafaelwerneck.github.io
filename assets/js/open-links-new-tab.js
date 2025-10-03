document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".author__urls a");
  links.forEach(link => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
});