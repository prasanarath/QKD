// BB84 Quantum Key Distribution Interactive Model
// JavaScript functionality for dropdowns, simulators, and interactions

// Global variables for simulations
let currentBit = 0;
let currentBasis = '+';
let evePresent = false;

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('BB84 Quantum Key Distribution Interactive Model loaded');
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Initialize any default states
    initializeSimulators();
});

// Dropdown functionality
function toggleDropdown(button) {
    const content = button.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Close all other dropdowns
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    const allButtons = document.querySelectorAll('.dropdown-toggle');
    
    allDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
    
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Toggle current dropdown
    if (!isActive) {
        content.classList.add('active');
        button.classList.add('active');
        
        // Smooth scroll to the opened section
        setTimeout(() => {
            button.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

// Add smooth scrolling functionality
function addSmoothScrolling() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize simulators with default values
function initializeSimulators() {
    // Set default values for measurement simulator
    const aliceBit = document.getElementById('alice-bit');
    const aliceBasis = document.getElementById('alice-basis');
    const bobBasis = document.getElementById('bob-basis');
    
    if (aliceBit && aliceBasis && bobBasis) {
        aliceBit.value = '0';
        aliceBasis.value = '+';
        bobBasis.value = '+';
    }
    
    // Set default values for Eve simulator
    const evePresent = document.getElementById('eve-present');
    if (evePresent) {
        evePresent.checked = false;
        updateEveSimulation();
    }
}

// Alice's bit choice simulation (for encoding demo buttons)
function simulateBitChoice(bit) {
    currentBit = bit;
    
    // Add visual feedback
    const buttons = document.querySelectorAll('.bit-btn');
    buttons.forEach(btn => btn.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-2))');
    event.target.style.background = 'linear-gradient(135deg, #6d28d9, #0891b2)';
    
    // Reset after animation
    setTimeout(() => {
        event.target.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-2))';
    }, 500);
}

// Alice's basis choice simulation (for encoding demo buttons)
function simulateBasisChoice(basis) {
    currentBasis = basis;
    
    // Add visual feedback
    const buttons = document.querySelectorAll('.basis-btn');
    buttons.forEach(btn => btn.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-2))');
    event.target.style.background = 'linear-gradient(135deg, #6d28d9, #0891b2)';
    
    // Reset after animation
    setTimeout(() => {
        event.target.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-2))';
    }, 500);
}

// Bob's measurement simulation (for basis choice buttons)
function simulateBobMeasurement(basis) {
    // Update Bob's basis selection
    const bobBasisSelect = document.getElementById('bob-basis');
    if (bobBasisSelect) {
        bobBasisSelect.value = basis;
    }
    
    // Add visual feedback
    const buttons = document.querySelectorAll('.basis-btn');
    buttons.forEach(btn => btn.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-2))');
    event.target.style.background = 'linear-gradient(135deg, #6d28d9, #0891b2)';
    
    // Reset after animation
    setTimeout(() => {
        event.target.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-2))';
    }, 500);
    
    // Run the measurement simulation
    runMeasurementSimulation();
}

// Run the measurement simulation
function runMeasurementSimulation() {
    const aliceBit = document.getElementById('alice-bit');
    const aliceBasis = document.getElementById('alice-basis');
    const bobBasis = document.getElementById('bob-basis');
    const resultElement = document.getElementById('measurement-result');
    const accuracyElement = document.getElementById('measurement-accuracy');
    
    if (!aliceBit || !aliceBasis || !bobBasis || !resultElement || !accuracyElement) {
        console.error('Measurement simulator elements not found');
        return;
    }
    
    const aliceBitValue = parseInt(aliceBit.value);
    const aliceBasisValue = aliceBasis.value;
    const bobBasisValue = bobBasis.value;
    
    let result, accuracy;
    
    if (aliceBasisValue === bobBasisValue) {
        // Basis match - perfect correlation
        result = aliceBitValue;
        accuracy = '100% (Perfect)';
        resultElement.style.color = 'var(--success)';
    } else {
        // Basis mismatch - random result
        result = Math.random() < 0.5 ? 0 : 1;
        accuracy = '50% (Random)';
        resultElement.style.color = 'var(--warning)';
    }
    
    // Update display
    resultElement.textContent = result;
    accuracyElement.textContent = accuracy;
    
    // Animate the result
    resultElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        resultElement.style.transform = 'scale(1)';
    }, 300);
}

