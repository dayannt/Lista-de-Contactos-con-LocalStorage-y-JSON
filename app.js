// Variables globales
let contactList = JSON.parse(localStorage.getItem('contacts')) || [];

// Función para guardar los contactos en localStorage
function saveContactsToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contactList));
}

// Función para renderizar los contactos en la página
function renderContacts() {
    const contactCards = document.getElementById('contact-cards');
    contactCards.innerHTML = ''; // Limpiar el contenido antes de renderizar

    contactList.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');

        contactCard.innerHTML = `
            <div class="contact-info">
                <strong>Nombre:</strong> ${contact.name} <br>
                <strong>Teléfono:</strong> ${contact.phone} <br>
                <strong>Email:</strong> ${contact.email} <br>
                <strong>Dirección:</strong> ${contact.address}
            </div>
            <div class="contact-actions">
                <button onclick="editContact(${index})">Editar</button>
                <button onclick="deleteContact(${index})">Eliminar</button>
            </div>
        `;
        contactCards.appendChild(contactCard);
    });
}

// Función para agregar o editar un contacto
function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('contact-id').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const contact = { name, phone, email, address };

    if (id === '') {
        // Si no hay ID, agregar un nuevo contacto
        contactList.push(contact);
    } else {
        // Si hay ID, actualizar el contacto existente
        contactList[parseInt(id)] = contact;
    }

    saveContactsToLocalStorage();
    renderContacts();

    // Limpiar el formulario
    document.getElementById('contact-form').reset();
    document.getElementById('contact-id').value = '';
}

// Función para editar un contacto
function editContact(index) {
    const contact = contactList[index];
    document.getElementById('contact-id').value = index;
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('address').value = contact.address;
}

// Función para eliminar un contacto
function deleteContact(index) {
    contactList.splice(index, 1);
    saveContactsToLocalStorage();
    renderContacts();
}

// Event Listener para el formulario
document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);

// Renderizar contactos al cargar la página
document.addEventListener('DOMContentLoaded', renderContacts);