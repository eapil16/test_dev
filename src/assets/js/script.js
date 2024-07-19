'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // slider
	const slider = new Swiper(".slider", {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    speed: 800,
    pagination: {
      el: ".slider-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-next",
      prevEl: ".slider-prev",
    },
  });

  document.querySelector('body').addEventListener('click', e => {
    // tabs 
    if (e.target.closest('.tabs__button')) {
      const collButton = document.querySelectorAll('.tabs__button');
      const collTabs = document.querySelectorAll('.tabs__block');
      collButton.forEach(item => {
        item.classList.remove('active');
      });
      e.target.closest('.tabs__button').classList.add('active');

      collTabs.forEach(item => {
        const dataButton = e.target.closest('.tabs__button').getAttribute('data-target').slice(-1);
        const dataTab = item.getAttribute('data-toggle').slice(-1);
        item.classList.remove('active');

        if (dataButton === dataTab) {
          const tabHeight = item.querySelector('.tabs__flex').offsetHeight;
          item.style.height = `${tabHeight}px`;
          item.classList.add('show');
        } else {
          item.classList.remove('show');
          item.style.height = `0px`;
        }
      });
    }
    // modal 
    if (e.target.closest('.show-modal')) {
      document.querySelector('.modal').classList.add('show');
      document.querySelector('body').classList.add('hidden')
    }
    if (e.target.closest('.modal__content_close') || ( !e.target.closest('.show-modal') && !e.target.closest('.modal__content')) ) {
      document.querySelector('.modal').classList.remove('show');
      document.querySelector('body').classList.remove('hidden')
    }
  })

  // phone mask 
  document.getElementById('phone').addEventListener('input', function(e) {
    var input = e.target;
    var value = input.value.replace(/\D/g, '');
    var formattedValue = '+7 (';

    if (value.length > 1) {
        formattedValue += value.substring(1, 4);
    }
    if (value.length >= 5) {
        formattedValue += ') ' + value.substring(4, 7);
    }
    if (value.length >= 8) {
        formattedValue += '-' + value.substring(7, 9);
    }
    if (value.length >= 10) {
        formattedValue += '-' + value.substring(9, 11);
    }

    input.value = formattedValue;
  });

  // form validation

  const validateInputText = (input) => {
		let valid = true;
		if (input.value == '') {
			valid = false;
      input.parentNode.classList.add('error');
		}
		if (input.name == 'phone') {
			if (input.value.length !== 18) {
				valid = false;
			}
		}

		return valid;
	}

	const errorInputText = (input, form) => {
    if (input.value == '') {
			input.parentNode.classList.add('error');
			input.parentNode.classList.remove('success');
		} else {
			input.parentNode.classList.remove('error');
			input.parentNode.classList.add('success');
		}
		if (input.name == 'phone') {
      if (input.value.length === 18) {
        input.parentNode.classList.remove('error');
			  input.parentNode.classList.add('success');
      } else {
        input.parentNode.classList.add('error');
        input.parentNode.classList.remove('success');
      }
		}
	}

	const validateInputCheckbox = (input) => {
		let valid = true;
    if (!input.checked) {
			valid = false;
      input.parentNode.classList.add('error');
		}
		return valid;
	}

	const errorInputCheckbox = (input, form) => {
		if (input.checked) {
			input.parentNode.classList.remove('error');
		} else {
			input.parentNode.classList.add('error');
		}
	}


	const validateForm = (form) => {
		let valid = true;
	
		let inputs = form.querySelectorAll('input:not([type="checkbox"])');
		let checkbox = form.querySelectorAll('input[type="checkbox"][data-required="required"]');

		inputs.forEach((input) => {
			if (!validateInputText(input)) {
       	valid = false;
      }
		});

		checkbox.forEach((input) => {
			if (!validateInputCheckbox(input)) {
       valid = false;
      }
		});

		return valid;
	}

	let forms = document.querySelectorAll('form');

	if (forms.length > 0) {
		forms.forEach((form) => {
			let inputs = form.querySelectorAll('input:not([type="checkbox"])');
			let checkbox = form.querySelectorAll('input[type="checkbox"][data-required="required"]');
      let message = form.querySelector('.contacts__form_message');
			// Keyup validation
			inputs.forEach((input) => {
				input.addEventListener('keyup', function () {
					errorInputText(input, form);
				});
			});

			checkbox.forEach((input) => {
				input.addEventListener('change', function () {
					errorInputCheckbox(input, form);
				});
			});

			// End Keyup validation
			form.addEventListener('submit', function (e) {
				e.preventDefault();
				
				let valid = validateForm(form);

				if (valid) {
					message.classList.add('show');
          setTimeout(() => {
            message.classList.remove('show');
            form.reset();
          }, 3000);
				}

				// End Validation after submit
			});
		});
	}
  
});