// Toggle Eve's presence in the simulation
function toggleEveSimulation() {
    evePresent = document.getElementById('eve-present').checked;
    updateEveSimulation();
}

// Update Eve simulation display
function updateEveSimulation() {
    if (evePresent) {
        document.getElementById('error-rate').textContent = '25%';
        document.getElementById('key-length').textContent = '75 bits';
        document.getElementById('security-level').textContent = 'Compromised';
        document.getElementById('eve-detected').textContent = 'Eve detected!';
        document.getElementById('eve-detected').style.color = '#e74c3c';
    } else {
        document.getElementById('error-rate').textContent = '0%';
        document.getElementById('key-length').textContent = '100 bits';
        document.getElementById('security-level').textContent = 'High';
        document.getElementById('eve-detected').textContent = 'No eavesdropping detected';
        document.getElementById('eve-detected').style.color = '#27ae60';
    }
}

// Run the Eve simulation
function runEveSimulation() {
    const isEvePresent = document.getElementById('eve-present').checked;
    
    // Simulate the protocol with or without Eve
    let errorRate, keyLength, securityLevel, eveDetected;
    
    if (isEvePresent) {
        // With Eve present
        errorRate = Math.floor(Math.random() * 20) + 15; // 15-35%
        keyLength = Math.floor(Math.random() * 30) + 60; // 60-90 bits
        securityLevel = errorRate > 25 ? 'Insecure' : 'Warning';
        eveDetected = 'Eve detected!';
    } else {
        // Without Eve
        errorRate = Math.floor(Math.random() * 3); // 0-2%
        keyLength = Math.floor(Math.random() * 20) + 90; // 90-110 bits
        securityLevel = 'High';
        eveDetected = 'No eavesdropping detected';
    }
    
    // Update display with animation
    animateValue('error-rate', errorRate + '%');
    animateValue('key-length', keyLength + ' bits');
    animateValue('security-level', securityLevel);
    
    const eveDetectedElement = document.getElementById('eve-detected');
    eveDetectedElement.textContent = eveDetected;
    eveDetectedElement.style.color = isEvePresent ? '#e74c3c' : '#27ae60';
    
    // Add visual feedback
    const simulator = document.querySelector('.eve-simulator');
    simulator.style.transform = 'scale(1.02)';
    setTimeout(() => {
        simulator.style.transform = 'scale(1)';
    }, 200);
}

// Animate value changes
function animateValue(elementId, newValue) {
    const element = document.getElementById(elementId);
    const oldValue = element.textContent;
    
    // Add animation class
    element.style.transform = 'scale(1.1)';
    element.style.color = '#3498db';
    
    // Update value
    element.textContent = newValue;
    
    // Reset animation
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '#2c3e50';
    }, 300);
}

// Add keyboard navigation for dropdowns
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('dropdown-toggle')) {
            event.preventDefault();
            toggleDropdown(focusedElement);
        }
    }
    
    // Escape key to close dropdowns
    if (event.key === 'Escape') {
        const activeDropdowns = document.querySelectorAll('.dropdown-content.active');
        const activeButtons = document.querySelectorAll('.dropdown-toggle.active');
        
        activeDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        activeButtons.forEach(button => {
            button.classList.remove('active');
        });
    }
});

// Add click outside to close dropdowns
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown-section')) {
        const activeDropdowns = document.querySelectorAll('.dropdown-content.active');
        const activeButtons = document.querySelectorAll('.dropdown-toggle.active');
        
        activeDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        activeButtons.forEach(button => {
            button.classList.remove('active');
        });
    }
});

// Add hover effects for interactive elements
function addHoverEffects() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add loading states for simulations
function addLoadingState(elementId, duration = 1000) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('loading');
        element.textContent = 'Running...';
        
        setTimeout(() => {
            element.classList.remove('loading');
        }, duration);
    }
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Add accessibility features
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach((dropdown, index) => {
        dropdown.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-controls', `dropdown-${index}`);
        dropdown.setAttribute('role', 'button');
        dropdown.setAttribute('tabindex', '0');
    });
    
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    dropdownContents.forEach((content, index) => {
        content.setAttribute('id', `dropdown-${index}`);
        content.setAttribute('aria-hidden', 'true');
    });
}

