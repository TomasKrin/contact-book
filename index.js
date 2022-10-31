const form = document.querySelector(`form`);
const createBtn = document.querySelector(`#create`);
const clearAllBtn = document.querySelector(`#clearAll`);
const clearSelectedBtn = document.querySelector(`#clearSelected`);
const searchBtn = document.querySelector(`#searchBtn`);
const searchInp = document.querySelector(`#searchInp`);
const favouritesBtn = document.querySelector(`#favorites`);
const addedContactList = document.querySelector(`#addedContactList`);
const addedFavoritesList = document.querySelector(`#addedFavoritesList`);
const searchResults = document.querySelector(`#searchResult`);
const resultH1 = document.querySelector(`#resultTitle`);

let div;
let newContact;
let delBtn;
let addToFavBtn;
let btnDiv;
let delFromFavorites;

const contactList = JSON.parse(localStorage.getItem(`contacts`)) || [];
const favoriteList = JSON.parse(localStorage.getItem(`favorites`)) || [];

form.style.display = `none`;
searchInp.style.display = `none`;
resultH1.style.display = `none`;

createBtn.addEventListener(`click`, () => {
    form.style.display = `flex`;
});

clearAllBtn.addEventListener(`click`, () => {
    localStorage.clear();
    location.reload();
});

const searchInpDisplay = () => {
    searchInp.style.display = `block`;
    resultH1.style.display = `block`;
};

searchBtn.addEventListener(`click`, searchInpDisplay);


const renderDiv = (contact, divLocation, index) => {
    div = document.createElement(`div`);
    const paragrName = document.createElement(`p`);
    const paragrPNumber = document.createElement(`p`);
    const paragrEmail = document.createElement(`p`);
    const paragrAddress = document.createElement(`p`);
    btnDiv = document.createElement(`div`);
    delFromFavorites = document.createElement(`button`);
    delBtn = document.createElement(`button`);
    addToFavBtn = document.createElement(`button`);
    div.setAttribute(`id`, `${contact.name}`);

    divLocation.append(div);

    div.appendChild(paragrName);
    div.appendChild(paragrPNumber);
    div.appendChild(paragrEmail);
    div.appendChild(paragrAddress);
    div.appendChild(btnDiv);

    btnDiv.appendChild(delBtn);
    btnDiv.appendChild(addToFavBtn);
    btnDiv.appendChild(delFromFavorites);

    div.style.display = `flex`;
    div.style.flexDirection = `column`;
    div.style.backgroundColor = `#b9d5fd`;
    div.style.borderRadius = `10px`;
    div.style.width = `250px`;
    div.style.margin = `10px`;
    div.style.padding = `20px`;
    div.style.boxShadow = `2px 2px 2px 0.1px rgba(0, 0, 0, 0.642)`
    div.style.fontSize = `14.5px`;

    delFromFavorites.style.display = `none`;

    paragrName.style.margin = `0`;
    paragrPNumber.style.margin = `0`;
    paragrEmail.style.margin = `0`;
    paragrAddress.style.margin = `0`;

    btnDiv.style.marginTop = `10px`;

    delBtn.style.backgroundColor = `red`;
    delBtn.style.color = `white`;
    delBtn.style.marginRight = `20px`;
    delBtn.style.padding = `5px 10px`;
    delBtn.style.border = `hidden`;
    delBtn.style.borderRadius = `5px`;

    addToFavBtn.style.backgroundColor = `#4DB654`;
    addToFavBtn.style.color = `white`;
    addToFavBtn.style.marginRight = `20px`;
    addToFavBtn.style.padding = `5px 10px`;
    addToFavBtn.style.border = `hidden`;
    addToFavBtn.style.borderRadius = `5px`;

    delFromFavorites.style.backgroundColor = `#468DEF`;
    delFromFavorites.style.color = `#E50000`;
    delFromFavorites.style.marginRight = `20px`;
    delFromFavorites.style.padding = `5px 10px`;
    delFromFavorites.style.border = `hidden`;
    delFromFavorites.style.borderRadius = `5px`;

    paragrName.textContent = `Name: ${contact.name} `;
    paragrPNumber.textContent = `Phone: ${contact.pNumber} `;
    paragrEmail.textContent = `Email: ${contact.email} `;
    paragrAddress.textContent = `Address: ${contact.address} `;

    delBtn.textContent = `Del`;
    addToFavBtn.textContent = `Add to Favourites`;
    delFromFavorites.textContent = `Remove from favorites`;

    if (divLocation === addedFavoritesList) {
        addToFavBtn.style.display = `none`;
        delBtn.style.display = `none`;
        delFromFavorites.style.display = `block`;
    };

    console.log(`incoming div`, index);
};

