function createNewCustomerForm() {
    // Create a new div element with class "container"
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    // Create the form element
    var form = document.createElement("form");
    form.action = "/submit";
    form.method = "post";

    // Create the left section for personal information
    var leftSection = document.createElement("div");
    leftSection.classList.add("left-section");

    // Create the heading for the left section
    var personalInfoHeading = document.createElement("h2");
    personalInfoHeading.textContent = "Personal Information";
    leftSection.appendChild(personalInfoHeading);

    // Add the form fields for personal information to the left section
    var labels = ["First Name", "Middle Name", "Last Name", "Email", "Contact Number", "Address", "City", "State", "Pincode"];
    var ids = ["firstName", "middleName", "lastName", "email", "contactNumber", "address", "city", "state", "pincode"];

    for (var i = 0; i < labels.length; i++) {
        var label = document.createElement("label");
        label.textContent = labels[i] + ":";
        leftSection.appendChild(label);

        var input = document.createElement("input");
        input.type = "text";
        input.id = ids[i];
        input.name = ids[i];
        if (i === 0 || i === 2 || i === 4 || i === 5 || i === 7 || i === 8) {
            input.required = true;
        }
        leftSection.appendChild(input);

        leftSection.appendChild(document.createElement("br"));
    }

    // Append the left section to the form
    form.appendChild(leftSection);

    // Create the right section for allergies/preferences
    var rightSection = document.createElement("div");
    rightSection.classList.add("right-section");

    // Add the heading for the right section
    var preferencesHeading = document.createElement("h2");
    preferencesHeading.textContent = "Allergies and Preferences";
    rightSection.appendChild(preferencesHeading);

    // Add the checkboxes for allergies to the right section
    var allergiesHeading = document.createElement("h3");
    allergiesHeading.textContent = "Customer Allergic To?";
    rightSection.appendChild(allergiesHeading);

    var allergens = ["Beef", "Coconut", "Dairy", "Eggs", "Fish", "Gluten", "Peanuts", "Pork", "Sesame", "Soy", "Treenuts"];

    for (var i = 0; i < allergens.length; i++) {
        var checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("checkbox-container");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = allergens[i].toLowerCase();
        checkbox.name = "allergies";
        checkbox.value = allergens[i];
        checkboxContainer.appendChild(checkbox);

        var checkboxCustom = document.createElement("label");
        checkboxCustom.classList.add("checkbox-custom");
        checkboxCustom.setAttribute("for", allergens[i].toLowerCase());
        checkboxContainer.appendChild(checkboxCustom);

        var labelText = document.createElement("label");
        labelText.textContent = allergens[i];
        labelText.setAttribute("for", allergens[i].toLowerCase());
        checkboxContainer.appendChild(labelText);

        rightSection.appendChild(checkboxContainer);
    }

    // Add the additional item tab to the right section
    var additionalItemTab = document.createElement("div");
    additionalItemTab.classList.add("additional-item-tab");

    var additionalItemCheckbox = document.createElement("input");
    additionalItemCheckbox.type = "checkbox";
    additionalItemCheckbox.id = "additionalItem";
    additionalItemCheckbox.name = "additionalItem";
    additionalItemTab.appendChild(additionalItemCheckbox);

    var additionalItemLabel = document.createElement("label");
    additionalItemLabel.textContent = "Enter item not listed above";
    additionalItemLabel.setAttribute("for", "additionalItem");
    additionalItemTab.appendChild(additionalItemLabel);

    additionalItemTab.appendChild(document.createElement("br"));

    var additionalItemText = document.createElement("input");
    additionalItemText.type = "text";
    additionalItemText.id = "additionalItemText";
    additionalItemText.name = "additionalItemText";
    additionalItemText.placeholder = "Enter additional items";
    additionalItemTab.appendChild(additionalItemText);

    rightSection.appendChild(additionalItemTab);

    // Add the preferences section to the right section
    var preferencesHeading = document.createElement("h3");
    preferencesHeading.textContent = "Preferences";
    rightSection.appendChild(preferencesHeading);

    // Spice level preference
    var preferenceSpiceLevelLabel = document.createElement("label");
    preferenceSpiceLevelLabel.textContent = "Preference Spice Level:";
    rightSection.appendChild(preferenceSpiceLevelLabel);

    var preferenceSpiceLevelSelect = document.createElement("select");
    preferenceSpiceLevelSelect.id = "preferenceSpiceLevel";
    preferenceSpiceLevelSelect.name = "preferenceSpiceLevel";

    var spiceLevels = ["Less Spicy", "Medium Spicy", "Very Spicy", "No preference"];
    for (var i = 0; i < spiceLevels.length; i++) {
        var option = document.createElement("option");
        option.value = spiceLevels[i];
        option.textContent = spiceLevels[i];
        preferenceSpiceLevelSelect.appendChild(option);
    }
    rightSection.appendChild(preferenceSpiceLevelSelect);

    rightSection.appendChild(document.createElement("br"));

    // Cooking level preference
    var preferenceCookingLevelLabel = document.createElement("label");
    preferenceCookingLevelLabel.textContent = "Preference Cooking Level for Meat:";
    rightSection.appendChild(preferenceCookingLevelLabel);

    var preferenceCookingLevelSelect = document.createElement("select");
    preferenceCookingLevelSelect.id = "preferenceCookingLevel";
    preferenceCookingLevelSelect.name = "preferenceCookingLevel";

    var cookingLevels = ["Rare", "Medium", "Well Done", "No preference"];
    for (var i = 0; i < cookingLevels.length; i++) {
        var option = document.createElement("option");
        option.value = cookingLevels[i];
        option.textContent = cookingLevels[i];
        preferenceCookingLevelSelect.appendChild(option);
    }
    rightSection.appendChild(preferenceCookingLevelSelect);

    rightSection.appendChild(document.createElement("br"));

    // Cooking oil preference
    var preferenceCookingOilLabel = document.createElement("label");
    preferenceCookingOilLabel.textContent = "Preference Cooking Oil:";
    rightSection.appendChild(preferenceCookingOilLabel);

    var preferenceCookingOilSelect = document.createElement("select");
    preferenceCookingOilSelect.id = "preferenceCookingOil";
    preferenceCookingOilSelect.name = "preferenceCookingOil";

    var cookingOils = ["Olive Oil", "Vegetable Oil", "Coconut Oil", "No preference"];
    for (var i = 0; i < cookingOils.length; i++) {
        var option = document.createElement("option");
        option.value = cookingOils[i];
        option.textContent = cookingOils[i];
        preferenceCookingOilSelect.appendChild(option);
    }
    rightSection.appendChild(preferenceCookingOilSelect);

    var otherOilContainer = document.createElement("div");
    otherOilContainer.id = "otherOilContainer";
    otherOilContainer.style.display = "none";

    var otherOilLabel = document.createElement("label");
    otherOilLabel.textContent = "Other Oil:";
    otherOilContainer.appendChild(otherOilLabel);

    var otherOilInput = document.createElement("input");
    otherOilInput.type = "text";
    otherOilInput.id = "otherOil";
    otherOilInput.name = "otherOil";
    otherOilContainer.appendChild(otherOilInput);

    rightSection.appendChild(otherOilContainer);

    // Preference notes
    var preferenceNotesLabel = document.createElement("label");
    preferenceNotesLabel.textContent = "Preference Notes:";
    rightSection.appendChild(preferenceNotesLabel);

    var preferenceNotesTextarea = document.createElement("textarea");
    preferenceNotesTextarea.id = "preferenceNotes";
    preferenceNotesTextarea.name = "preferenceNotes";
    preferenceNotesTextarea.rows = 4;
    rightSection.appendChild(preferenceNotesTextarea);

    // Append the right section to the form
    form.appendChild(rightSection);

    // Add the submit button
    var submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    form.appendChild(submitButton);

    // Add the form to the container div
    containerDiv.appendChild(form);

    // Add the container div to the body
    document.body.appendChild(containerDiv);
}

// Call the function to create the form
createNewCustomerForm();
