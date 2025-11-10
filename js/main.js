$(document).ready(function () {
  //Menu mobile
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");
  const menuIcon = $("#menu-icon"); // O SVG que representa o ícone

  const setCloseIcon = () => {
    menuIcon.find("path").attr("d", "M6 18L18 6M6 6l12 12");
    menuToggle.attr("aria-label", "Fechar Menu");
  };

  const setMenuIcon = () => {
    menuIcon.find("path").attr("d", "M4 6h16M4 12h16M4 18h16");
    menuToggle.attr("aria-label", "Menu");
  };

  menuToggle.click(function () {
    mobileMenu.slideToggle(350, function () {
      if (mobileMenu.is(":visible")) {
        setCloseIcon();
        menuToggle.addClass("menu-open");
      } else {
        setMenuIcon();
        menuToggle.removeClass("menu-open");
      }
    });
  });

  $("#mobileMenu a").click(function () {
    mobileMenu.slideUp(300, function () {
      setMenuIcon();
      menuToggle.removeClass("menu-open");
    });
  });

  //Navbar sticky
  const navbar = $("#navbar");
  const defaultBg = "#F36C21";
  const scrolledBg = "#e55f1e";

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

  $('a[href^="#"]').on("click", function (event) {
    const target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        600
      );
    }
  });
});

//Carrossel
$(document).ready(function () {
  $(".clients-carousel").slick({
    slidesToShow: 6, //Slides para serem mostrados no desktop
    slidesToScroll: 1, //Slides para serem scrollados
    autoplay: true, //Play automático
    autoplaySpeed: 2000, //Velocidade do autoplay
    arrows: false, //Sem flechinhas
    dots: false, //Sem bolinhas (pontos)
    infinite: true, //Roda infinito
    pauseOnHover: false, //Tira a pausa quando passa o mouse
    speed: 1000, //Velocidade da transição
    //Configurações Responsivas
    responsive: [
      {
        breakpoint: 1024, //Em telas de tablet (width:1024px)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Em telas de celular grande (width:600px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Em telas de celular pequeno (width:480px)
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

        //Envolve o campo com o container, incluindo as classes de grid corretas
        $(this).wrap('<div class="' + containerClasses + '"></div>');
      }
    });

  //Validação
  $("#form-contato").validate({
    //Regras de Validação
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
      error.appendTo(element.parent()); //Injeta o erro no 'input-container'
    },

    //submitHandler no nível principal
    submitHandler: (form) => {
      const submitButton = $(form).find('button[type="submit"]');
      submitButton.prop("disabled", true).text("Enviando...");

      const formData = $(form).serialize();

      //AJAX para o envio...
      $.ajax({
        type: "POST",
        url: "https://formsubmit.co/contatos@hostche.com.br", //Domínio externo para mostrar o resultado do envio funcionando sem criar PHPMailer
        data: formData,
        dataType: "json",
        success: (response) => {
          //Dados ok
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "Mensagem enviada com sucesso!",
              showConfirmButton: false,
              timer: 1500,
            });
            form.reset(); //Limpa o formulário após o sucesso
          } else {
            Swal.fire({
              icon: "error",
              title: "Erro ao enviar a mensagem",
              text: response.message, //Mensagem do erro
            });
          }
        },
        error: () => {
          //Erro em alguma parte
          Swal.fire({
            icon: "error",
            title: "Erro ao enviar a mensagem",
            text: "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.",
          });
        },
        complete: () => {
          //Depois que enviou, deixa o botão inativo
          submitButton.prop("disabled", false).text("Enviar");
        },
      });
    },
  });
});
