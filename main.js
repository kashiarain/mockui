function isElementInScrollView(container, element) {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const isVisible =
        elementRect.top >= containerRect.top &&
        elementRect.bottom <= containerRect.bottom &&
        elementRect.left >= containerRect.left &&
        elementRect.right <= containerRect.right;

    return isVisible;
}


document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('leftAside');
    if (sidebar) {


        sidebar.scrollTop = localStorage.getItem('sidebar-scroll') || 0;


        if (sidebar.scrollTop) {
            sidebar.scrollTop = sidebar.scrollTop;
        }

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('sidebar-scroll', sidebar.scrollTop);
        });

        document.querySelectorAll("#leftAside nav a").forEach(link => {
            if (link.href.includes(window.location.pathname)) {
                link.classList.add("bg-rose-500");

                const isVisible = isElementInScrollView(sidebar, link)
                if (!isVisible) {
                    link.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
            }
        });



    }

    const themeToggle = document.getElementById("theme-toggle");


    // Check for saved user preference, if any, on load
    if (
        localStorage.getItem("color-theme") === "dark" ||
        (!("color-theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
        if (themeToggle.value) themeToggle.click();
    }

    // Listen for a click on the toggle button
    themeToggle.onchange = () => {
        // If set via local storage previously
        if (localStorage.getItem("color-theme")) {
            if (localStorage.getItem("color-theme") === "light") {
                document.documentElement.classList.add("dark");
                localStorage.setItem("color-theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("color-theme", "light");
            }

            // If NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("color-theme", "light");
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("color-theme", "dark");
            }
        }
    }
});
