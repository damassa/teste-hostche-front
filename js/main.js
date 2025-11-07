// main.js
$(document).ready(function () {
  // === MENU MOBILE ===
  $("#menuToggle").click(function () {
    $("#mobileMenu").slideToggle(250);
  });

  $("#mobileMenu a").click(function () {
    $("#mobileMenu").slideUp(200);
  });

  // === STICKY NAVBAR (muda visual ao rolar) ===
  const navbar = $("#navbar");
  const defaultBg = "#F36C21";
  const scrolledBg = "#e55f1e"; // tom levemente mais escuro ao rolar

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      navbar
        .css("background-color", scrolledBg)
        .addClass("shadow-lg backdrop-blur-md bg-opacity-95");
    } else {
      navbar
        .css("background-color", defaultBg)
        .removeClass("shadow-lg backdrop-blur-md bg-opacity-95");
    }
  });

  // === SCROLL SUAVE ===
  $('a[href^="#"]').on("click", function (event) {
    const target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80, // ajusta para a altura do header
        },
        600
      ); // duração em ms
    }
  });
});
