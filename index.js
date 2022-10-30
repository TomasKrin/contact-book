const form = document.querySelector(`form`);
const createBtn = document.querySelector(`#create`);
const clearAllBtn = document.querySelector(`#clearAll`);
const clearSelectedBtn = document.querySelector(`#clearSelected`);
const searchBtn = document.querySelector(`#searchBtn`);
const searchInp = document.querySelector(`#searchInp`);
const favouritesBtn = document.querySelector(`#favorites`);
const addedContactList = document.querySelector(`#addedContactList`);
const addedFavoritesList = document.querySelector(`#addedFavoritesList`);
let div;
let newContact;
let delBtn;
let addToFavBtn;
let selectBtn;
let editBtn;
let btnDiv;
let delFromFavorites;
const contactList = JSON.parse(localStorage.getItem(`contacts`)) || [];
const favoriteList = JSON.parse(localStorage.getItem(`favorites`)) || [];

form.style.display = `none`;
searchInp.style.display = `none`;

createBtn.addEventListener(`click`, () => {
    form.style.display = `flex`;
});

clearAllBtn.addEventListener(`click`, () => {
    localStorage.clear();
    location.reload();
});

const searchInpDisplay = () => {
    searchInp.style.display = `block`;
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
    // selectBtn = document.createElement(`button`);
    // editBtn = document.createElement(`button`);
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
    // btnDiv.appendChild(selectBtn);
    // btnDiv.appendChild(editBtn);

    div.style.display = `flex`;
    div.style.flexDirection = `column`;
    div.style.backgroundColor = `gray`;
    div.style.borderRadius = `10px`;
    div.style.width = `250px`;
    div.style.margin = `10px`;
    div.style.padding = `20px`;

    delFromFavorites.style.display = `none`;

    paragrName.style.margin = `0`;
    paragrPNumber.style.margin = `0`;
    paragrEmail.style.margin = `0`;
    paragrAddress.style.margin = `0`;

    paragrName.textContent = `Name: ${contact.name} `;
    paragrPNumber.textContent = `Phone: ${contact.pNumber} `;
    paragrEmail.textContent = `Email: ${contact.email} `;
    paragrAddress.textContent = `Address: ${contact.address} `;

    delBtn.textContent = `Del`;
    addToFavBtn.textContent = `Add to Favourites`;
    delFromFavorites.textContent = `Remove from favorites`;
    // selectBtn.textContent = `Select`;
    // editBtn.textContent = `edit`;

    if (divLocation === addedFavoritesList) {
        delBtn.style.display = `none`;
        addToFavBtn.style.display = `none`;
        delFromFavorites.style.display = `block`;
    };

    console.log(`incoming div`, index);
};

const delBtnFunc = (contact, index) => {
    delBtn.addEventListener(`click`, () => {
        let confirmDel = confirm(`Are you sure want to delete contact: ${contact.name} ? `);
        if (confirmDel) {
            contactList.splice(index, 1);
            localStorage.setItem(`contacts`, JSON.stringify(contactList));
            createContactCard(contactList, addedContactList);
            location.reload();
        };
    });
};


const addToFavBtnFunc = (contactList, contact, index) => {
    addToFavBtn.addEventListener(`click`, () => {
        console.log(`#`, contactList);

        let fav = contactList.splice(index, 1);
        console.log(`contact list`, contactList);
        let id = fav.indexOf(contact);
        console.log(`id`, fav[id], id);

        favoriteList.push(fav[id]);

        console.log(`favlist`, favoriteList);
        console.log(`#`, contactList);

        localStorage.setItem(`favorites`, JSON.stringify(favoriteList));
        localStorage.setItem(`contacts`, JSON.stringify(contactList));

        createContactCard(contactList, addedContactList);
        createFavoriteCard(favoriteList, addedFavoritesList);
    });
};


const delFromFavFunc = (favoriteList, contact, index) => {
    delFromFavorites.addEventListener(`click`, () => {
        let confirmDel = confirm(`Are you sure, you want to remove from favorites, contact: ${contact.name} ? `);
        if (confirmDel) {
            let unFav = favoriteList.splice(index, 1);
            console.log(`contact list`, favoriteList);
            let id = unFav.indexOf(contact);
            console.log(`id`, unFav[id], id);

            contactList.push(unFav[id]);

            localStorage.setItem(`contacts`, JSON.stringify(contactList));
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
        delBtnFunc(contact, index);
        addToFavBtnFunc(contactList, contact, index);
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
    event.preventDefault();
    form.style.display = `none`;
    const name = document.querySelector(`#name`);
    const pNumber = document.querySelector(`#pNumber`);
    const email = document.querySelector(`#email`);
    const address = document.querySelector(`#address`);

    newContact = new Contact(name.value, pNumber.value, email.value, address.value);
    contactList.push(newContact);

    localStorage.setItem(`contacts`, JSON.stringify(contactList));

    console.log(contactList);
    createContactCard(contactList, addedContactList);
});

