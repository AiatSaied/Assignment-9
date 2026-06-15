// var addContactBtn = document.getElementById("addContactBtn");
// var mainContent = document.getElementById("mainContent");

// Variables
const fullNameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phoneNumber");
const emailAddressInput = document.getElementById("emailAddress");
const addressInput = document.getElementById("address");
const groupInput = document.getElementById("group");
const notesInput = document.getElementById("notes");
const isFavorite = document.getElementById("isFavorite");
const isEmergency = document.getElementById("isEmergency");
const saveContactBtn = document.getElementById("saveContactBtn");

const updateContactBtn = document.getElementById("updateContactBtn");

var contacts = [];
saveContactBtn.addEventListener("click", addContact);
// Functions

// Add Contact
function addContact() {
  const newContact = {
    fullName: fullNameInput.value,
    phoneNumber: phoneInput.value,
    emailAddress: emailAddressInput.value,
    address: addressInput.value,
    group: groupInput.value,
    notes: notesInput.value,
    isFavorite: isFavorite.checked,
    isEmergency: isEmergency.checked,
  };
  contacts.push(newContact);
  // console
  console.log(contacts);

  clearData();
  hideModal();

  // Sweet Alert to show valid or invalid message
  Swal.fire({
    title: "Invalid Phone!",
    text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    icon: "error",
    timer: 2000,
    showConfirmButton: false,
  });
  // Swal.fire({
  //   title: "Added",
  //   text: `${newContact.fullName} Contact has been added successfully`,
  //   icon: "success",
  //   timer: 2000,
  //   showConfirmButton: false,
  // });

  displayContacts();
}

// Clear Data
function clearData() {
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
  var MyContactModal = document.getElementById("addContactModal");
  var copyContactModal = bootstrap.Modal.getInstance(MyContactModal);
  copyContactModal.hide();
}

function displayContacts() {
  var allContacts = "";
  var favoriteContact = "";
  var emergencyContact = "";
  var countFavorites = 0;
  var countEmergency = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].isFavorite) {
      countFavorites++;
      favoriteContact += `          
          <div class="side-card favorites bg-white rounded-4">
            <div class="card-header">
              <div class="d-flex align-items-center gap-3">
                <div
                  class="card-icon rounded-3 d-flex justify-content-center align-items-center"
                >
                  <i class="fa-solid fa-star text-white"></i>
                </div>
                <div class="card-title">
                  <h2 class="fw-semibold fs-6 lh-base mb-0">Favorites</h2>
                  <p class="mb-0">Quick access to starred contacts</p>
                </div>
              </div>
            </div>
            <div class="card-body overflow-y-auto" id="favorite">
              <div class="card-empty text-center">
                <p>No favorites yet</p>
              </div>
            </div>
          </div>`;
      emergencyContact += `          
        <div class="side-card emergency bg-white rounded-4">
            <div class="card-header">
              <div class="d-flex align-items-center gap-3">
                <div
                  class="card-icon rounded-3 d-flex justify-content-center align-items-center"
                >
                  <i class="fa-solid fa-heart-pulse text-white"></i>
                </div>
                <div class="card-title">
                  <h2 class="fw-semibold fs-6 lh-base mb-0">Emergency</h2>
                  <p class="mb-0">Important contacts for urgent calls</p>
                </div>
              </div>
            </div>
            <div class="card-body overflow-y-auto" id="favorite">
              <div class="card-empty text-center">
                <p>No emergency contacts</p>
              </div>
            </div>
          </div>`;
    }
    if (contacts[i].isEmergency) {
      countEmergency++;
    }
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
                            >
                              CY
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
                            class="other d-inline-flex align-items-center px-2 py-1 fw-medium rounded-2"
                            >Other</span
                          >
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
                            class="contact-icons edit rounded-3 d-flex align-items-center justify-content-center"
                            data-bs-toggle="modal"
                            data-bs-target="#contactModal"
                            title="Edit"
                          >
                            <i class="fa-solid fa-pen"></i>
                          </button>
                          <button
                            class="contact-icons delete rounded-3 d-flex align-items-center justify-content-center"
                            title="Delete"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>`;
  }
  document.getElementById("rowData").innerHTML = allContacts;
  document.getElementById("total-count").innerHTML = contacts.length;
  document.getElementById("favorite-count").innerHTML = countFavorites;
  document.getElementById("emergency-count").innerHTML = countEmergency;
}

// Stoppppppppp at Video 6
// at 01:30
