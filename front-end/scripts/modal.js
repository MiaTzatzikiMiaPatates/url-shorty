document.addEventListener("DOMContentLoaded", () => {

    const modal = document.querySelector("#myModal");
    const btn = document.querySelector(".rename-button");
    const span = document.querySelector(".close");


    btn.onclick = () => {
        modal.style.display = "block";
    }

    span.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});