// Update ARIA attributes when dropdowns are toggled
function updateAriaAttributes(button, isExpanded) {
    const content = button.nextElementSibling;
    
    button.setAttribute('aria-expanded', isExpanded.toString());
    content.setAttribute('aria-hidden', (!isExpanded).toString());
}

// Enhanced dropdown toggle with ARIA support
function toggleDropdownEnhanced(button) {
    const content = button.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Close all other dropdowns
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    const allButtons = document.querySelectorAll('.dropdown-toggle');
    
    allDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.setAttribute('aria-hidden', 'true');
    });
    
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
    });
    
    // Toggle current dropdown
    if (!isActive) {
        content.classList.add('active');
        button.classList.add('active');
        updateAriaAttributes(button, true);
        
        // Smooth scroll to the opened section
        setTimeout(() => {
            button.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    } else {
        updateAriaAttributes(button, false);
    }
}

// Initialize enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    enhanceAccessibility();
    addHoverEffects();
    
    // Replace original toggle function with enhanced version
    window.toggleDropdown = toggleDropdownEnhanced;
});

// Add performance monitoring
function addPerformanceMonitoring() {
    // Monitor dropdown animation performance
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name.includes('dropdown')) {
                console.log(`Dropdown animation took ${entry.duration}ms`);
            }
        }
    });
    
    observer.observe({ entryTypes: ['measure'] });
}

// Add error handling for simulations
function handleSimulationError(error, context) {
    console.error(`Simulation error in ${context}:`, error);
    
    // Show user-friendly error message
    const errorMessage = `An error occurred during the simulation. Please try again.`;
    
    // You could add a toast notification system here
    console.warn(errorMessage);
}

// Add data validation for inputs
function validateInput(input, min, max) {
    const value = parseInt(input.value);
    if (isNaN(value) || value < min || value > max) {
        input.value = Math.max(min, Math.min(max, value || min));
        return false;
    }
    return true;
}

// Enhanced input validation for measurement simulator
function validateMeasurementInputs() {
    const aliceBit = document.getElementById('alice-bit');
    const aliceBasis = document.getElementById('alice-basis');
    const bobBasis = document.getElementById('bob-basis');
    
    const isBitValid = validateInput(aliceBit, 0, 1);
    const isAliceBasisValid = ['+', '×'].includes(aliceBasis.value);
    const isBobBasisValid = ['+', '×'].includes(bobBasis.value);
    
    return isBitValid && isAliceBasisValid && isBobBasisValid;
}

// Enhanced measurement simulation with validation
function runMeasurementSimulationEnhanced() {
    try {
        if (!validateMeasurementInputs()) {
            throw new Error('Invalid input values');
        }
        
        runMeasurementSimulation();
    } catch (error) {
        handleSimulationError(error, 'measurement simulation');
    }
}

// Add the enhanced function to the global scope
window.runMeasurementSimulation = runMeasurementSimulationEnhanced;

