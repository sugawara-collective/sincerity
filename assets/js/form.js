formIDs = ['entry.286711987', 'entry.1454145751']

function sendQuestion() {
  form = {}
  name = $('#name')[0].value;
  question = $('#question')[0].value;

  // console.log(dataID, form);
    try {
      name = name == '' ? 'anon' : name;

      form[formIDs[0]] = name;
      form[formIDs[1]] = question;
      // console.log(form);

      setTimeout(function() {

          // Validate form
          var formSuccess = true;
          Object.keys(form).forEach(function(key, index) {
            if (!form[key]) {
              formSuccess = false;
              console.log('missing key');
            }
          });

          if (formSuccess) {
            // Send request
            $.ajax({
              url: 'https://docs.google.com/forms/d/e/1FAIpQLSer52uCOgr1v9euUvX3QmFb7QyWJsJjXmmIbcnzRd9rGCahCA/formResponse',
              type: 'POST',
              crossDomain: true,
              dataType: "xml",
              data: form,
              statusCode: {
                0:   function() {  console.log("OK") },
                200: function() {  console.log("okay") },
              }
            });
          }
      }, 300);

    } catch {
        console.log('error');
    }

    $('#name')[0].value = '';
    $('#question')[0].value = '';
}