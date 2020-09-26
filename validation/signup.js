const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSignupInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Fisrt Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "Veuillez remplir ce champ";
  }
// Last Name checks
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Veuillez remplir ce champ";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email ="Veuillez remplir ce champ";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Veuillez entrer une adresse email valide";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Veuillez remplir ce champ";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Veuillez remplir ce champ";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit être au moins de 6 caractères";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Veuillez vérifier votre mot de passe";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};