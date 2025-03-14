const themeSwitch = document.querySelector<HTMLInputElement>('#themeSwitch');

themeSwitch?.addEventListener("click", () => {
    console.log("Switched!");

    const htmlTag = document.documentElement;
    console.log({htmlTag});
    console.log(htmlTag.classList);

    if (htmlTag.classList.contains("dark")) {
        console.log("Turn off!");
        htmlTag.classList.remove("dark")
    } else {
        console.log("Turn on!");
        htmlTag.classList.add("dark");
    }

});

