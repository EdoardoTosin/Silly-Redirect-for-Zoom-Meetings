# Translation Guide

Welcome to the translation guide for this project! This guide helps you translate the project's content into different languages. The default language is English, located in the "en" folder within `src/_locales`.

## Getting Started

To begin, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings
```

Next, create a new branch called "l10n_main". You can do this using the following command:

```bash
git checkout -b l10n_main
```

## Translating Content

Great! Now, you can start translating. Head over to the `src/_locales` directory. Find the folder for the language you're translating to (like "fr" for French or "es" for Spanish). Open the `messages.json` file in this folder. Replace the English text with your translations. Remember, the keys must stay the same as in the English file.

## Testing Your Translation

Lastly, it's crucial to test your translations. Install the code as a browser extension in Firefox or Chrome to check everything is working correctly. Remember to test in both browsers to ensure compatibility.

### Firefox

1. Open the `about:debugging` page in Firefox.
2. Click the "This Firefox" option.
3. Click the "Load Temporary Add-on" button.
4. Select the `manifest.json` file, which is found in the `src` folder of your local repository.

The extension now installs and remains installed until you restart Firefox. Alternatively, you can run the extension from the command line using the `web-ext` tool.

After making changes to the extension's files, click the "Reload" button in the Debugging Tools panel to apply the changes and see them in effect.

### Chrome

1. Open the Extensions page in Chrome (`chrome://extensions`).
2. Enable Developer mode by clicking the toggle switch in the top right corner.
3. Locate the 'Load unpacked' button and click on it. Then, navigate to the `src` folder in your local repository and select it.

Your extension is now installed and active in Chrome. Any changes you make to the extension's files will automatically be reflected in the browser.

After making changes to the extension's files, click the "Reload" icon (circular arrow) in the Extensions page to apply the changes and see them in effect.

## Saving Your Work

Once you've finished translating, stage your changes with the following command:

```bash
git add .
```

Then, commit your changes with a message describing what you did:

```bash
git commit -m "Added [language] translation"
```

Finally, push your changes to the remote repository with the following command:

```bash
git push origin l10n_main
```

Go to the GitHub page for the repository and switch to the "l10n_main" branch. Click on "New pull request", fill in the title and description of the pull request, and submit it. Your title could be something like "Added [language] translation", and your description should explain what changes you made and why.

## Submitting Your Translation

Now, head over to the project's webpage on GitHub and switch to the "l10n_main" branch. Click on "New pull request", fill in the title and description of the pull request, and hit submit. Your title could be something like "Added [language] translation", and your description should explain what changes you made and why.