const delBtnFunc = (contactList, contact) => {
    delBtn.addEventListener(`click`, () => {
        let confirmDel = confirm(`Are you sure want to delete contact: ${contact.name} ? `);
        if (confirmDel) {

            let idCon = contactList.indexOf(contact);
            contactList.splice(idCon, 1);

            let idFav = favoriteList.indexOf(contact);
            if (idFav !== -1) {
                favoriteList.splice(idFav, 1);
            };

            localStorage.setItem(`contacts`, JSON.stringify(contactList));
            localStorage.setItem(`favorites`, JSON.stringify(favoriteList));

            createContactCard(contactList, addedContactList);
            createFavoriteCard(favoriteList, addedFavoritesList);
        };
    });
};


const addToFavBtnFunc = (contactList, contact, index) => {
    addToFavBtn.addEventListener(`click`, () => {
        console.log(`#`, contactList);

        const copy = contactList.map(copy => copy);
        console.log(copy);
        let fav = copy.splice(index, 1);
        console.log(`contact list`, contactList);
        let id = fav.indexOf(contact);
        console.log(`id`, fav[id], id);

        favoriteList.push(fav[id]);

        console.log(`favlist`, favoriteList);
        console.log(`#`, contactList);

        localStorage.setItem(`favorites`, JSON.stringify(favoriteList));

        createFavoriteCard(favoriteList, addedFavoritesList);
    });
};


const delFromFavFunc = (favoriteList, contact, index) => {
    delFromFavorites.addEventListener(`click`, () => {
        let confirmDel = confirm(`Are you sure, you want to remove from favorites contact: ${contact.name} ? `);
        if (confirmDel) {
            favoriteList.splice(index, 1);
            console.log(`contact list`, favoriteList);

            localStorage.setItem(`favorites`, JSON.stringify(favoriteList));

            createFavoriteCard(favoriteList, addedFavoritesList);
            createContactCard(contactList, addedContactList);
        };

    });
};


const createContactCard = (contactList, divLocation) => {
    divLocation.innerHTML = ``;

    contactList.forEach((contact, index) => {
        renderDiv(contact, divLocation, index);
        delBtnFunc(contactList, contact, index);
        addToFavBtnFunc(contactList, contact, index);
        delFromFavFunc(favoriteList, contact, index);
    });
};

const createFavoriteCard = (favoriteList, divLocation) => {
    divLocation.innerHTML = ``;

    favoriteList.forEach((contact, index) => {
        renderDiv(contact, divLocation, index);
        delFromFavFunc(favoriteList, contact, index);
    });
};

class Contact {
    constructor(name, pNumber, email, address) {
        this.name = name;
        this.pNumber = pNumber;
        this.email = email;
        this.address = address;
        this.isFavourite = false;
    };
};

form.addEventListener(`submit`, (event) => {
    // event.preventDefault();
    form.style.display = `none`;
    const name = document.querySelector(`#name`);
    const pNumber = document.querySelector(`#pNumber`);
    const email = document.querySelector(`#email`);
    const address = document.querySelector(`#address`);

    newContact = new Contact(name.value, pNumber.value, email.value, address.value);
    contactList.push(newContact);

    localStorage.setItem(`contacts`, JSON.stringify(contactList));

    console.log(contactList);

});

window.addEventListener(`load`, () => {
    createContactCard(contactList, addedContactList);
    createContactCard(favoriteList, addedFavoritesList);
})



searchInp.addEventListener(`keyup`, () => {
    if (!searchInp.value) {
        return searchResults.innerHTML = ``, searchInp.style.display = `none`, [];
    };

    const filterContactList = contactList.filter(contact => contact.name.toLowerCase().includes(searchInp.value.toLowerCase()) || contact.pNumber.includes(searchInp.value) || contact.email.toLowerCase().includes(searchInp.value.toLowerCase()) || contact.address.toLowerCase().includes(searchInp.value.toLowerCase()));


    if (filterContactList) {
        createContactCard(filterContactList, searchResults)
    };
});
