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
  id: string;
}




const body = document.querySelector('body');

if(body){
  body.innerHTML = template;
}



let patients: Patient[] = [];
let isPatientEdit: Patient | null = null;
const form =  document.querySelector('form') as HTMLFormElement;
const inputPetName = document.getElementById('mascota') as HTMLInputElement;
const inputPetOwener = document.getElementById('propietario') as HTMLInputElement;
const inputPhoneNumber = document.getElementById('telefono') as HTMLInputElement;
const inputDate = document.getElementById('fecha') as HTMLInputElement;
const inputTime = document.getElementById('hora') as HTMLInputElement;
const inputSymptom = document.getElementById('sintomas') as HTMLTextAreaElement;
const sumitButton = document.querySelector('form button') as HTMLButtonElement;
const listDates = document.querySelector('ul') as HTMLUListElement;

const generaterID = (petName:string,owener:string,time:string):string =>{
  
  return `${petName}${inputPetOwener}${time}`
}

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
  
  let newid = generaterID(inputPetName.value,inputPetOwener.value,inputTime.value)

  let dataPatient:Patient = {
    name: inputPetName.value,
    owener: inputPetOwener.value,
    phone: inputPhoneNumber.value,
    date: inputDate.value,
    time: inputTime.value,
    symptom: inputSymptom.value,
    id: newid,
  }

  if(!isFormFill()){
    return
  }
  if(isPatientEdit){
    patients.forEach((element,index) => {
      if(element.id === isPatientEdit?.id){
        dataPatient.id = isPatientEdit.id
        patients[index] = dataPatient;
        isPatientEdit = null;
      }
    });
  }
  else{

    patients.push(dataPatient);
  }
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
  listDates.innerHTML = '';
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
      <button type="button" class="btn btn-outline-primary" data-type="delete">Eliminar</button>
      <button type="button" class="btn btn-outline-primary" data-type="edit" data-id="${patient.id}">Editar</button>
  
    </div>
  </div>
    `

    liElement.innerHTML = html;
    listDates.appendChild(liElement);
  })
  
}

listDates.addEventListener('click', (event: MouseEvent)=> {
  let eventHtml = event.target as HTMLElement
  if(eventHtml.getAttribute('data-type') === 'edit'){
    let id = eventHtml.getAttribute('data-id');
    let appointment = findDate(id);
    if(!appointment){
      return;
    }
    isPatientEdit = appointment
    editDate(appointment);
    
  }
})

const findDate = (id:string | null):Patient| null=> {
  for (const appointment of patients) {
      if(appointment.id === id){
        return appointment
      }
  }
  return null
}

const editDate = (dateEdit: Patient):void => {
  let {name , owener, phone , date, time , symptom} = dateEdit;
  inputDate.value = date;
  inputPetName.value = name;
  inputPetOwener.value = owener;
  inputPhoneNumber.value = phone;
  inputSymptom.value = symptom;
  inputTime.value = time;
}




const init = ():void => {
  sumitButton.classList.add('disabled')
}
init();
