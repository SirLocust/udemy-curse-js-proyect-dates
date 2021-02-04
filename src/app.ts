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
const listDates = document.querySelector('ul') as HTMLUListElement;



const isFormFill = (): boolean => {

  let isFill =  (inputPetName.value.length <= 0)? false :
                (inputPetOwener.value.length <= 0)?false:
                (inputPhoneNumber.value.length <= 0)?false:
                (inputDate.value.length <= 0)?false:
                (inputTime.value.length <= 0)?false:
                (inputSymptom.value.length <= 0)?false:true





              

  return isFill;
}

sumitButton.addEventListener('click' ,(event : Event) => {
  event.preventDefault();
  
  
  let dataPatient = {
    name: inputPetName.value,
    owener: inputPetOwener.value,
    phone: inputPhoneNumber.value,
    date: inputDate.value,
    time: inputTime.value,
    symptom: inputSymptom.value
  }

  if(!isFormFill()){
    return
  }
  patients.push(dataPatient);
  form.reset();
  printDatesHtml();
  console.log(patients)

})

form.addEventListener('change', () => {
  console.log(this)
  if(isFormFill()){
    if(sumitButton.classList.contains('disabled')){
      sumitButton.classList.remove('disabled')
    }
  }
})

const printDatesHtml = ():void =>{
  
  patients.forEach( (patient: Patient) => {
    let liElement = document.createElement('li');
    let html = `
    <div>
    <h1>
      ${patient.name}
    </h1>
    <div>
      <strong>Propietario</strong><span>${patient.owener}</span>
    </div>
    <div>
      <strong>Telefono</strong><span>${patient.phone}</span>
    </div>
    <div>
      <strong>Fecha</strong><span>${patient.date}</span>
    </div>
    <div>
      <strong>Hora</strong><span>${patient.time}</span>
    </div>
    <div>
      <strong>Sintomas</strong><span>${patient.symptom}</span>
    </div>
    <div>
      <button type="button" class="btn btn-outline-primary">Eliminar</button>
      <button type="button" class="btn btn-outline-primary">Editar</button>
  
    </div>
  </div>
    `

    liElement.innerHTML = html;
    listDates.appendChild(liElement);
  })
  
}


const init = ():void => {
  sumitButton.classList.add('disabled')
}
init();
