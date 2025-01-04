#!/bin/bash

# Load environment variables
source .env.local

# Function to send Pushover notification
send_notification() {
    local message=$1
    local url=$2
    curl -s \
        --form-string "token=$PUSHOVER_TOKEN" \
        --form-string "user=$PUSHOVER_USER" \
        --form-string "message=$message" \
        --form-string "url=$url" \
        --form-string "url_title=View Site" \
        https://api.pushover.net/1/messages.json > /dev/null
}

echo "🚀 Starting deployment..."

# Check for changes
if [ -z "$(git status --porcelain)" ]; then
    echo "No changes to deploy"
    exit 0
fi

# Stage all changes
git add .

# Prompt for commit message
echo "📝 Enter commit message:"
read commit_msg

# Commit with provided message
git commit -m "$commit_msg"

# Push to git
if git push; then
    send_notification "🎯 Git push successful. Netlify auto-deploy started..." "https://app.netlify.com/sites/hitchcode/overview"
    echo "✨ Check deploy status at: https://app.netlify.com/sites/hitchcode/overview"
else
    send_notification "❌ Git push failed!" "https://app.netlify.com/sites/hitchcode/overview"
    exit 1
fi
