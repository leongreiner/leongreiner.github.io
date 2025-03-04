
// Navigation data as a JavaScript object - single source of truth
const navData = {
  // Main navigation items
  mainNav: [
    { text: "About Me", url: "index.html" },
    { 
      text: "Projects", 
      url: "projects.html",
      dropdown: true,
      // Array of project pages
      children: [
        { text: "INSTR", url: "projects/instr.html" },
        { text: "MagDrop4", url: "projects/magdrop4.html" },
        { text: "WALT", url: "projects/walt.html" },
        { text: "AREA", url: "projects/area.html" },
        { text: "Dispenser Robot", url: "projects/dispenser.html" }
        // Add new projects here, and they'll appear everywhere automatically
      ]
    },
    { text: "Career Journey", url: "journey.html" },
    { text: "Contact", url: "contact.html" }
  ]
};

// Make the data available globally
window.navData = navData;
