import './css/styles.css';
import './css/bootstrap.css';
import template from './html/template.html'

interface Patient{
  name: string;
  owener: string;
  phone: string;
  date: string;
  time: string;
  symptom: string;
}




const body = document.querySelector('body');

if(body){
  body.innerHTML = template;
}

let patients: Patient[] = [];
const form =  document.querySelector('form') as HTMLFormElement;
const inputPetName = document.getElementById('mascota') as HTMLInputElement;
const inputPetOwener = document.getElementById('propietario') as HTMLInputElement;
const inputPhoneNumber = document.getElementById('telefono') as HTMLInputElement;
const inputDate = document.getElementById('fecha') as HTMLInputElement;
const inputTime = document.getElementById('hora') as HTMLInputElement;
const inputSymptom = document.getElementById('sintomas') as HTMLTextAreaElement;
const sumitButton = document.querySelector('form button') as HTMLButtonElement;


sumitButton.addEventListener('click' ,(event : Event) => {
  event.preventDefault();
  let dataPatient = {
    name: inputPetName.value,
    owener: inputPetOwener.value,
    phone: inputPhoneNumber.value,
    date: inputDate.value,
    time: inputPhoneNumber.value,
    symptom: inputSymptom.value
  }

  patients.push(dataPatient);
  form.reset();
  
  console.log(patients)

})

