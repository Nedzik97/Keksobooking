import './form.js';
import './slider.js';
import { setUserFromSubmit, checksFormValidation } from './form-validation.js';
import { toggleForms, loadMap } from './map.js';
import { showSuccessPopup, showErrorPopup } from './popup.js';
checksFormValidation();
toggleForms(true);
loadMap();

setUserFromSubmit(showSuccessPopup, showErrorPopup);
