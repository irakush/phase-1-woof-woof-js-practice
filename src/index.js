const url = 'http://localhost:3000/pups'
const dogList = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const offAndOn = document.querySelector('#good-dog-filter')

fetch(url)
.then(res => res.json())
.then(dogData => {
  dogInHandle(dogData)
  filterGoodDog(dogData)
})

function filterGoodDog(dogData){
  offAndOn.addEventListener('click', () => {
    // filter for good dogs
    goodDogsArr = dogData.filter(dog => {
      return dog.isGoodDog 
    })
    // Change button text and update the menu bar
    if (offAndOn.innerText.includes("OFF")) {
      offAndOn.innerText="Filter good dogs: ON"
      dogInHandle(goodDogsArr)
    } else {
      offAndOn.innerText="Filter good dogs: OFF"
      dogInHandle(dogData)
    }
  })
}

function dogInHandle(dogData){
  dogList.innerHTML = ""
  dogData.forEach(oneDog => {
    const dogListItem = document.createElement('span')

    dogListItem.textContent = oneDog.name
    dogList.append(dogListItem)
    dogListItem.addEventListener('click', () => {
      showDetails(oneDog)
    })
  })
}

function showDetails(dog) {
  dogInfo.innerHTML = ""

  const dogImg = document.createElement('img')
  const dogName = document.createElement('h2')
  const dogStatus = document.createElement('button')

  dogImg.src = dog.image
  dogName.textContent = dog.name
  dogStatus.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"

  dogInfo.append(dogImg, dogName, dogStatus)

  dogStatus.addEventListener('click', () => {
    dog.isGoodDog = !dog.isGoodDog

    let updatingData = { isGoodDog: dog.isGoodDog }

    patchDog(dog.id, updatingData)
      // .then(updatedDog => console.log(updatedDog))
      .then(updatedDog => {
        dogStatus.textContent = updatedDog.isGoodDog ? "Good Dog!" : "Bad Dog!"
      })
  })
}

function patchDog(urlId, updatingData) {
  return fetch(url + '/' + urlId, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(updatingData)
  })
  .then(res => res.json())
}