Bantu Health
============

Description
-----------

Bantu Health is a revolutionary health app that empowers users by providing instant medical diagnosis using cutting-edge AI technology. Our app is designed to offer quick and accurate insights based on symptoms you input, allowing you to make informed decisions about your health.

Table of Contents
-----------------

*   Project Overview
    
*   Technology Stack
    
*   Installation and Setup
    
*   App Usage
    
*   App Structure
    
*   File Structure
    
*   Main Features
    
*   Customization
    

Project Overview
----------------

Bantu Health is a mobile application designed to provide accessible healthcare resources to users. Built with the user’s health in mind, the app offers several key functionalities:

*   **Clinic Finder:** Helps users locate nearby clinics and healthcare providers for easier access to medical care.
    
*   **Symptom Analysis:** Allows users to enter symptoms and receive insights on potential health concerns.
    
*   **Telemedicine:** Utilizes Jitsi Meet to connect users with healthcare professionals for secure virtual consultations, enhancing access to care from the comfort of home.
    
*   **Account Management and Settings:** Provides a personalized experience where users can manage their information and access privacy settings.
    

The app is structured for flexibility, enabling intuitive navigation through a set of well-organized pages and components. Bantu Health is developed using React Native and integrates several technologies for enhanced functionality.

Technology Stack
----------------

The project is built with the following tools and technologies:

*   **React Native:** For structuring content.
    
*   **Expo:** For building and deploying the app.
    
*   **Gemini API:** For AI-driven symptom analysis and diagnosis.
    
*   **Google Maps API:** For the Clinic Finder feature to locate nearby healthcare providers.
    
*   **Firestore:** For backend database support, ensuring data reliability and scalability.
    
*   **Jitsi Meet:** For secure video conferencing during telemedicine consultations.
    
*   **CSS3:** For styling and layout.
    
*   **Visual Studio Code and Node.js:** For development.
    

### Setup - Prerequisites

*   A text editor like VS Code for editing and testing the project.
    

### Installation

1.  bashCopy codegit clone https://github.com/ofentse-sithole/Bantu\_Health.git
    
2.  bashCopy codecd Bantu\_Health
    

Running the Project Locally
---------------------------

After installation, you can run the project with:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codenpx expo start  # or  npx expo start --tunnel   `

This will start a local development server at [http://localhost:3000/](http://localhost:3000/).

App Usage
---------

Here is a basic overview of how to navigate and use the Bantu Health app:

### Registration and Login

*   New users can sign up using the Register page.
    
*   Returning users can log in via the Login page.
    

### Navigating the Dashboard

After logging in, users are directed to the Dashboard, where they can access core features like Clinic Finder, Symptom Analysis, Telemedicine, and Account Management.

### Using the Clinic Finder

From the Dashboard, select Clinic Finder to locate nearby clinics. This feature utilizes the Google Maps API to suggest clinics based on user proximity.

### Analyzing Symptoms

Select Symptom Analysis to analyze symptoms by entering specific details. The analysis leverages the Gemini API to provide general health insights based on the entered information.

### Accessing Telemedicine

Navigate to the Telemedicine section to connect with healthcare professionals using Jitsi Meet for secure virtual consultations. Users can schedule and join appointments directly within the app.

### Managing Account Settings

Access Settings to manage account preferences and view legal documents like the Privacy Policy and Terms of Use. Use the Account page to update personal information, such as contact details.

### Logging Out

Users can log out of the app from the Settings or Account page.

App Structure
-------------

### Main Directories and Files

*   **assets:** Contains images, icons, and splash screens used throughout the app.
    
*   **pages:** Contains all the main app pages and components.
    
    *   **Navbar:** Includes navigation components like DashboardNavbar.js and Navbar.js for different screens.
        
    *   **Settings:** Includes components for app settings and legal information, such as About.js, Account.js, PrivacyPolicy.js, and TermsOfUse.js.
        
    *   Other pages include Dashboard.js, Login.js, Register.js, ClinicFinder.js, SymptomsAnalysis.js, and Telemedicine.js, which implement core app functionalities.
        
*   **firebaseConfig.js:** Stores Firebase configuration settings for connecting to Firebase services.
    

### Root Files

*   **App.js:** The main entry point of the app, responsible for loading components and handling navigation.
    
*   **README.md:** Contains basic project information and setup instructions.

Main Features
-------------

*   **Dashboard:** Access various features, such as finding clinics or analyzing symptoms.
    
*   **Clinic Finder:** Locate nearby clinics with the ClinicFinder.js component, using the Google Maps API.
    
*   **Symptom Analysis:** Use the SymptomsAnalysis.js component to analyze symptoms and receive insights via the Gemini API.
    
*   **Telemedicine:** Connect with healthcare professionals through the Telemedicine.js component using Jitsi Meet for secure virtual consultations.
    
*   **Account Management:** Manage personal information in the Account section and access privacy and terms pages within Settings.
    
*   **Settings:** Navigate to About, Privacy Policy, Terms of Use, and Account pages from the Settings page.
    

Customization
-------------

*   **Logo and Splash Screen:** Update images in assets/images/ for branding.
    
*   **Firebase Configuration:** Ensure firebaseConfig.js is configured with your Firebase project details.
    
*   **Navbar:** Modify DashboardNavbar.js and Navbar.js in pages/Navbar/ to customize the navigation setup.