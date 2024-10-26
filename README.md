#Bantu-Health

#Description
Bantu Health is a revolutionary health app that empowers users by providing instant medical diagnosis using cutting-edge AI technology. Our app is designed to offer quick and accurate insights based on symptoms you input, allowing you to make informed decisions about your health.

#Table of Contents
1. Project Overview
2. Technology Stack
3. Installation and Setup
4. App Usage
5. App Structure
6. File Structure
7. Main Features

1. Project Overview <a name="project-overview"></a>
Bantu_Health is a mobile application designed to provide accessible and useful healthcare resources to users. Built with the user’s health in mind, the app offers several key functionalities:

Clinic Finder: Helps users locate clinics and healthcare providers nearby, ensuring easier access to medical care.
Symptom Analysis: Allows users to enter symptoms and get insights on potential health concerns.
Account Management and Settings: Provides a personalized experience where users can manage their information and access privacy settings.
The app is structured for flexibility, enabling users to navigate intuitively through a set of well-organized pages and components. Bantu_Health is developed using React Native and integrates Firebase for backend support, ensuring data reliability and scalability.

2. Technology Stack
- The portfolio is built with the following tools and technologies:

* React Native: For structuring content.
* CSS3: For styling and layout.
* Visual Studio Code and Note.js: For development.

3.1. Setup
-Prerequisites
* A text editor like VS Code for editing and testing the project.

3.2. Installation
1. Clone this repository to your local machine:
git clone https://github.com/ofentse-sithole/Bantu_Health.git

2. Navigate to the project directory:
cd Bantu_Health

#Running the project locally
After installation, you can run the project with:
npx expo start/npx expo start --tunnel 

This will start a local development server at http://localhost:3000/.

4. App Usage <a name="app-usage"></a>
Here is a basic overview of how to navigate and use the Bantu_Health app:

Registration and Login

Upon opening the app, new users can sign up using the Register page.
Returning users can access their accounts via the Login page.
Navigating the Dashboard

After logging in, users are directed to the Dashboard. Here, they can access core features like Clinic Finder, Symptom Analysis, and Account Management.
Using the Clinic Finder

From the Dashboard, select Clinic Finder to locate nearby clinics.
This feature may use location services to suggest clinics based on user proximity.
Analyzing Symptoms

Select Symptom Analysis to analyze symptoms by entering specific details.
The analysis may provide general health insights based on the entered information.
Managing Account Settings

Access Settings to manage account preferences and view legal documents like Privacy Policy and Terms of Use.
Use the Account page to update personal information, such as contact details.
Logging Out

Users can log out of the app from the Settings or Account page.

5. App Structure <a name="app-structure"></a>
Main Directories and Files:

assets: Contains images, icons, and splash screens used throughout the app.
pages: Contains all the main app pages and components.
Navbar: Includes navigation components like DashboardNavbar.js and Navbar.js for different screens.
Settings: Includes components for app settings and legal information, such as About.js, Account.js, PrivacyPolicy.js, and TermsOfUse.js.
Other pages include Dashboard.js, Login.js, Register.js, ClinicFinder.js, and SymptomsAnalysis.js, which implement core app functionalities.
firebaseConfig.js: Stores Firebase configuration settings for connecting to Firebase services.
Root Files:

App.js: The main entry point of the app, responsible for loading components and handling navigation.
README.md: Contains basic project information and setup instructions.

6. File Structure <a name="file-structure"></a>
The complete file structure of the Bantu_Health app is as follows:

Bantu_Health
│
├── .vscode/          
│   └── settings.json   
├── assets/     
│   ├── images/
│   │   ├── logo-preview.png
│   │   └── logo.png 
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash.png
├── pages/
│   ├── Navbar/
│   │   ├── DashboardNavbar.js
│   │   └── Navbar.js
│   ├── Settings/
│   │   ├── About.js
│   │   ├── Account.js
│   │   ├── PrivacyPolicy.js
│   │   └── TermsOfUse.js
│   ├── Account.js
│   ├── ClinicFinder.js
│   ├── Dashboard.js
│   ├── Login.js
│   ├── Register.js
│   ├── Settings.js
│   ├── SlashScreen.js
│   └── SymptomsAnalysis.js
├── .gitignore
├── App.js
├── app.json
├── babel.config.js
├── firebaseConfig.js
├── package-lock.json
├── package.json
└── README.md

7. Main Features <a name="main-features"></a>
Dashboard
Access various features, such as finding clinics or analyzing symptoms.

Clinic Finder
Locate nearby clinics with the ClinicFinder.js component.

Symptom Analysis
Use the SymptomsAnalysis.js component to analyze symptoms and receive insights.

Account Management
Manage personal information in the Account section and access privacy and terms pages within Settings.

Settings
Navigate to About, Privacy Policy, Terms of Use, and Account pages from the Settings page.



6. Customization <a name="customization"></a>
* Logo and Splash Screen: Update images in assets/images/ for branding.
* Firebase Configuration: Ensure firebaseConfig.js is configured with your Firebase project details.
* Navbar: Modify DashboardNavbar.js and Navbar.js in pages/Navbar/ to customize the navigation setup.
