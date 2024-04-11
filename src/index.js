let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyData => /*console.log(toyData))*/renderToys(toyData))

  function renderToys(toyObj){
    const toyCollection = document.querySelector('#toy-collection')

    toyObj.forEach(toy => {
      const toyCard = document.createElement('div');
      toyCard.className = 'card'

      const toyHeading = document.createElement('h2')
      toyHeading.textContent = toy.name;

      const toyImage = document.createElement('img')
      toyImage.className = 'toy-avatar'
      toyImage.src = toy.image;

      const toyLikes = document.createElement('p')
      toyLikes.textContent = `${toy.likes} Likes`;

      const toyButton = document.createElement('button')
      toyButton.className = 'like-btn'
      toyButton.id = `${toy.id}`
      toyButton.textContent = 'Like ❤️'

      toyCard.appendChild(toyHeading)
      toyCard.appendChild(toyImage)
      toyCard.appendChild(toyLikes)
      toyCard.appendChild(toyButton)

      toyCollection.appendChild(toyCard)

      toyButton.addEventListener('click', () => {
        toy.likes++;
        toyLikes.textContent = `${toy.likes} Likes`;

        updateToyLikes(toy)
      });

    })

  }

  function addNewToy(toyObj){
    fetch('http://localhost:3000/toys', {
      method : 'POST',
  
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
  
      body : JSON.stringify(toyObj)
    })
    .then(response => response.json())
    .then(toyData => console.log(toyData))

  }

  const newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', handleSubmitForm)

  function handleSubmitForm(event){
    event.preventDefault()

    let toyObject = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    addNewToy(toyObject)
    renderToys(toyObject)
  }

  function updateToyLikes(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method : 'PATCH',
  
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(toyObj)
    })
    .then(response => response.json())
    .then(toyData => console.log(toyData))

  }




});
