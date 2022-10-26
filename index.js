const form = document.querySelector(`form`);
const createBtn = document.querySelector(`#create`);
const clearAllBtn = document.querySelector(`#clearAll`);
const clearSelectedBtn = document.querySelector(`#clearSelected`);
const searchBtn = document.querySelector(`#search`);
const favouritesBtn = document.querySelector(`#favourites`);
const addedContactList = document.querySelector(`#addedContactList`);
let div;
let selected = false;
let favourite = false;
let newContact;
let delBtn;
let addToFavBtn;
let selectBtn;
let editBtn;
const contactArr = JSON.parse(localStorage.getItem(`contacts`)) || [];

form.style.display = `none`;

createBtn.addEventListener(`click`, () => {
    form.style.display = `flex`;
});

clearAllBtn.addEventListener(`click`, () => {
    localStorage.clear();
    location.reload();
});


const createContactCard = (name, pNumber, email, address) => {
    div = document.createElement(`div`);
    const paragrName = document.createElement(`p`);
    const paragrPNumber = document.createElement(`p`);
    const paragrEmail = document.createElement(`p`);
    const paragrAddress = document.createElement(`p`);
    const btnDiv = document.createElement(`div`);
    delBtn = document.createElement(`button`);
    addToFavBtn = document.createElement(`button`);
    selectBtn = document.createElement(`button`);
    editBtn = document.createElement(`button`);


    addedContactList.append(div);
    div.appendChild(paragrName);
    div.appendChild(paragrPNumber);
    div.appendChild(paragrEmail);
    div.appendChild(paragrAddress);
    div.appendChild(btnDiv);

    btnDiv.appendChild(delBtn);
    btnDiv.appendChild(addToFavBtn);
    btnDiv.appendChild(selectBtn);
    btnDiv.appendChild(editBtn);

    div.style.display = `flex`;
    div.style.flexDirection = `column`;
    div.style.backgroundColor = `gray`;
    div.style.borderRadius = `10px`;
    div.style.width = `250px`;
    div.style.margin = `10px`;
    div.style.padding = `20px`;
    // div.style.gap = `10px`;
    paragrName.style.margin = `0`;
    paragrPNumber.style.margin = `0`;
    paragrEmail.style.margin = `0`;
    paragrAddress.style.margin = `0`;

    paragrName.textContent = `Name: ${name}`;
    paragrPNumber.textContent = `Phone: ${pNumber}`;
    paragrEmail.textContent = `Email: ${email}`;
    paragrAddress.textContent = `Address: ${address}`;

    delBtn.textContent = `Del`;
    addToFavBtn.textContent = `Add to Favourites`;
    selectBtn.textContent = `Select`;
    editBtn.textContent = `edit`;

};

class Contact {
    constructor(name, pNumber, email, address) {
        this.name = name;
        this.pNumber = pNumber;
        this.email = email;
        this.address = address;
    }
}

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    form.style.display = `none`;
    const name = document.querySelector(`#name`);
    const pNumber = document.querySelector(`#pNumber`);
    const email = document.querySelector(`#email`);
    const address = document.querySelector(`#address`);

    newContact = new Contact(name.value, pNumber.value, email.value, address.value);
    contactArr.push(newContact);

    localStorage.setItem(`contacts`, JSON.stringify(contactArr));

    const contactList = JSON.parse(localStorage.getItem(`contacts`));
    console.log(contactList);

    addedContactList.innerHTML = ``;

    contactList.forEach((contact, index) => {
        console.log(contact);
        console.log(contact.name, contact.pNumber, contact.email, contact.address);
        createContactCard(contact.name, contact.pNumber, contact.email, contact.address);
        index++;
        console.log(index);
    });

});

