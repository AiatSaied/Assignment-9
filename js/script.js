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

  for (var i = 0; i < contacts.length; i++) {
    allContacts += `                  
                  <div class="col-sm-6">
                    <div
                      class="contact-card bg-white rounded-4 overflow-hidden d-flex flex-column h-100"
                    >
                      <div class="contact-header">
                        <div class="contact-name d-flex align-items-start">
                          <div class="position-relative flex-shrink-0">
                            <div
                              class="icon text-white fw-semibold lh-base d-flex align-items-center justify-content-center"
                            >
                              CY
                            </div>
                          </div>
                          <div class="contact-info">
                            <h3 class="fs-6 lh-base fw-semibold mb-0">
                              Caryn York
                            </h3>
                            <div class="d-flex align-items-center gap-2 mt-1">
                              <div
                                class="phone-icon d-flex align-items-center justify-content-center flex-shrink-0"
                              >
                                <i class="fa-solid fa-phone"></i>
                              </div>
                              <span class="phone-number fw-medium"
                                >01012345678</span
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
                            <span>ralo@mailinator.com</span>
                          </div>
                          <div class="contact d-flex align-items-center">
                            <div
                              class="address-icon rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                            >
                              <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <span>Minim odit dolorem e </span>
                          </div>
                        </div>
                        <div class="other d-inline-flex flex-wrap">
                          <span
                            class="d-inline-flex align-items-center px-2 py-1 fw-medium rounded-2"
                            >Other</span
                          >
                        </div>
                      </div>
                      <div
                        class="contact-footer d-flex align-items-center justify-content-between"
                      >
                        <div class="d-flex align-items-center gap-1">
                          <a
                            href="tel:01012345678"
                            class="phone-icon rounded-3 d-flex align-items-center justify-content-center"
                            title="Call"
                          >
                            <i class="fa-solid fa-phone"></i>
                          </a>
                          <button
                            class="email-icon rounded-3 d-flex align-items-center justify-content-center"
                            title="Email"
                          >
                            <i class="fa-solid fa-envelope"></i>
                          </button>
                        </div>
                        <div class="d-flex align-items-center gap-1">
                          <button
                            class="contact-icons favorite rounded-3 d-flex align-items-center justify-content-center"
                            title="Favorite"
                          >
                            <i class="fa-regular fa-star"></i>
                          </button>
                          <button
                            class="contact-icons emergency rounded-3 d-flex align-items-center justify-content-center"
                            title="Emergency"
                          >
                            <i class="fa-regular fa-heart"></i>
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
}
