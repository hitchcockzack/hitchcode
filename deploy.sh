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

# Push to git
if git push; then
    send_notification "🎯 Git push successful, deploying to Netlify..." "https://app.netlify.com/sites/hitchcode/overview"
else
    send_notification "❌ Git push failed!" "https://app.netlify.com/sites/hitchcode/overview"
    exit 1
fi

# Wait a moment for Netlify to register the push
sleep 3

# Watch Netlify deploy status and capture output
if netlify watch; then
    send_notification "✅ Deploy successful! Site is live." "https://hitchcode.net"
else
    send_notification "❌ Deploy failed! Check Netlify logs." "https://app.netlify.com/sites/hitchcode/overview"
fi
