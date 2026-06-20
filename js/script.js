// Variables
var MyContactModal = document.getElementById("addContactModal");
var addContactLabel = document.getElementById("addContactLabel");

var searchInput = document.getElementById("searchInput");

var fullNameInput = document.getElementById("fullName");
var phoneInput = document.getElementById("phoneNumber");
var emailAddressInput = document.getElementById("emailAddress");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var notesInput = document.getElementById("notes");
var isFavorite = document.getElementById("isFavorite");
var isEmergency = document.getElementById("isEmergency");

var saveContactBtn = document.getElementById("saveContactBtn");

var updateContactBtn = document.getElementById("updateContactBtn");

var mainIndex = 0;

var contacts = localStorageContacts();
displayContacts();

saveContactBtn.addEventListener("click", addContact);

// Functions

// Local Storage
function localStorageContacts() {
  if (localStorage.getItem("contacts")) {
    return JSON.parse(localStorage.getItem("contacts"));
  } else {
    return [];
  }
}

// Add Contact
function addContact() {
  var newContact = {
    fullName: fullNameInput.value,
    phoneNumber: phoneInput.value,
    emailAddress: emailAddressInput.value,
    address: addressInput.value,
    group: groupInput.value,
    notes: notesInput.value,
    isFavorite: isFavorite.checked,
    isEmergency: isEmergency.checked,
  };

  if (addContactLabel.innerHTML === "Add New Contact") {
    contacts.push(newContact);

    Swal.fire({
      title: "Added",
      text: `${newContact.fullName} Contact has been added successfully`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } else {
    editContact(newContact);
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));

  resetForm();
  hideModal();

  // Sweet Alert to show valid or invalid message
  // Swal.fire({
  //   title: "Invalid Phone!",
  //   text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
  //   icon: "error",
  //   timer: 2000,
  //   showConfirmButton: false,
  // });

  displayContacts();
}

// Edit Contact
function editContact(newContact) {
  contacts.splice(mainIndex, 1, newContact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  addContactLabel.innerHTML = "Add New Contact";

  Swal.fire({
    title: "Updated",
    text: `${newContact.fullName} has been updated successfully`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
}
// Clear Data
function resetForm() {
  fullNameInput.value = "";
  phoneInput.value = "";
  emailAddressInput.value = "";
  addressInput.value = "";
  groupInput.value = "";
  notesInput.value = "";
  isFavorite.checked = false;
  isEmergency.checked = false;
}

// Hide Modal
function hideModal() {
  var copyContactModal = bootstrap.Modal.getInstance(MyContactModal);
  copyContactModal.hide();
}

// Display Contacts
function displayContacts() {
  var searchTerm = searchInput.value.toLowerCase();

  var allContacts = "";
  var favoriteContact = "";
  var emergencyContact = "";
  var countFavorites = 0;
  var countEmergency = 0;
  for (var i = 0; i < contacts.length; i++) {
    var nameIcon = generateNameIcon(contacts[i].fullName);

    if (contacts[i].isFavorite) {
      countFavorites++;
      favoriteContact += `
        <div class="fav-card row overflow-y-auto">
          <div class="col-sm-6 col-xl-12">
            <a
              href="tel:${contacts[i].phoneNumber}"
              class="d-flex align-items-center gap-1 p-2 bg-white"
            >
              <div class="icon-box flex-shrink-0">
                <div
                  class="name-icon text-white fw-semibold rounded-3 d-flex align-items-center justify-content-center"
                  style="background-color: ${nameIcon.color};"
                >
                  ${nameIcon.name}
                </div>
              </div>
              <div class="contact-info ms-2">
                <h4 class="fw-semibold mb-0">${contacts[i].fullName}</h4>
                <p class="mb-0">${contacts[i].phoneNumber}</p>
              </div>
              <div
                class="phone-icon rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
              >
                <i class="fa-solid fa-phone"></i>
              </div>
            </a>
          </div>
        </div>`;
    }
    if (contacts[i].isEmergency) {
      countEmergency++;
      emergencyContact += `
        <div class="emergency-card row overflow-y-auto">
          <div class="col-sm-6 col-xl-12">
            <a
              href="tel:${contacts[i].phoneNumber}"
              class="d-flex align-items-center gap-1 p-2 bg-white"
            >
              <div class="icon-box flex-shrink-0">
                <div
                  class="name-icon text-white fw-semibold rounded-3 d-flex align-items-center justify-content-center"
                  style="background-color: ${nameIcon.color};"
                >
                  ${nameIcon.name}
                </div>
              </div>
              <div class="contact-info ms-2">
                <h4 class="fw-semibold mb-0">${contacts[i].fullName}</h4>
                <p class="mb-0">${contacts[i].phoneNumber}</p>
              </div>
              <div
                class="phone-icon rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
              >
                <i class="fa-solid fa-phone"></i>
              </div>
            </a>
          </div>
        </div>`;
    }

    if (
      contacts[i].fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contacts[i].phoneNumber.includes(searchTerm) ||
      contacts[i].emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      allContacts += ` 
      <div class="col-sm-6">
        <div
          class="contact-card bg-white rounded-4 overflow-hidden d-flex flex-column h-100"
        >
          <div class="contact-header">
            <div class="contact-name d-flex align-items-start">
              <div class="position-relative flex-shrink-0">
                <div
                  class="name-icon text-white fw-semibold lh-base d-flex align-items-center justify-content-center ${contacts[i].isFavorite ? "favorite" : ""} ${contacts[i].isEmergency ? "emergency" : ""}"
                  style="background-color: ${nameIcon.color};"
                >
                  ${nameIcon.name}
                </div>
              </div>
              <div class="contact-info">
                <h3 class="fs-6 lh-base fw-semibold mb-0">
                  ${contacts[i].fullName}
                </h3>
                <div class="d-flex align-items-center gap-2 mt-1">
                  <div
                    class="phone-icon d-flex align-items-center justify-content-center flex-shrink-0"
                  >
                    <i class="fa-solid fa-phone"></i>
                  </div>
                  <span class="phone-number fw-medium"
                    >${contacts[i].phoneNumber}</span
                  >
                </div>
              </div>
            </div>
            <div class="contact-details">
              <div class="contact d-flex align-items-center">
                <div
                  class="email-icon rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                >
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <span>${contacts[i].emailAddress}</span>
              </div>
              <div class="contact d-flex align-items-center">
                <div
                  class="address-icon rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                >
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <span>${contacts[i].address}</span>
              </div>
            </div>
            <div class="other-part d-inline-flex flex-wrap">
              <span
                class="friends d-inline-flex align-items-center px-2 py-1 fw-medium rounded-2"
                >${contacts[i].group}</span
              >
              <span
                class="emergency d-inline-flex align-items-center px-2 py-1 fw-medium rounded-2 ${contacts[i].isEmergency ? "d-flex" : "d-none"}"
                >
                <i class="fa-solid fa-heart-pulse me-1"></i>
                Emergency
              </span>
            </div>
          </div>
          <div
            class="contact-footer d-flex align-items-center justify-content-between"
          >
            <div class="d-flex align-items-center gap-1">
              <a
                href="tel:${contacts[i].phoneNumber}"
                class="phone-icon rounded-3 d-flex align-items-center justify-content-center"
                title="Call"
              >
                <i class="fa-solid fa-phone"></i>
              </a>
              <a
                href="mailto:${contacts[i].emailAddress}"
                class="email-icon rounded-3 d-flex align-items-center justify-content-center"
                title="Email"
              >
                <i class="fa-solid fa-envelope"></i>
              </a>
            </div>
            <div class="d-flex align-items-center gap-1">
              <button
                class="contact-icons favorite ${contacts[i].isFavorite ? "active" : ""} rounded-3 d-flex align-items-center justify-content-center"
                title="Favorite"
              >
                <i class="fa-solid fa-star"></i>
              </button>
              <button
                class="contact-icons emergency ${contacts[i].isEmergency ? "active" : ""} rounded-3 d-flex align-items-center justify-content-center"
                title="Emergency"
              >
                <i class="fa-solid fa-heart-pulse"></i>
              </button>
              <button
                onclick="showEditModal(${i})"
                class="contact-icons edit rounded-3 d-flex align-items-center justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#addContactModal"
                title="Edit"
              >
                <i class="fa-solid fa-pen"></i>
              </button>
              <button
                onclick="deleteContact(${i})"
                class="contact-icons delete rounded-3 d-flex align-items-center justify-content-center"
                title="Delete"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }
  document.getElementById("rowData").innerHTML = allContacts;
  document.getElementById("total-count").innerHTML = contacts.length;
  document.getElementById("favorite-count").innerHTML = countFavorites;
  document.getElementById("emergency-count").innerHTML = countEmergency;
  document.getElementById("favorite").innerHTML = favoriteContact;
  document.getElementById("emergency").innerHTML = emergencyContact;
}

// Delete Contact
function deleteContact(contactIndex) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contacts[contactIndex].fullName}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contacts.splice(contactIndex, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      displayContacts();

      Swal.fire({
        title: "Deleted!",
        text: "The contact has been deleted.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
}

// show EditModal
function showEditModal(contactIndex) {
  mainIndex = contactIndex;

  fullNameInput.value = contacts[contactIndex].fullName;
  phoneInput.value = contacts[contactIndex].phoneNumber;
  emailAddressInput.value = contacts[contactIndex].emailAddress;
  addressInput.value = contacts[contactIndex].address;
  groupInput.value = contacts[contactIndex].group;
  notesInput.value = contacts[contactIndex].notes;
  isFavorite.checked = contacts[contactIndex].isFavorite;
  isEmergency.checked = contacts[contactIndex].isEmergency;

  addContactLabel.innerHTML = "Edit Contact";
}

// Generate Name Icon
function generateNameIcon(fullName) {
  var nameIcon = {
    color: "red",
    name: fullName
      .trim()
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  };
  return nameIcon;
}

// Generate Random Color
function randomColor() {
  var colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F333FF",
    "#FF33A1",
    "#33FFF5",
    "#F5FF33",
    "#FFA533",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
