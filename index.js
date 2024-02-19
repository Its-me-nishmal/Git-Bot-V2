require('dotenv').config(); // Load environment variables from .env file

const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPO;
const customCommitInterval = process.env.COMMIT_INTERVAL; // Custom commit interval in milliseconds

if (!username || !token || !repository) {
    console.error('GitHub credentials or repository URL not provided.');
    process.exit(1);
}

const encodedUsername = encodeURIComponent(username);
const encodedToken = encodeURIComponent(token);
const encodedRepo = encodeURIComponent(repository);

const url = `https://${encodedUsername}:${encodedToken}@github.com/${encodedRepo}`;

// Function to create a random commit message
const getRandomCommitMessage = () => {
    const messages = [
        'Fix a bug',
        'Add a new feature',
        'Update documentation',
        'Refactor code',
        'Implement a change',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
};

const commitAndPush = async () => {
    const currentDirectory = process.cwd(); // Get the current working directory
    const git = simpleGit(currentDirectory);

    try {
        const commitMessage = getRandomCommitMessage();

        const status = await git.status();
        fs.writeFileSync(path.join(currentDirectory, 'commit.txt'), commitMessage);

        await git.add('.');
        await git.commit(commitMessage);

        // Use the personal access token for authentication
        const pushInfo = await git.push('origin', 'main:main', {
            '--set-upstream': true,
            '--repo': url,
            '--force': true, // Use force if necessary
        });

        console.log('Changes committed and pushed successfully.');
    } catch (error) {
        console.error('Error during commit and push:', error.message || error);
    }
};

// Calculate the interval between commits
const commitInterval = customCommitInterval || (24 * 60 * 60 * 1000 / 5); // Use custom interval if provided, otherwise default to 5 times daily

setInterval(async () => {
    try {
        await commitAndPush();
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}, commitInterval);
