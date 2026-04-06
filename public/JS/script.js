// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();


// document.querySelector('.custom-file-input').addEventListener('change', function(e) {
//     let fileName = e.target.files[0].name;
//     e.target.nextElementSibling.innerText = fileName;
// });

//  document.getElementById("image").addEventListener("change", function () {
//     let fileName = this.files[0]?.name || "No chosen file";

//     function format(name) {
//       if (name.length <= 30) return name;
//       return name.slice(0, 12) + "..." + name.slice(-10);
//     }

//     this.nextElementSibling.innerText = format(fileName);
//     this.nextElementSibling.title = fileName; // full name on hover
//   });
