var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");

function auth() {
  var adhaar = {
    203284465370: "8108658763",
    218043752391: "7021050701",
  };
  var keyValue = document.querySelector("input").value;
  var number = "+91" + adhaar[document.querySelector("input").value];
  console.log(adhaar);

  firebase
    .auth()
    .signInWithPhoneNumber(number, recaptcha)
    .then(function (e) {
      var code = prompt("Enter verification number", "");

      if (code === null) return;

      e.confirm(code)
        .then(function (result) {
          console.log("Success", result.user);
          delete adhaar[keyValue];
          console.log(adhaar);

          location.replace("vote.html")
        })
        .catch(function (error) {
          console.error("Fail", error);
        });
    })
    .catch(function (error) {
      alert("Adhhar not valid or too many attempts")
      console.error("Text transmission failure", error);
    });
}
