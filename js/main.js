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

//Carrossel
$(document).ready(function () {
  $(".clients-carousel").slick({
    slidesToShow: 6, // Quantidade de logos visíveis em telas grandes
    slidesToScroll: 1, // Quantos logos rolam de cada vez
    autoplay: true, // Rola automático
    autoplaySpeed: 2000, // Velocidade da rolagem (2 segundos)
    arrows: false, // Remove as setas de navegação
    dots: false, // Remove os pontos de navegação
    infinite: true, // Permite rolagem infinita (loop)
    pauseOnHover: false, // Continua rolando mesmo com o mouse em cima
    speed: 1000, // Velocidade da transição
    // Configurações Responsivas
    responsive: [
      {
        breakpoint: 1024, // Em telas de tablet (1024px)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Em telas de celular grande (600px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Em telas de celular pequeno (480px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

//Formulário de Contato
$(document).ready(function () {
  //Máscara
  const SPMaskBehavior = (val) => {
      return val.replace(/\D/g, "").length === 11
        ? "(00) 00000-0000"
        : "(00) 0000-00009";
    },
    spOptions = {
      onKeyPress: (val, e, field, options) => {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      },
    };

  //Aplica a máscara
  $("#celular").mask(SPMaskBehavior, spOptions);

  $("#form-contato input, #form-contato textarea")
    .not('button, input[type="submit"]')
    .each(function () {
      if (!$(this).parent().hasClass("input-container")) {
        let containerClasses = "input-container flex flex-col w-full";

        if ($(this).hasClass("md:col-span-2")) {
          containerClasses += " md:col-span-2";
        }

        // Envolve o campo com o container, incluindo as classes de grid corretas
        $(this).wrap('<div class="' + containerClasses + '"></div>');
      }
    });

  // 4. Validação
  $("#form-contato").validate({
    // Regras de Validação (Corretas)
    rules: {
      nome: { required: true, minlength: 3 },
      celular: { required: true, minlength: 14 },
      email: { required: true, email: true },
      assunto: { required: true, minlength: 3 },
      mensagem: { required: true, minlength: 10 },
    },

    errorElement: "div",
    errorPlacement: (error, element) => {
      error.addClass("text-red-600 text-sm mt-1");
      error.appendTo(element.parent()); // Injeta o erro no 'input-container'
    },

    // submitHandler no nível principal
    submitHandler: (form) => {
      const submitButton = $(form).find('button[type="submit"]');
      submitButton.prop("disabled", true).text("Enviando...");

      const formData = $(form).serialize();

      // Código AJAX para o envio...
      $.ajax({
        type: "POST",
        url: "https://formsubmit.co/contatos@hostche.com.br",
        data: formData,
        dataType: "json",
        success: (response) => {
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "Mensagem enviada com sucesso!",
              showConfirmButton: false,
              timer: 1500,
            });
            form.reset(); // Limpa o formulário após o sucesso
          } else {
            Swal.fire({
              icon: "error",
              title: "Erro ao enviar a mensagem",
              text: response.message,
            });
          }
        },
        error: () => {
          Swal.fire({
            icon: "error",
            title: "Erro ao enviar a mensagem",
            text: "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.",
          });
        },
        complete: () => {
          submitButton.prop("disabled", false).text("Enviar");
        },
      });
    },
  });
});