// Add export functionality for simulation results
function exportSimulationResults() {
    const results = {
        timestamp: new Date().toISOString(),
        measurement: {
            aliceBit: document.getElementById('alice-bit').value,
            aliceBasis: document.getElementById('alice-basis').value,
            bobBasis: document.getElementById('bob-basis').value,
            result: document.getElementById('measurement-result').textContent,
            accuracy: document.getElementById('measurement-accuracy').textContent
        },
        eveSimulation: {
            evePresent: document.getElementById('eve-present').checked,
            errorRate: document.getElementById('error-rate').textContent,
            keyLength: document.getElementById('key-length').textContent,
            securityLevel: document.getElementById('security-level').textContent,
            eveDetected: document.getElementById('eve-detected').textContent
        }
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'bb84-simulation-results.json';
    link.click();
}

// Add the export function to the global scope
window.exportSimulationResults = exportSimulationResults;

// Add a help system
function showHelp(context) {
    const helpMessages = {
        'measurement': 'This simulator shows how Bob measures photons. Choose Alice\'s bit and basis, then select Bob\'s measurement basis to see the result.',
        'eve': 'This simulator demonstrates how Eve\'s interference affects the protocol. Check the box to include Eve and see how error rates increase.',
        'encoding': 'Click the buttons to see how Alice encodes bits using different bases. The photon symbol shows the resulting polarization state.'
    };
    
    const message = helpMessages[context] || 'Help information not available for this context.';
    
    // Create a simple help popup
    const helpPopup = document.createElement('div');
    helpPopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--card);
        color: #e6eef8;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(2, 6, 23, 0.8);
        border: 1px solid rgba(255,255,255,0.04);
        z-index: 1000;
        max-width: 400px;
        text-align: center;
    `;
    
    helpPopup.innerHTML = `
        <h3>Help</h3>
        <p>${message}</p>
        <button onclick="this.parentElement.remove()" style="margin-top: 15px; padding: 10px 20px; background: var(--accent); color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
    `;
    
    document.body.appendChild(helpPopup);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (helpPopup.parentElement) {
            helpPopup.remove();
        }
    }, 5000);
}

// Add help buttons to the page
function addHelpButtons() {
    const helpButton = document.createElement('button');
    helpButton.innerHTML = '❓ Help';
    helpButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 100;
        font-size: 14px;
    `;
    
    helpButton.addEventListener('click', () => {
        const context = prompt('Enter help context (measurement, eve, or encoding):') || 'general';
        showHelp(context);
    });
    
    document.body.appendChild(helpButton);
}

// Eve Simulator Functions
function toggleEveSimulation() {
    const evePresent = document.getElementById('eve-present').checked;
    updateEveSimulation();
}

function runEveSimulation() {
    const evePresent = document.getElementById('eve-present').checked;
    
    if (evePresent) {
        // Simulate Eve's interference
        const errorRate = Math.floor(Math.random() * 30) + 15; // 15-45% error rate
        const keyLength = Math.floor(Math.random() * 40) + 60; // 60-100 bits
        const securityLevel = errorRate > 25 ? 'Low' : 'Medium';
        const eveDetected = errorRate > 20 ? 'Eavesdropping detected!' : 'Suspicious activity';
        
        document.getElementById('error-rate').textContent = errorRate + '%';
        document.getElementById('key-length').textContent = keyLength + ' bits';
        document.getElementById('security-level').textContent = securityLevel;
        document.getElementById('eve-detected').textContent = eveDetected;
        
        // Update styling based on security level
        const securityElement = document.getElementById('security-level');
        if (securityLevel === 'Low') {
            securityElement.style.color = 'var(--danger)';
        } else if (securityLevel === 'Medium') {
            securityElement.style.color = 'var(--warning)';
        } else {
            securityElement.style.color = 'var(--success)';
        }
    } else {
        // No Eve - normal operation
        const errorRate = Math.floor(Math.random() * 3) + 1; // 1-3% error rate
        const keyLength = Math.floor(Math.random() * 20) + 80; // 80-100 bits
        const securityLevel = 'High';
        const eveDetected = 'No eavesdropping detected';
        
        document.getElementById('error-rate').textContent = errorRate + '%';
        document.getElementById('key-length').textContent = keyLength + ' bits';
        document.getElementById('security-level').textContent = securityLevel;
        document.getElementById('eve-detected').textContent = eveDetected;
        
        // Update styling
        document.getElementById('security-level').style.color = 'var(--success)';
    }
}

function updateEveSimulation() {
    const evePresent = document.getElementById('eve-present').checked;
    
    if (evePresent) {
        // Show Eve's presence
        document.getElementById('eve-detected').textContent = 'Eve is present - monitoring...';
        document.getElementById('eve-detected').style.color = 'var(--danger)';
    } else {
        // Hide Eve's presence
        document.getElementById('eve-detected').textContent = 'No eavesdropping detected';
        document.getElementById('eve-detected').style.color = 'var(--success)';
    }
}

// Initialize help system
document.addEventListener('DOMContentLoaded', function() {
    addHelpButtons();
});
