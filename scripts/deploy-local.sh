
#!/bin/bash

# Start local replica
echo "Starting local IC replica..."
dfx start --background --clean

# Deploy Internet Identity
echo "Deploying Internet Identity..."
dfx deploy internet_identity

# Deploy backend canister
echo "Deploying SkillPort backend..."
dfx deploy skillport_backend

# Build and deploy frontend
echo "Building frontend..."
npm run build

echo "Deploying frontend..."
dfx deploy skillport_frontend

# Generate type definitions
echo "Generating canister bindings..."
dfx generate skillport_backend

echo "✅ Local deployment complete!"
echo ""
echo "Backend Canister ID: $(dfx canister id skillport_backend)"
echo "Frontend URL: http://localhost:4943/?canisterId=$(dfx canister id skillport_frontend)"
echo "Internet Identity URL: http://localhost:4943/?canisterId=$(dfx canister id internet_identity)"
