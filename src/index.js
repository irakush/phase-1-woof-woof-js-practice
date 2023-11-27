const dogBar = getDocumentElement('#dog-bar');
const dogInfo = getDocumentElement('#dog-info')

// createDogSection()

const url = 'http://localhost:3000/pups'

let copyDogsObj = {}
let singleDog = {}

const hendleDogBark = () => {
  fetch(url)
  .then(res => res.json())
  .then(createDogsMenu)
}

function createDogsMenu(dogs) {
  console.log(dogs)
  copyDogsObj = dogs
  dogs.forEach(renderDogMenuCard)
}

function renderDogMenuCard(dog){
  const dogCard = createElement('span')
  dogCard.textContent = dog.name

  dogCard.addEventListener('click', e => {
    showDogInfo(dog)
  })

  dogBar.append(dogCard)
}

function showDogInfo(dog) {
  singleDog = dog

  console.log('dasdasafafds')

  const dogForm = getDocumentElement('#dog_details_form')

  !dogForm ? createDogSection() : false
  
  const dogName = getDocumentElement('#dog_name')
  const dogImage = getDocumentElement('#dog_image_url')
  const dogStatusButton = getDocumentElement('#dog_status')

  dogName.textContent = dog.name
  dogImage.src = dog.image
  dogStatusButton.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
}

function changeDogStatus() {
  console.log(' changeDogStatus ', copyDogsObj)
 
  singleDog.isGoodDog = singleDog.isGoodDog ? false : true

  copyDogsObj = copyDogsObj.map(copyDog => {
    if (singleDog.id === copyDog.id) {
      return singleDog
    } else {
      return copyDog
    }
  });

  console.log(' dog status was changed ', copyDogsObj)
  showDogInfo(singleDog)
}

function createDogSection() {
  const dogDetailsSection = createElement('section')

  dogDetailsSection.innerHTML = `
    <form id='dog_details_form'>
      <img id="dog_image_url" alt="Here should be a dog image" />
      <h2 id="dog_name"></h2>
      <button id="dog_status"></button>
    </form>
  `
  dogInfo.append(dogDetailsSection)
  hendleDogStatusButton()
}

const hendleDogStatusButton = () => {
  getDocumentElement('#dog_status').addEventListener('click', e => {
    e.preventDefault()
    changeDogStatus()
  })
}

function getDocumentElement(el){
  return document.querySelector(el);
}

function createElement(el){
  return document.createElement(el)
}

hendleDogBark()