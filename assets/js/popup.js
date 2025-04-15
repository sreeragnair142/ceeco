// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the popup elements
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    popupOverlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); display: none; z-index: 1000; justify-content: center; align-items: center;';
    
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.style.cssText = 'background-color: white; padding: 30px; border-radius: 8px; max-width: 600px; width: 90%; position: relative; box-shadow: 0 4px 20px rgba(0,0,0,0.2); max-height: 90vh; overflow-y: auto;';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = 'position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #333;';
    
    // Create form header
    const formHeader = document.createElement('div');
    formHeader.style.cssText = 'text-align: center; margin-bottom: 20px;';
    
    const formTitle = document.createElement('h3');
    formTitle.textContent = 'KNOW YOUR ELIGIBILITY';
    formTitle.style.cssText = 'color: #ff5252; font-size: 16px; font-weight: 600; margin-bottom: 10px; letter-spacing: 1px;';
    
    const formSubtitle = document.createElement('h2');
    formSubtitle.textContent = 'Find Out If You Qualify - It\'s Free!';
    formSubtitle.style.cssText = 'color: #222; font-size: 28px; font-weight: 700; margin-bottom: 12px;';
    
    const formDescription = document.createElement('p');
    formDescription.textContent = 'Fill out this quick form, and our experts will call you for a free consultation.';
    formDescription.style.cssText = 'color: #555; margin-bottom: 20px;';
    
    formHeader.appendChild(formTitle);
    formHeader.appendChild(formSubtitle);
    formHeader.appendChild(formDescription);
    
    // Create form element
    const form = document.createElement('form');
    form.id = 'eligibility-popup-form';
    form.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 15px;';
    
    // Form fields
    const formFields = [
        { name: 'name', placeholder: 'Name', type: 'text', gridColumn: '1 / span 2' },
        { name: 'phone', placeholder: 'Phone Number', type: 'text' },
        { name: 'email', placeholder: 'Email', type: 'email' },
        { name: 'city', placeholder: 'City', type: 'text' },
        { name: 'qualification', placeholder: 'Qualification', type: 'text' },
        { name: 'mark_percentage', placeholder: 'Mark Percentage', type: 'text' },
        { name: 'preferred_country', placeholder: 'Preferred Country', type: 'select', options: ['USA', 'Canada', 'UK', 'Australia', 'New Zealand', 'Germany', 'Other'] },
        { name: 'preferred_course', placeholder: 'Preferred Course', type: 'text' },
        { name: 'preferred_budget', placeholder: 'Preferred Budget', type: 'select', options: ['Under 5L', '5L - 10L', 'Above 10L'] }
    ];
    
    // Create form fields
    formFields.forEach(field => {
        const fieldContainer = document.createElement('div');
        fieldContainer.style.cssText = field.gridColumn ? `grid-column: ${field.gridColumn};` : '';
        
        if (field.type === 'select') {
            const select = document.createElement('select');
            select.name = field.name;
            select.style.cssText = 'width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;';
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.textContent = field.placeholder;
            defaultOption.value = '';
            defaultOption.selected = true;
            defaultOption.disabled = true;
            select.appendChild(defaultOption);
            
            // Add options
            field.options.forEach(optionText => {
                const option = document.createElement('option');
                option.textContent = optionText;
                option.value = optionText.toLowerCase().replace(/\s+/g, '_');
                select.appendChild(option);
            });
            
            fieldContainer.appendChild(select);
        } else {
            const input = document.createElement('input');
            input.type = field.type;
            input.name = field.name;
            input.placeholder = field.placeholder;
            input.required = true;
            input.style.cssText = 'width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;';
            fieldContainer.appendChild(input);
        }
        
        form.appendChild(fieldContainer);
    });
    
    // Submit button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'grid-column: 1 / span 2; margin-top: 10px;';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'theme-btn btn-two';
    submitButton.innerHTML = 'Check My Eligibility <i class="flaticon-next"></i>';
    submitButton.style.cssText = 'background-color: #2c5aff; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; transition: background-color 0.3s;';
    
    buttonContainer.appendChild(submitButton);
    form.appendChild(buttonContainer);
    
    // Add trust message
    const trustMessage = document.createElement('p');
    trustMessage.innerHTML = '<small>Your information is safe with us. No spam, just expert guidance.</small>';
    trustMessage.style.cssText = 'grid-column: 1 / span 2; text-align: center; margin-top: 12px; color: #777;';
    form.appendChild(trustMessage);
    
    // Build the popup
    popupContent.appendChild(closeButton);
    popupContent.appendChild(formHeader);
    popupContent.appendChild(form);
    popupOverlay.appendChild(popupContent);
    document.body.appendChild(popupOverlay);
    
    // Add event listeners to all Check Eligibility buttons
    const eligibilityButtons = document.querySelectorAll('.theme-btn');
    eligibilityButtons.forEach(button => {
        if (button.textContent.includes('Check My Eligibility') || 
            button.textContent.includes('Check Your Eligibility') ||
            button.textContent.includes('Eligibility')) {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent form submission or default link behavior
                popupOverlay.style.display = 'flex';
            });
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Show thank you message (replace the form)
        popupContent.innerHTML = '';
        
        const thankYouMessage = document.createElement('div');
        thankYouMessage.style.cssText = 'text-align: center; padding: 30px 20px;';
        
        const successIcon = document.createElement('div');
        successIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        
        const title = document.createElement('h3');
        title.textContent = 'Thank You!';
        title.style.cssText = 'font-size: 24px; margin: 20px 0 10px;';
        
        const message = document.createElement('p');
        message.textContent = 'Your information has been submitted successfully. Our expert will contact you within 24 hours.';
        message.style.cssText = 'color: #555; margin-bottom: 20px;';
        
        const okButton = document.createElement('button');
        okButton.textContent = 'Close';
        okButton.style.cssText = 'background-color: #2c5aff; color: white; border: none; padding: 10px 30px; border-radius: 4px; cursor: pointer; font-weight: bold;';
        okButton.onclick = function() {
            popupOverlay.style.display = 'none';
        };
        
        thankYouMessage.appendChild(successIcon);
        thankYouMessage.appendChild(title);
        thankYouMessage.appendChild(message);
        thankYouMessage.appendChild(okButton);
        
        popupContent.appendChild(thankYouMessage);
        
        // Here you would normally send the data to your server
        console.log('Form data collected:', Object.fromEntries(formData));
    });
    
    // Close popup when clicking the close button
    closeButton.addEventListener('click', function() {
        popupOverlay.style.display = 'none';
    });
    
    // Close popup when clicking outside of it
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });
    
    // Add hover effect to submit button
    submitButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#1a3dc1';
    });
    
    submitButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#2c5aff';
    });
});